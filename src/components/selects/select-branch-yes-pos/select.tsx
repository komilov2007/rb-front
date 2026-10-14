import { useQuery } from '@tanstack/react-query'
import { Select } from '@/components/selects/select'
import { type SchemaTypeYesPos } from '@/utils/schema'
import { getYesPosBranches } from '@/apis/admin/yes-pos'
import { useWatch, useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconLocationMap } from '@/assets/icons/location-map.svg'

export const SelectBranchYesPos = () => {
  const form = useFormContext<SchemaTypeYesPos>()
  const api_key = useWatch({ name: 'api_key', control: form.control })
  const { data = { data: [] }, isLoading } = useQuery({
    enabled: !!api_key,
    queryFn: async () => await getYesPosBranches({ api_key }),
    queryKey: [REACT_QUERY_KEYS.BRANCH_ALL_LIST, api_key],
    select: res => {
      const newData = res.data.map(b => ({ label: b.name, value: String(b.id) }))
      return { ...res, data: newData }
    },
  })

  return (
    <Select
      label='branch'
      name='branch_id'
      options={data.data}
      disabled={!api_key}
      control={form.control}
      placeholder='select_branch'
      loading={isLoading && !!api_key}
      startAdornment={<IconLocationMap />}
    />
  )
}
