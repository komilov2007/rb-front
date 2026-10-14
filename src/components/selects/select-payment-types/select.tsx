import { Select } from '../select'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { PAYMENT_TYPES } from '@/constants/payment'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getActivePaymentList } from '@/apis/admin/payment'
import { type SchemaTypePaymentTypesMerchant } from '@/utils/schema'

export const SelectPaymentTypes = () => {
  const form = useFormContext<SchemaTypePaymentTypesMerchant>()
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.ACTIVE_PAYMENT_LIST],
    queryFn: getActivePaymentList,
    select: res => {
      const data = res.data.map(p => ({
        label: PAYMENT_TYPES[p.state]?.label ?? p.state,
        value: p.data?.id as number,
      }))
      return { ...res, data }
    },
  })

  return (
    <Select
      multiple
      name='payment_types'
      label='payment_types'
      options={data.data}
      loading={isLoading}
      control={form.control}
      placeholder='select_payment_types'
    />
  )
}
