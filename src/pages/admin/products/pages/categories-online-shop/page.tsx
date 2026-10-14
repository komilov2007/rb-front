import { Header } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Table } from '@/components/table'
import { Empty } from '@/components/empty'
import { ROUTER } from '@/constants/router'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { usePage, type PageProps } from './usePage'
import { Pagination } from '@/components/pagination'
import { InputSearch } from '@/components/inputs/input-search'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'

const Page = (props: PageProps) => {
  const {
    t,
    page,
    data,
    limit,
    columns,
    isLoading,
    isFetching,
    handlePage,
    handleSort,
    handleBack,
    categoryId,
    searchValue,
    handleLimit,
    handleSearch,
    getRowStyles,
    handleClickRow,
    handleReOrderRow,
  } = usePage(props)

  return (
    <Stack width='100%' height='100%' flexGrow={1} overflow='hidden'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {categoryId && (
            <IconButton onClick={handleBack} sx={{ mr: 1 }}>
              <IconArrowLeft />
            </IconButton>
          )}
          {t('list_of_categories')}
          <Typography
            variant='text'
            component='span'
            textTransform='lowercase'
            color={theme => theme.palette.allColors.PURPLE10}
            ml={1}
          >
            {data.data.count} {t('category_count')}
          </Typography>
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={searchValue}
            onChange={handleSearch}
            sx={{ maxWidth: '350px' }}
            placeholder='search_by_category_name'
          />
          <div>
            <Button
              fullWidth
              component={Link}
              startIcon={<IconPlus />}
              to={`${ROUTER.ADMIN}/${ROUTER.PRODUCTS}/${ROUTER.CATEGORIES}/${ROUTER.CREATE}`}
              sx={theme => ({
                svg: {
                  path: {
                    stroke: theme.palette.allColors.WHITE,
                  },
                },
              })}
            >
              {t('add_category')}
            </Button>
          </div>
        </Header>
      </Box>
      <Table
        isDnd
        enableSorting
        isLoading={isLoading}
        isFetching={isFetching}
        getRowStyles={getRowStyles}
        onRowClick={handleClickRow}
        onSortingChange={handleSort}
        onReOrderRow={handleReOrderRow}
        emptyTitle='you_have_no_categories'
        options={{
          columns,
          data: data.data.results,
          getRowCanExpand: () => true,
        }}
        EmptyComponent={
          <Stack gap='10px' alignItems='center'>
            <Empty title='you_have_no_categories' text='no_categories_description' />
            {data.data.results.length === 0 && (
              <div>
                <Button
                  fullWidth
                  component={Link}
                  to={`${ROUTER.ADMIN}/${ROUTER.PRODUCTS}/${ROUTER.CATEGORIES}/${ROUTER.CREATE}`}
                >
                  {t('add_category')}
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
