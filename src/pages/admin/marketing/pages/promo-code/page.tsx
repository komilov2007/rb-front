import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { FormPromoCode } from './components/form'
import { Pagination } from '@/components/pagination'
import { InputSearch } from '@/components/inputs/input-search'

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
          {t('list_of_promo_codes')}{' '}
          <Typography
            variant='text'
            component='span'
            textTransform='lowercase'
            color={theme => theme.palette.allColors.PURPLE10}
          >
            {data.data.count} {t('promokod')}
          </Typography>
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={searchValue}
            onChange={handleSearch}
            sx={{ maxWidth: '350px' }}
            placeholder='search_by_promokod_name'
          />
          {can_edit && (
            <FormPromoCode variant='add' handleUpdate={handleUpdateAdd} count={data.data.count} />
          )}
        </Header>
      </Box>
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle='you_have_no_promo_codes'
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
