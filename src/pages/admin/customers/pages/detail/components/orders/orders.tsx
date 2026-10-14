import { memo } from 'react'
import { useOrder } from './useOrder'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { Pagination } from '@/components/pagination'
import { OrderDetail } from '@/components/orders/detail'

export const Orders = memo(() => {
  const {
    data,
    page,
    limit,
    columns,
    queryKey,
    detailRef,
    isLoading,
    isFetching,
    handlePage,
    handleLimit,
    handleRowClick,
  } = useOrder()

  return (
    <Stack minHeight={{ xs: '400px', md: 'calc(100% - 200px)' }}>
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        onRowClick={handleRowClick}
        emptyTitle='you_have_no_orders'
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
      <OrderDetail ref={detailRef} status='ALL' queryKey={queryKey} />
    </Stack>
  )
})
