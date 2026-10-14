import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { FormBranch } from '@/components/forms/branch'
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
    handleReOrderRow,
  } = usePage()

  return (
    <Stack width='100%' height='100%' flexGrow={1} overflow='hidden'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('branches')}
          <Typography
            variant='text'
            component='span'
            color={theme => theme.palette.allColors.PURPLE10}
            ml={1}
          >
            {data.data.count} {t('branch')}
          </Typography>
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={searchValue}
            onChange={handleSearch}
            sx={{ maxWidth: '350px' }}
            placeholder='search_by_branch_name'
          />
          {can_edit && (
            <FormBranch variant='add' count={data.data.count} handleUpdate={handleUpdateAdd} />
          )}
        </Header>
      </Box>
      <Table
        isDnd
        isLoading={isLoading}
        isFetching={isFetching}
        onReOrderRow={handleReOrderRow}
        emptyTitle='you_have_no_branches'
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
