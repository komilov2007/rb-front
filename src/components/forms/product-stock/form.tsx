import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { Table } from '@/components/table'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useFormProductStock } from './useFormProductStock'
import { getExpandedRowModel } from '@tanstack/react-table'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export const ProductStock = () => {
  const { t } = useTranslation()
  const {
    page,
    results,
    hasMore,
    columns,
    expanded,
    isLoading,
    isFetching,
    handleNext,
    setExpanded,
    handleClose,
    productStockBoolean,
  } = useFormProductStock()

  return (
    <Dialog
      fullWidth
      scroll='paper'
      onClose={handleClose}
      open={productStockBoolean}
      PaperProps={{ sx: { overflow: 'hidden' } }}
    >
      <Stack p='7px 24px' alignItems='center' direction='row' justifyContent='space-between'>
        <Typography component='h3' align='center' fontWeight='700' variant='title30'>
          {t('products_weight_missing')}
        </Typography>
        <IconButton onClick={handleClose}>
          <IconRemove />
        </IconButton>
      </Stack>
      <Stack height='60vh' id='scrollableProductStock' overflow='auto'>
        <InfiniteScroll
          next={handleNext}
          hasMore={hasMore.value}
          dataLength={results.length}
          scrollableTarget='scrollableProductStock'
          loader={Array.from({ length: page === 1 ? 10 : 3 }).map((_, i: number) => (
            <Skeleton
              key={i}
              width='100%'
              height='72px'
              component='li'
              variant='rectangular'
              sx={{ mb: '4px', minHeight: '72px' }}
            />
          ))}
        >
          <Table
            isExpanded
            enableSorting
            isLoading={isLoading}
            isFetching={isFetching}
            emptyTitle='you_have_no_products'
            options={{
              columns,
              state: {
                expanded,
              },
              data: results,
              onExpandedChange: setExpanded,
              getSubRows: row => {
                return row.variants
              },
              getExpandedRowModel: getExpandedRowModel(),
            }}
          />
        </InfiniteScroll>
      </Stack>
      <Stack p='16px 24px' alignItems='flex-end' justifyContent='flex-end'>
        <Button onClick={handleClose}>{t('close')}</Button>
      </Stack>
    </Dialog>
  )
}
