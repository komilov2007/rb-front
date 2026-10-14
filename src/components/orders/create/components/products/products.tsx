import { Card } from '../card'
import { Skeleton } from './skeleton'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import Typography from '@mui/material/Typography'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useProducts, type ProductsProps } from './useProducts'
import { forwardRef, Fragment, useImperativeHandle } from 'react'

export const Products = forwardRef((props: ProductsProps, ref) => {
  const { t } = useTranslation()
  const { data, value, handleNext, handleReset } = useProducts(props)
  useImperativeHandle(ref, () => {
    return {
      handleReset,
    }
  }, [handleReset])

  return (
    <Stack
      flexGrow={1}
      component='ul'
      overflow='auto'
      id='scrollableProducts'
      height={{ xs: 'calc(100dvh - 230px)', md: 'calc(100vh - 201px)' }}
      sx={{
        '.infinite-scroll-component': {
          overflow: 'hidden !important',
        },
      }}
    >
      <InfiniteScroll
        hasMore={value}
        next={handleNext}
        dataLength={data.length}
        scrollableTarget='scrollableProducts'
        loader={data.length === 0 ? <Skeleton /> : <Spinner center />}
        endMessage={
          data.length === 0 ? (
            <Stack p='20px'>
              <Typography variant='title20' align='center'>
                {t('there_is_no_product')}
              </Typography>
            </Stack>
          ) : null
        }
      >
        <Stack
          gap='14px 22px'
          display='grid'
          gridTemplateColumns={{ xs: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }}
        >
          {data.map(product => {
            const categoryTitle = () =>
              product.isFirst && (
                <Stack sx={{ gridColumnStart: 1, gridColumnEnd: { xs: 3, md: 4 } }}>
                  <Typography variant='title30' component='h2' fontWeight={700}>
                    {product.category?.name}
                  </Typography>
                </Stack>
              )

            if (product.isLast) {
              if (product.index === 1) {
                return (
                  <Fragment key={product.id}>
                    {categoryTitle()}
                    <Card {...product} />
                    <Stack width='100%' />
                    <Stack width='100%' sx={{ display: { xs: 'none', md: 'flex' } }} />
                  </Fragment>
                )
              }
              if (product.index === 2) {
                return (
                  <Fragment key={product.id}>
                    {categoryTitle()}
                    <Card {...product} />
                    <Stack width='100%' sx={{ display: { xs: 'none', md: 'flex' } }} />
                  </Fragment>
                )
              }
            }

            return (
              <Fragment key={product.id}>
                {categoryTitle()}
                <Card {...product} />
              </Fragment>
            )
          })}
        </Stack>
      </InfiniteScroll>
    </Stack>
  )
})
