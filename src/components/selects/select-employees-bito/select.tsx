import { Select } from '../select'
import { useQuery } from '@tanstack/react-query'
import { useWatch, useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SchemaTypeBito } from '@/components/forms/bito/form.schema'
import { getBitoEmployees } from '@/apis/admin/bito'

export const SelectEmployeesBito = () => {
  const form = useFormContext<SchemaTypeBito>()
  const token = useWatch({ name: 'token', control: form.control })
  const organization_id = useWatch({ name: 'organization_id', control: form.control })

  const enabled = !!organization_id && organization_id?.length > 0
  const { data = { data: [] }, isLoading } = useQuery({
    enabled,
    queryFn: async () => await getBitoEmployees({ token, organization_id }),
    queryKey: [REACT_QUERY_KEYS.BITO_EMPLOYEES, token, organization_id],
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))
      return { ...res, data }
    },
  })

  return (
    <Select
      disabled={!enabled}
      options={data.data}
      label='responsible_person'
      control={form.control}
      name='employee_id'
      loading={enabled && isLoading}
      placeholder='select_responsible_person'
    />
  )
}
