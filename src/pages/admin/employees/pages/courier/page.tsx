import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Form } from './components/form'
import { Table } from '@/components/table'
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
    can_edit,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    handleUpdateAdd,
  } = usePage()

  return (
    <Stack width='100%' height='100%' flexGrow={1} overflow='hidden'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('courier')}
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={searchValue}
            placeholder='search'
            onChange={handleSearch}
            sx={{ maxWidth: '350px' }}
          />
          {can_edit && (
            <Form variant='add' count={data.data.count} handleUpdate={handleUpdateAdd} />
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
    </Stack>
  )
}

export default Page
