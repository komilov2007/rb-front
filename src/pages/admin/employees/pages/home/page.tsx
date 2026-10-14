import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Form } from './components/form'
import { Table } from '@/components/table'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { InputSearch } from '@/components/inputs/input-search'

const Page = () => {
  const { t } = useTranslation()
  const {
    data,
    page,
    limit,
    columns,
    dataRole,
    can_edit,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    isLoadingRole,
    handleUpdateAdd,
  } = usePage()

  return (
    <Stack width='100%' height='100%' flexGrow={1} overflow='hidden'>
      {isLoadingRole ? (
        <Spinner center />
      ) : (
        <>
          <Box p='20px 20px 0'>
            <Typography variant='title30' component='h3'>
              {t('employee')}
            </Typography>
            <Header>
              <InputSearch
                size='small'
                value={searchValue}
                onChange={handleSearch}
                sx={{ maxWidth: '350px' }}
                placeholder='search_by_employee_name'
              />
              {can_edit && (
                <Form
                  count={data.data.count}
                  variant='add'
                  handleUpdate={handleUpdateAdd}
                  data={dataRole?.data.results ?? []}
                />
              )}
            </Header>
          </Box>
          <Table
            isLoading={isLoading}
            isFetching={isFetching}
            emptyTitle='you_have_no_employee'
            options={{
              columns,
              data: data.data.results,
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
      )}
    </Stack>
  )
}

export default Page
