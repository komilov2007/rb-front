import List from '@mui/material/List'
import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'
import ListItem from '@mui/material/ListItem'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getProductsOnlineShop } from '@/apis/admin/product'
import { type ProductListOnlineShopProps } from '@/types/product-online-shop'
import { object, type InferType, string } from 'yup'
import FormHelperText from '@mui/material/FormHelperText'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from '@/components/spinner'
import { getPaginationOffset } from '@/utils/pagination'
import { useBoolean } from '@/hooks/useBoolean'

interface SelectedProps {
  value: string
  label: string
}

interface ProductItemProps extends ProductListOnlineShopProps {
  onSelect: (props: SelectedProps) => void
}

export const productOnlineShopSchema = object().shape({
  product_id: string(),
  product_name: string(),
})

export type SchemaTypeProductOnlineShop = InferType<typeof productOnlineShopSchema>

const LIMIT = 10

function ProductItem(props: ProductItemProps) {
  const handleOpen = () => {
    props.onSelect({ value: props.id, label: props.title })
  }

  return (
    <ListItem button key={props.id} onClick={handleOpen}>
      <ListItemText primary={props.title} />
    </ListItem>
  )
}

export const SelectProductsOnlineShopBanner = () => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<SelectedProps>()
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const product = form.watch('product_id')
  const productName = form.watch('product_name')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState<ProductListOnlineShopProps[]>([])
  const { value: hasMore, setTrue: setHasMore, setFalse: setNoMore } = useBoolean(true)

  const queryKey = [REACT_QUERY_KEYS.PRODUCT_LIST, search, page]

  const { isLoading, isFetching } = useQuery({
    queryKey,
    keepPreviousData: true,
    enabled: open,
    queryFn: async () => {
      return await getProductsOnlineShop({
        search,
        limit: LIMIT,
        offset: getPaginationOffset({ page, limit: LIMIT }),
      })
    },
    onSuccess: res => {
      const oldProducts = search === '' && page === 1 ? [] : data
      const newData = page === 1 ? res.data.results : [...oldProducts, ...res.data.results]

      setData(newData)
      setTotal(res.data.count)

      if (res.data.count === newData.length) {
        setNoMore()
      }
    },
  })

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
    setData([])
    setPage(1)
    setHasMore()
    setTotal(0)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSearch('')
    setData([])
    setPage(1)
    setHasMore()
    setTotal(0)
  }

  const handleSelect = ({ value, label }: SelectedProps) => {
    form.setValue('product_id', value)
    form.setValue('product_name', label)
    setSelected({ value, label })
    handleClose()
  }

  const handleNext = () => {
    if (!isFetching && !isLoading) {
      if (total > data.length) {
        setPage(page + 1)
      } else {
        setNoMore()
      }
    }
  }

  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue)
    setData([])
    setPage(1)
    setHasMore()
    setTotal(0)
  }

  const invalid = !!form.formState.errors?.product_id?.message

  useEffect(() => {
    if (productName && product) {
      form.setValue('product_id', product)
      setSelected({ value: product, label: productName })
    }
  }, [product, productName])

  const filtered =
    search.length > 0
      ? data.filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
      : data

  const defaultValue = data.find(item => item.id === form.watch('product_id'))?.title

  return (
    <>
      <Stack>
        <TextField
          fullWidth
          ref={inputRef}
          onClick={handleOpen}
          label={t('product')}
          InputProps={{ readOnly: true }}
          value={selected?.label ?? defaultValue}
          placeholder={t('select_product')}
        />
        {invalid && (
          <FormHelperText error={invalid}>
            {t(form.formState.errors?.product_id?.message as string)}
          </FormHelperText>
        )}
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ zIndex: 99999, width: '100%' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: inputRef.current?.offsetWidth || 'auto',
            },
          },
        }}
      >
        <Stack gap='10px' sx={{ p: 2, overflow: 'hidden', maxHeight: '300px' }}>
          <TextField
            fullWidth
            size='small'
            placeholder={t('search')}
            value={search}
            onChange={e => {
              handleSearchChange(e.target.value)
            }}
          />
          <Stack sx={{ overflow: 'auto' }} id='scrollableProductList' height='250px'>
            {isLoading && data.length === 0 ? (
              <Stack gap='5px' component='ul'>
                {Array.from({ length: 6 }, (_, index) => (
                  <Stack key={index} component='li'>
                    <Skeleton width='100%' height='30px' variant='rounded' />
                  </Stack>
                ))}
              </Stack>
            ) : (
              <InfiniteScroll
                hasMore={hasMore}
                next={handleNext}
                dataLength={filtered.length}
                scrollableTarget='scrollableProductList'
                loader={data.length === 0 ? null : <Spinner center />}
                endMessage={
                  filtered.length === 0 ? (
                    <Typography variant='body2' sx={{ mt: 1, textAlign: 'center' }}>
                      {t('not_found')}
                    </Typography>
                  ) : null
                }
                style={{ overflow: 'hidden' }}
              >
                <List dense>
                  {filtered.map(item => (
                    <ProductItem key={item.id} {...item} onSelect={handleSelect} />
                  ))}
                </List>
              </InfiniteScroll>
            )}
          </Stack>
        </Stack>
      </Popover>
    </>
  )
}
