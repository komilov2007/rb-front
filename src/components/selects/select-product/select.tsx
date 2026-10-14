import { useState, type SyntheticEvent } from 'react'
import { Spinner } from '@/components/spinner'
import TextField from '@mui/material/TextField'
import { useBoolean } from '@/hooks/useBoolean'
import { useDebounce } from '@/hooks/useDebounce'
import { useTranslation } from 'react-i18next'
import Autocomplete from '@mui/material/Autocomplete'
import { getProducts } from '@/apis/admin/product'
import { getPaginationOffset } from '@/utils/pagination'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Controller, type FieldValues, type Path, type Control } from 'react-hook-form'

const LIMIT = 15

interface SelectProductProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  disabled?: boolean
  enabled?: boolean
}

export const SelectProduct = <T extends FieldValues>({
  name,
  control,
  label = 'product',
  placeholder = 'select_product',
  disabled,
  enabled = true,
}: SelectProductProps<T>) => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')
  const search = useDebounce(inputValue, 400)

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data = { pages: [] },
  } = useInfiniteQuery({
    enabled,
    queryKey: [REACT_QUERY_KEYS.PRODUCT_LIST, search],
    queryFn: async ({ pageParam = 1 }) =>
      await getProducts({
        search,
        limit: LIMIT,
        offset: getPaginationOffset({ page: pageParam, limit: LIMIT }),
      }),
    getNextPageParam: lastPage => (lastPage.data.next ? lastPage.data.next : undefined),
    select: res => {
      const pages = res.pages.flatMap(page =>
        page.data.results.map(p => ({ value: String(p.id), label: p.name })),
      )
      return { ...res, pages }
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
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => (
        <Autocomplete
          fullWidth
          disabled={disabled}
          open={modal.value}
          options={data.pages}
          onOpen={modal.setTrue}
          onClose={modal.setFalse}
          value={data.pages.find(o => o.value === field.value) || null}
          onChange={(_, value) => {
            field.onChange(value?.value ?? '')
            setInputValue(value?.label ?? '')
          }}
          getOptionLabel={option => (typeof option === 'string' ? option : (option?.label ?? ''))}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          inputValue={inputValue}
          onInputChange={(_, value, reason) => {
            if (reason === 'reset') {
              return
            }
            if (reason === 'clear' || value === '') {
              field.onChange('')
            }
            setInputValue(value)
          }}
          filterOptions={x => x}
          loading={isLoading || isFetchingNextPage}
          ListboxProps={{ onScroll: handleScroll }}
          renderInput={params => (
            <TextField
              {...params}
              label={t(label)}
              placeholder={t(placeholder)}
              InputLabelProps={{ shrink: true }}
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
