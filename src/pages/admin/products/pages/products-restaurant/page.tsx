import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { Empty } from '@/components/empty'
import { isRobosell } from '@/utils/robosell'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { ImportPrdouct } from '@/components/import-product'
import { InputSearch } from '@/components/inputs/input-search'
import { FormProductRestarunat } from '@/components/forms/product-restarunat'
import { SelectBranchesFilter } from '@/components/selects/select-branches-filter'

const Page = () => {
  const { t } = useTranslation()
  const {
    page,
    data,
    limit,
    state,
    focus,
    columns,
    can_edit,
    isLoading,
    branch_ids,
    isFetching,
    handlePage,
    categoryId,
    searchValue,
    handleLimit,
    setBranchIds,
    handleSearch,
    handleUpdate,
    handleUpdateAdd,
    handleReOrderRow,
    handleSort,
  } = usePage()

  return (
    <Stack width='100%' height='100%'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {state?.name ?? t('products')}{' '}
          <Typography
            variant='text'
            component='span'
            color={theme => theme.palette.allColors.PURPLE10}
          >
            {data.data.count} {t('product')}
          </Typography>
        </Typography>
        <Header>
          <Stack width='100%' gap='10px' direction='row'>
            <InputSearch
              size='small'
              value={searchValue}
              onChange={handleSearch}
              onFocus={focus.setTrue}
              onBlur={focus.setFalse}
              placeholder='search_by_product_name'
              sx={{ maxWidth: { md: '350px', sm: '100%' } }}
            />
            {!focus.value && (
              <Stack width='100%' sx={{ display: { sm: 'none' } }}>
                <SelectBranchesFilter isAll value={branch_ids} onChange={setBranchIds} />
              </Stack>
            )}
          </Stack>
          <Stack gap='10px' direction='row' width='100%' maxWidth={{ xs: '100%', md: '550px' }}>
            <Stack sx={{ display: { xs: 'none', sm: 'unset' } }}>
              <SelectBranchesFilter isAll value={branch_ids} onChange={setBranchIds} />
            </Stack>
            {can_edit && (
              <>
                {isRobosell() && <ImportPrdouct handleUpdate={handleUpdate} />}
                <FormProductRestarunat
                  variant='add'
                  categoryId={categoryId}
                  count={data.data.count}
                  handleUpdate={handleUpdateAdd}
                />
              </>
            )}
          </Stack>
        </Header>
      </Box>
      <Table
        enableSorting
        isDnd={!!categoryId}
        isLoading={isLoading}
        isFetching={isFetching}
        onReOrderRow={handleReOrderRow}
        onSortingChange={handleSort}
        options={{
          columns,
          data: data.data.results,
        }}
        EmptyComponent={
          <Stack gap='10px' alignItems='center'>
            <Empty title='no_products_title' text='no_products_description' />
            {data.data.results.length === 0 && (
              <div>
                <FormProductRestarunat
                  noPlus
                  variant='add'
                  categoryId={categoryId}
                  count={data.data.count}
                  handleUpdate={handleUpdateAdd}
                />
              </div>
            )}
          </Stack>
        }
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
