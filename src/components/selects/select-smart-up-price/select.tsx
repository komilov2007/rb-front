import { Select } from '../select/select'
import { useQuery } from '@tanstack/react-query'
import { type SchemaTypeSmartUp } from '@/utils/schema'
import { priceTypeSmartUp } from '@/apis/admin/smart-up'
import { useFormContext, useWatch } from 'react-hook-form'
import { type SelectChangeEvent } from '@mui/material/Select'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const SelectSmartUpPrice = () => {
  const form = useFormContext<SchemaTypeSmartUp>()
  const login = useWatch({
    name: 'login',
    control: form.control,
  })
  const password = useWatch({
    name: 'password',
    control: form.control,
  })
  const fillial = useWatch({
    name: 'fillial',
    control: form.control,
  })
  const enabled = login?.length > 0 && password?.length > 0 && fillial?.length > 0

  const { data = { data: [], options: [] }, isLoading } = useQuery({
    enabled,
    queryFn: async () =>
      await priceTypeSmartUp({
        login,
        fillial,
        password,
      }),
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      REACT_QUERY_KEYS.SMART_UP_PRICE_TYPE_LIST,
      enabled,
      enabled ? { login, fillial, password } : {},
    ],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.code }))
      return { ...res, options: data }
    },
  })

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const option = data.data.find(p => p.code === e.target.value)
    form.setValue('price_type_currency_code', option?.currency_code as string)
    form.setValue('price_type_name', option?.name as string)
  }

  if (!enabled) {
    return null
  }

  return (
    <Select
      label='<Цены>'
      loading={isLoading}
      name='price_type_code'
      control={form.control}
      options={data.options}
      onChange={handleChange}
      placeholder='Enter price type'
    />
  )
}
