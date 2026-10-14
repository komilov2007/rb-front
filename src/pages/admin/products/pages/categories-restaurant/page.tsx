import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { Empty } from '@/components/empty'
import { isRobosell } from '@/utils/robosell'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { SubTable } from './components/sub-table'
import { Pagination } from '@/components/pagination'
import { ImportPrdouct } from '@/components/import-product'
import { getExpandedRowModel } from '@tanstack/react-table'
import { InputSearch } from '@/components/inputs/input-search'
import { FormCategoryRestarunat } from '@/components/forms/category-restarunat'

const Page = () => {
  const { t } = useTranslation()
  const {
    page,
    data,
    limit,
    columns,
    can_edit,
    expanded,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    setExpanded,
    handleSearch,
    handleUpdate,
    getRowStyles,
    handleClickRow,
    handleUpdateAdd,
    handleReOrderRow,
    handleSort,
  } = usePage()

  return (
    <Stack width='100%' height='100%' flexGrow={1} overflow='hidden'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('list_of_categories')}{' '}
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
          <Stack gap='10px' direction='row' width='100%' maxWidth={{ xs: '100%', md: '370px' }}>
            {can_edit && (
              <>
                {isRobosell() && <ImportPrdouct handleUpdate={handleUpdate} />}
                <FormCategoryRestarunat variant='add' handleUpdate={handleUpdateAdd} />
              </>
            )}
          </Stack>
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
        renderSubComponent={row => <SubTable {...row} columns={columns} />}
        options={{
          columns,
          state: {
            expanded,
          },
          data: data.data.results,
          getRowCanExpand: () => true,
          onExpandedChange: setExpanded,
          getExpandedRowModel: getExpandedRowModel(),
        }}
        EmptyComponent={
          <Stack gap='10px' alignItems='center'>
            <Empty title='you_have_no_categories' text='no_categories_description' />
            {data.data.results.length === 0 && (
              <div>
                <FormCategoryRestarunat noPlus variant='add' handleUpdate={handleUpdateAdd} />
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
