import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import TextField from '@mui/material/TextField'
import { useBoolean } from '@/hooks/useBoolean'
import { getEmployees } from '@/apis/admin/role'
import Autocomplete from '@mui/material/Autocomplete'
import { getPaginationOffset } from '@/utils/pagination'
import { useInfiniteQuery } from '@tanstack/react-query'
import { type SchemaTypeOrderFilter } from '@/utils/schema'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useRef, useMemo, useState, useEffect, type SyntheticEvent } from 'react'

const LIMIT = 15

interface OptionType {
  value: string
  label: string
  phone: string
}

export const SelectEmployee = () => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeOrderFilter>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const employeeValue = useWatch({ name: 'employee', control: form.control })
  const [inputValue, setInputValue] = useState(employeeValue?.name ?? '')

  useEffect(() => {
    if (employeeValue?.name && !inputValue) {
      setInputValue(employeeValue.name)
    }
  }, [employeeValue?.name, inputValue])

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    data = { pages: [] },
  } = useInfiniteQuery({
    queryKey: [REACT_QUERY_KEYS.EMPLOYEE_LIST, inputValue],
    queryFn: async ({ pageParam = 1 }) =>
      await getEmployees({
        limit: LIMIT,
        search: inputValue,
        offset: getPaginationOffset({ page: pageParam, limit: LIMIT }),
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * LIMIT
      return totalFetched < lastPage.data.count ? allPages.length + 1 : undefined
    },
    select: res => {
      const pages = res.pages.flatMap(page =>
        page.data.results.map(e => ({
          value: String(e.id),
          label: e.user.firstname,
          phone: e.user.phone,
        })),
      )
      return { ...res, pages }
    },
  })

  const options = useMemo<OptionType[]>(() => {
    if (!employeeValue) return data.pages
    const exists = data.pages.some(o => o.value === employeeValue.id)
    if (exists) return data.pages
    return [{ value: employeeValue.id, label: employeeValue.name, phone: '' }, ...data.pages]
  }, [data.pages, employeeValue])

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
      name='employee'
      control={form.control}
      render={({ field, fieldState: { error, invalid } }) => (
        <Autocomplete
          fullWidth
          open={modal.value}
          options={options}
          onOpen={modal.setTrue}
          onClose={modal.setFalse}
          value={options.find(o => o.value === field.value?.id) || null}
          onChange={(_, value) => {
            field.onChange(value ? { id: value.value, name: value.label } : null)
            setInputValue(value?.label ?? '')
          }}
          getOptionLabel={option => (typeof option === 'string' ? option : (option?.label ?? ''))}
          inputValue={inputValue}
          onInputChange={(_, value, reason) => {
            if (reason === 'reset') {
              return
            }
            if (reason === 'clear' || value === '') {
              field.onChange(null)
            }
            setInputValue(value)
          }}
          filterOptions={x => x}
          loading={isLoading || isFetchingNextPage}
          ListboxProps={{
            onScroll: handleScroll,
          }}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={params => (
            <TextField
              {...params}
              label={t('employee')}
              inputRef={inputRef}
              placeholder={t('select_employee')}
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
              {option.label} {option.phone && `(${option.phone})`}
            </li>
          )}
        />
      )}
    />
  )
}
