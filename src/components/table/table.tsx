import { Hoc } from './hoc'
import { Empty } from '../empty'
import { Spinner } from '../spinner'
import Paper from '@mui/material/Paper'
import MuiTable from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import { DraggableRow } from './draggable-row'
import { useTranslation } from 'react-i18next'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import { type Theme } from '@mui/material/styles'
import { Wrapper, WrapEmpty, Container } from './style'
import TableContainer from '@mui/material/TableContainer'
import LinearProgress from '@mui/material/LinearProgress'
import { Fragment, useState, type CSSProperties, type ReactNode } from 'react'
import {
  type Row,
  flexRender,
  useReactTable,
  getCoreRowModel,
  type TableOptions,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
} from '@tanstack/react-table'
import { SortHeader } from './sort-header'

interface TableProps<T extends object> {
  isDnd?: boolean
  isLoading?: boolean
  isFetching?: boolean
  emptyTitle?: string
  isExpanded?: boolean
  EmptyComponent?: ReactNode
  onRowClick?: (row: T) => void
  renderSubComponent?: (row: T) => ReactNode
  options: Omit<TableOptions<T>, 'getCoreRowModel'>
  getRowStyles?: (row: T, theme: Theme) => CSSProperties
  onReOrderRow?: (draggedRowIndex: number, targetRowIndex: number) => void
  enableSorting?: boolean
  initialSorting?: SortingState
  onSortingChange?: (s: SortingState) => void
}

export const Table = <T extends object>({
  isDnd,
  options,
  isLoading,
  isFetching,
  isExpanded,
  emptyTitle,
  onRowClick,
  getRowStyles,
  onReOrderRow,
  EmptyComponent,
  renderSubComponent,
  enableSorting = false,
  initialSorting = [],
  onSortingChange,
}: TableProps<T>) => {
  const { t } = useTranslation()
  const columns = options.columns.map(c => {
    return {
      ...c,
      header: typeof c.header === 'string' ? t(c.header) : c.header,
      enableSorting: enableSorting && (c.enableSorting ?? false),
    }
  })
  const newOption = {
    ...options,
    columns,
  }
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const handleSortingChange = (updater: SortingState | ((old: SortingState) => SortingState)) => {
    const next = typeof updater === 'function' ? updater(sorting) : updater
    setSorting(next)
    onSortingChange?.(next)
  }

  //  @ts-ignore
  const table = useReactTable({
    ...newOption,
    state: {
      sorting,
      ...newOption.state,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: handleSortingChange,
    enableSortingRemoval: false,
    sortDescFirst: false,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
  })

  const handleRowClick = (row: Row<T>) => () => {
    if (onRowClick) {
      onRowClick(row.original)
    }
  }

  const handleRowStyles = (row: Row<T>, theme: Theme) => {
    if (getRowStyles) {
      return getRowStyles(row.original, theme)
    }
    return {}
  }

  return (
    <Hoc>
      <Container>
        {isFetching && (
          <Wrapper>
            <LinearProgress sx={{ height: '2px' }} />
          </Wrapper>
        )}
        {isLoading ? (
          <Spinner center />
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              height: '100%',
              overflow: 'auto',
            }}
          >
            {/*
              Without a minWidth MUI's Table is width:100% and never overflows,
              so on a phone the browser crushed every column and wrapped the text
              instead of letting the container scroll sideways.
            */}
            <MuiTable
              stickyHeader
              aria-label='sticky table'
              sx={{ minWidth: { xs: 760, md: 'auto' } }}
            >
              <TableHead>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <TableCell key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : header.column.columnDef.enableSorting ? (
                            <SortHeader column={header.column}>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </SortHeader>
                          ) : (
                            <div>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </div>
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody
                sx={{ position: 'relative', height: options.data.length > 0 ? undefined : '300px' }}
              >
                {options.data.length > 0 ? (
                  isDnd && onReOrderRow ? (
                    table.getCoreRowModel().rows.map(row => (
                      <Fragment key={row.id}>
                        <DraggableRow
                          row={row}
                          key={row.id}
                          reorderRow={onReOrderRow}
                          getRowStyles={getRowStyles}
                          rowClick={handleRowClick(row)}
                        />
                        {row.getIsExpanded() && renderSubComponent && (
                          <TableRow>
                            <TableCell colSpan={columns.length}>
                              {renderSubComponent(row.original)}
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    ))
                  ) : isExpanded ? (
                    table.getExpandedRowModel().rows.map(row => {
                      return (
                        <Fragment key={row.id}>
                          <TableRow
                            onClick={handleRowClick(row)}
                            className={row.parentId ? 'sub-row' : undefined}
                            sx={theme => ({
                              cursor: onRowClick ? 'pointer' : undefined,
                              ...handleRowStyles(row, theme),
                            })}
                          >
                            {row.getVisibleCells().map(cell => {
                              const hasMeta = cell.getContext().cell.column.columnDef.meta
                              return (
                                <TableCell
                                  key={cell.id}
                                  sx={hasMeta?.getCellContext(cell.getContext()).sx}
                                  className={
                                    cell.getContext().row.getIsExpanded()
                                      ? 'row-expanded'
                                      : undefined
                                  }
                                >
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                          {row.getIsExpanded() && renderSubComponent && (
                            <TableRow>
                              <TableCell colSpan={columns.length}>
                                {renderSubComponent(row.original)}
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
                      )
                    })
                  ) : (
                    table.getCoreRowModel().rows.map(row => {
                      return (
                        <Fragment key={row.id}>
                          <TableRow
                            onClick={handleRowClick(row)}
                            className={row.parentId ? 'sub-row' : undefined}
                            sx={theme => ({
                              cursor: onRowClick ? 'pointer' : undefined,
                              ...handleRowStyles(row, theme),
                            })}
                          >
                            {row.getVisibleCells().map(cell => {
                              const hasMeta = cell.getContext().cell.column.columnDef.meta
                              return (
                                <TableCell
                                  key={cell.id}
                                  sx={hasMeta?.getCellContext(cell.getContext()).sx}
                                  className={
                                    cell.getContext().row.getIsExpanded()
                                      ? 'row-expanded'
                                      : undefined
                                  }
                                >
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                          {row.getIsExpanded() && renderSubComponent && (
                            <TableRow>
                              <TableCell colSpan={columns.length}>
                                {renderSubComponent(row.original)}
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
                      )
                    })
                  )
                ) : (
                  <WrapEmpty>{EmptyComponent || <Empty title={emptyTitle} />}</WrapEmpty>
                )}
              </TableBody>
            </MuiTable>
          </TableContainer>
        )}
      </Container>
    </Hoc>
  )
}
