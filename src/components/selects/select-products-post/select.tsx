import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import TextField from '@mui/material/TextField'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import Autocomplete from '@mui/material/Autocomplete'
import { getPaginationOffset } from '@/utils/pagination'
import { type SchemaTypeTelegramPost } from '@/utils/schema'
import { useRef, useState, type SyntheticEvent } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import {
  getProducts,
  getDetailProduct,
  getProductsOnlineShop,
  getDetailProductOnlineShop,
} from '@/apis/admin/product'

const LIMIT = 15

export const SelectProductsPost = () => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')
  const form = useFormContext<SchemaTypeTelegramPost>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const productId = useWatch({ name: 'product_id', control: form.control })
  const { is_new_version, main_language } = useProfileStore(state => {
    return {
      is_new_version: state.me?.is_new_version,
      main_language: state.me?.main_language,
    }
  })

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data = { pages: [] },
  } = useInfiniteQuery({
    queryKey: [REACT_QUERY_KEYS.PRODUCT_LIST, inputValue, is_new_version],
    queryFn: async ({ pageParam = 1 }) =>
      is_new_version
        ? await getProductsOnlineShop({
            limit: LIMIT,
            search: inputValue,
            offset: getPaginationOffset({ page: pageParam, limit: LIMIT }),
          })
        : await getProducts({
            limit: LIMIT,
            search: inputValue,
            offset: getPaginationOffset({ page: pageParam, limit: LIMIT }),
          }),
    getNextPageParam: lastPage => (lastPage.data.next ? lastPage.data.next : undefined),
    select: res => {
      const pages = res.pages.flatMap(page =>
        // @ts-ignore
        page.data.results.map(p => ({ value: String(p.id), label: p?.name || p?.title })),
      )
      return { ...res, pages }
    },
  })
  useQuery({
    queryKey: [REACT_QUERY_KEYS.PRODUCT_DETAIL, productId, is_new_version],
    enabled: !!productId && productId?.length > 0,
    queryFn: async () =>
      is_new_version
        ? await getDetailProductOnlineShop(productId)
        : await getDetailProduct(Number(productId)),
    onSuccess: res => {
      form.clearErrors()
      const title = is_new_version ? res.data.title : res.data[`name_${main_language}`]
      const desc = is_new_version ? res.data.content : res.data[`desc_${main_language}`]
      const image = is_new_version ? res.data.images[0] : res.data?.photos[0]?.photo

      const photo = form.getValues('photo')
      const content = form.getValues('content')
      const button_title = form.getValues('button_title')
      if (!button_title || button_title.length === 0) {
        form.setValue('button_title', title)
      }
      if (!content || content.length === 0) {
        form.setValue('content', desc)
      }
      if (!photo || photo.length === 0) {
        form.setValue('photo', image)
      }
    },
  })

  const handleScroll = (event: SyntheticEvent) => {
    const listboxNode = event.currentTarget
    const bottomReached =
      listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 20
    if (bottomReached && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage()
    }
  }

  return (
    <Controller
      name='product_id'
      control={form.control}
      render={({ field, fieldState: { error, invalid } }) => (
        <Autocomplete
          fullWidth
          open={modal.value}
          options={data.pages}
          onOpen={modal.setTrue}
          onClose={modal.setFalse}
          value={data.pages.find(o => o.value === field.value) || null}
          onChange={(_, value) => {
            field.onChange(value?.value)
            setInputValue(value?.label as string)
          }}
          getOptionLabel={option => (typeof option === 'string' ? option : (option?.label ?? ''))}
          inputValue={inputValue}
          onInputChange={(_, value, reason) => {
            if (reason === 'reset') {
              return
            }
            if (reason === 'clear' || value === '') {
              form.setValue('product_id', '')
            }
            setInputValue(value)
          }}
          filterOptions={x => x}
          loading={isLoading || isFetchingNextPage}
          ListboxProps={{
            onScroll: handleScroll,
          }}
          renderInput={params => (
            <TextField
              {...params}
              label={t('product')}
              inputRef={inputRef}
              placeholder={t('select_product')}
              InputLabelProps={{
                shrink: true,
              }}
              error={invalid}
              helperText={error ? t(error.message as string) : ''}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {(isLoading || isFetchingNextPage) && <Spinner size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />
      )}
    />
  )
}
