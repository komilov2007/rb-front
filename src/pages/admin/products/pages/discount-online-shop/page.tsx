import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Table } from '@/components/table'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { InputSearch } from '@/components/inputs/input-search'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'

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
    handleOpen,
  } = usePage()

  return (
    <Stack width='100%' height='100%'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('discount')}{' '}
          <Typography
            variant='text'
            component='span'
            color={theme => theme.palette.allColors.PURPLE10}
            textTransform='lowercase'
          >
            {data.data.count} {t('discount_count')}
          </Typography>
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={searchValue}
            onChange={handleSearch}
            sx={{ maxWidth: '350px' }}
            placeholder='search_by_discount_name'
          />
          {can_edit && (
            <Button
              onClick={handleOpen}
              startIcon={<IconPlus />}
              sx={theme => ({
                svg: {
                  path: {
                    stroke: theme.palette.allColors.WHITE,
                  },
                },
              })}
            >
              {t('add_discount')}
            </Button>
          )}
        </Header>
      </Box>
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle='you_have_no_discounts'
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
