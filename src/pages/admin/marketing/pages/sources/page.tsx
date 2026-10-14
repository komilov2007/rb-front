import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { FormSource } from './components/form'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { InputSearch } from '@/components/inputs/input-search'
import { useTranslation } from 'react-i18next'

const Page = () => {
  const { t } = useTranslation()
  const {
    page,
    data,
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
          {t('list_of_sources')}{' '}
          <Typography
            variant='text'
            component='span'
            textTransform='lowercase'
            color={theme => theme.palette.allColors.PURPLE10}
          >
            {data.data.count} {t('source')}
          </Typography>
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={searchValue}
            onChange={handleSearch}
            sx={{ maxWidth: '350px' }}
            placeholder='search_by_source_name'
          />
          {can_edit && <FormSource handleUpdate={handleUpdateAdd} />}
        </Header>
      </Box>
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle='you_have_no_sources'
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
