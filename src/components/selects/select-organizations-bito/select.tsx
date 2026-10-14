import { Select } from '../select'
import { useQuery } from '@tanstack/react-query'
import { useWatch, useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SchemaTypeBito } from '@/components/forms/bito/form.schema'
import { getBitoOrganization } from '@/apis/admin/bito'

export const SelectOrganizationsBito = () => {
  const form = useFormContext<SchemaTypeBito>()
  const price_type = useWatch({ name: 'price_type', control: form.control })
  const token = useWatch({ name: 'token', control: form.control })
  const enabled = !!price_type && price_type?.length > 0
  const { data = { data: [] }, isLoading } = useQuery({
    enabled,
    queryFn: async () => await getBitoOrganization({ token, price_type }),
    queryKey: [REACT_QUERY_KEYS.BITO_ORGANIZATIONS, price_type, token],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      disabled={!enabled}
      options={data.data}
      label='organization'
      control={form.control}
      name='organization_id'
      loading={enabled && isLoading}
      placeholder='select_organization'
    />
  )
}
