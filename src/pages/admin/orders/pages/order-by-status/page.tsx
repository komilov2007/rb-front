import { Header, Wrapper } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { Pagination } from '@/components/pagination'
import { Actions } from '@/components/orders/actions'
import { type OrderByStatusProps } from '@/types/order'
import { OrderDetail } from '@/components/orders/detail'
import { SelectLate } from '@/components/orders/select-late'
import { InputSearch } from '@/components/inputs/input-search'
import { FilterChips } from '@/components/orders/filter-chips'

const Page = (props: OrderByStatusProps) => {
  const {
    data,
    page,
    limit,
    isLate,
    columns,
    queryKey,
    detailRef,
    isLoading,
    isFetching,
    handlePage,
    searchValue,
    handleLimit,
    handleSearch,
    getRowStyles,
    handleRowClick,
  } = usePage(props)

  return (
    <Stack width='100%' flexGrow={1}>
      <Box px='10px'>
        <Header>
          <Stack width='100%' flexGrow={1} gap='5px' direction='row'>
            <InputSearch
              size='small'
              value={searchValue}
              onChange={handleSearch}
              sx={{ maxWidth: '650px' }}
              placeholder='search_by_order_id_customer_order_status_or_something'
            />
            {isLate && <SelectLate mobile variant='header' />}
          </Stack>
          <Stack display={{ xs: 'none', md: 'flex' }}>
            <Actions isLate={isLate} status={props.status} />
          </Stack>
        </Header>
        <Stack display={{ xs: 'none', md: 'flex' }}>
          <FilterChips />
        </Stack>
      </Box>
      <Wrapper>
        <Table
          isLoading={isLoading}
          isFetching={isFetching}
          getRowStyles={getRowStyles}
          onRowClick={handleRowClick}
          emptyTitle='you_have_no_orders'
          EmptyComponent={isLate && <SelectLate variant='body' />}
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
      </Wrapper>
      <OrderDetail ref={detailRef} status={props.status} queryKey={queryKey} />
    </Stack>
  )
}

export default Page
