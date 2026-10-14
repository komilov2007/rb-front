import { Header } from './style'
import { usePage } from './usePage'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { Filter } from './components/filter'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { getExpandedRowModel } from '@tanstack/react-table'
import { InputSearch } from '@/components/inputs/input-search'

const Page = () => {
  const { t } = useTranslation()
  const {
    data,
    page,
    limit,
    columns,
    expanded,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    setExpanded,
    handleSearch,
    handleSort,
  } = usePage()

  return (
    <Stack width='100%' height='100%' flexGrow={1} overflow='hidden'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('stock')}{' '}
          <Typography
            variant='text'
            component='span'
            color={theme => theme.palette.allColors.PURPLE10}
          >
            {data.data.count} {t('product')}
          </Typography>
        </Typography>
        <Header>
          <Stack gap='10px' direction='row' alignItems='center' flexGrow={1}>
            <InputSearch
              size='small'
              value={searchValue}
              onChange={handleSearch}
              sx={{ maxWidth: '350px' }}
              placeholder='search_by_product_name'
            />
            <Filter />
          </Stack>
        </Header>
      </Box>
      <Table
        isExpanded
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle='you_have_no_products'
        enableSorting={true}
        onSortingChange={handleSort}
        options={{
          columns,
          state: {
            expanded,
          },
          data: data.data.results,
          onExpandedChange: setExpanded,
          getSubRows: row => {
            return row.variants
          },
          getExpandedRowModel: getExpandedRowModel(),
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
