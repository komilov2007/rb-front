import { type CSSProperties } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { type Theme } from '@mui/material/styles'
import { flexRender, type Row } from '@tanstack/react-table'

interface DraggableRowProps<T> {
  row: Row<T>
  rowClick?: () => void
  getRowStyles?: (row: T, theme: Theme) => CSSProperties
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void
}

export const DraggableRow = <T extends object>({
  row,
  rowClick,
  reorderRow,
  getRowStyles,
}: DraggableRowProps<T>) => {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<T>) => {
      reorderRow(draggedRow.index, row.index)
    },
  })
  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  })

  const handleRowStyles = (row: Row<T>, theme: Theme) => {
    if (getRowStyles) {
      return getRowStyles(row.original, theme)
    }
    return {}
  }
  return (
    <TableRow
      ref={previewRef}
      onClick={rowClick}
      sx={theme => ({
        opacity: isDragging ? 0.5 : 1,
        cursor: rowClick ? 'pointer' : undefined,
        ...handleRowStyles(row, theme),
      })}
    >
      {row.getVisibleCells().map(cell => {
        const hasMeta = cell.getContext().cell.column.columnDef.meta

        return (
          <TableCell
            key={cell.id}
            sx={hasMeta?.getCellContext(cell.getContext()).sx}
            className={cell.getContext().row.getIsExpanded() ? 'row-expanded' : undefined}
          >
            {flexRender(cell.column.columnDef.cell, {
              ...cell.getContext(),
              dragRef,
              dropRef,
              isDragging,
            })}
          </TableCell>
        )
      })}
    </TableRow>
  )
}
