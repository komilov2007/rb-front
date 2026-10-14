import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { InputSearch } from '@/components/inputs/input-search'
import { Actions } from './components/actions'

const Page = () => {
  const { t } = useTranslation()
  const {
    page,
    data,
    limit,
    columns,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    handleUpdate,
  } = usePage()

  return (
    <Stack
      width='100%'
      height='100%'
      sx={{
        '.MuiTableBody-root .MuiTableRow-root .MuiTableCell-root': {
          height: '70px !important',
        },
      }}
    >
      <Box p='20px 20px 0'>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='title30' component='h3'>
            {t('IKPU')}{' '}
            <Typography
              variant='text'
              component='span'
              color={theme => theme.palette.allColors.PURPLE10}
            >
              {data.data.count} {t('product')}
            </Typography>
          </Typography>
          <Actions variant='mobile' handleUpdate={handleUpdate} />
        </Stack>
        <Header>
          <InputSearch
            size='small'
            value={searchValue}
            onChange={handleSearch}
            sx={{ maxWidth: '350px' }}
            placeholder='search_by_product_name'
          />
          <Actions variant='desktop' handleUpdate={handleUpdate} />
        </Header>
      </Box>
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle='you_have_no_products'
        options={{
          columns,
          data: data.data?.results,
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
