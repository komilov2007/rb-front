import Box from '@mui/material/Box'
import { Filters } from '../filters'
import { useUsers } from './useUsers'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Table } from '@/components/table'
import { FilterChips } from '../filter-chips'
import { Trans, useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Header, WrapSelectedUsers } from './style'
import { Pagination } from '@/components/pagination'
import { getFilteredRowModel } from '@tanstack/react-table'
import { InputSearch } from '@/components/inputs/input-search'

const Users = () => {
  const { t } = useTranslation()
  const {
    data,
    page,
    limit,
    value,
    setTrue,
    columns,
    isLoading,
    handleNext,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    rowSelection,
    handleSearch,
    setRowSelection,
    selectRowsLength,
  } = useUsers()

  return (
    <>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('select_customers')}
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={searchValue}
            onChange={handleSearch}
            sx={{ maxWidth: '350px' }}
          />
          <Filters />
        </Header>
        <FilterChips />
      </Box>
      <WrapSelectedUsers>
        <Stack gap='16px' direction='row' whiteSpace='nowrap' alignItems='center'>
          <Typography variant='text120' color={theme => theme.palette.allColors.WHITE}>
            <Trans
              i18nKey='number_of_selected_customers'
              values={{ value: value ? data.data.count : selectRowsLength }}
              components={{
                linkTag: (
                  <Typography pl='5px' variant='inherit' component='span' fontWeight={400} />
                ),
              }}
            />
          </Typography>
          {!value && (
            <Button fullWidth size='small' onClick={setTrue} variant='solid-white'>
              Select all ({data.data.count})
            </Button>
          )}
        </Stack>
        <Button
          fullWidth
          size='small'
          onClick={handleNext}
          disabled={selectRowsLength === 0}
          variant='contained-white-text-purple'
          sx={{
            maxWidth: '150px',
          }}
        >
          {t('next')}
        </Button>
      </WrapSelectedUsers>
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle='you_have_no_mailing_users'
        options={{
          columns,
          data: data.data.results,
          getRowId: p => `${p.id}`,
          state: {
            rowSelection,
          },
          enableRowSelection: true,
          onRowSelectionChange: setRowSelection,
          getFilteredRowModel: getFilteredRowModel(),
        }}
      />
      <Pagination
        page={page}
        limit={limit}
        disabled={isLoading}
        total={data.data.count}
        onChangePage={handlePage}
        onChangeLimit={handleLimit}
      />
    </>
  )
}

export default Users
