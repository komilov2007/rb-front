import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Table } from '@/components/table'
import { Empty } from '@/components/empty'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { ImportPrdouct } from '@/components/import-product'
import { InputSearch } from '@/components/inputs/input-search'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { SelectCategoryCatalogFilter } from '@/components/selects/select-category-catalog'

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
    handleSort,
    searchValue,
    handleLimit,
    handleSearch,
    handleUpdate,
    categoryCatalog,
    handleReOrderRow,
    handleAddProduct,
    handleChangeCategory,
  } = usePage()

  return (
    <Stack width='100%' height='100%'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('products')}{' '}
          <Typography
            variant='text'
            component='span'
            color={theme => theme.palette.allColors.PURPLE10}
          >
            {data.data.count} {t('product')}
          </Typography>
        </Typography>
        <Header>
          <Stack
            width='100%'
            gap='10px'
            alignItems='center'
            justifyContent='space-between'
            direction={{ sm: 'column', md: 'row' }}
          >
            <InputSearch
              size='small'
              value={searchValue}
              onChange={handleSearch}
              placeholder='search_by_product_name'
              sx={{ maxWidth: { md: '350px', sm: '100%' } }}
            />
            <Stack width='100%' sx={{ display: { sm: 'none' } }}>
              <SelectCategoryCatalogFilter
                value={categoryCatalog}
                onChange={value => {
                  handleChangeCategory(value as number)
                }}
              />
            </Stack>
          </Stack>
          <Stack gap='10px' direction='row' width='100%' maxWidth={{ xs: '100%' }}>
            <Stack sx={{ display: { xs: 'none', sm: 'unset' } }}>
              <SelectCategoryCatalogFilter
                value={categoryCatalog}
                onChange={value => {
                  handleChangeCategory(value as number)
                }}
              />
            </Stack>

            {can_edit && <ImportPrdouct handleUpdate={handleUpdate} />}
            <Button
              fullWidth
              onClick={handleAddProduct}
              startIcon={<IconPlus />}
              sx={theme => ({
                svg: {
                  path: {
                    stroke: theme.palette.allColors.WHITE,
                  },
                },
              })}
            >
              {t('add_product')}
            </Button>
          </Stack>
        </Header>
      </Box>
      <Table
        isDnd
        enableSorting
        isLoading={isLoading}
        isFetching={isFetching}
        onSortingChange={handleSort}
        onReOrderRow={handleReOrderRow}
        options={{
          columns,
          data: data.data.results,
          getRowCanExpand: () => true,
        }}
        EmptyComponent={
          <Stack gap='10px' alignItems='center'>
            <Empty title='no_products_title' text='no_products_description' />
            {data.data.results.length === 0 && (
              <div>
                <Button
                  fullWidth
                  onClick={handleAddProduct}
                  sx={theme => ({
                    svg: {
                      path: {
                        stroke: theme.palette.allColors.WHITE,
                      },
                    },
                  })}
                >
                  {t('add_product')}
                </Button>
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
