import { Select } from '../select'
import { useQuery } from '@tanstack/react-query'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import type { SchemaTypeERA } from '@/components/forms/era/form.schema'
import { getERAStores } from '@/apis/admin/era'

export const SelectStore = () => {
  const form = useFormContext<SchemaTypeERA>()
  const username = form.watch('username')
  const password = form.watch('password')
  const enabled = !!username && !!password
  const { data = { data: [] }, isLoading } = useQuery({
    enabled,
    queryKey: [REACT_QUERY_KEYS.ERA_STORES_DETAIL, username, password],
    queryFn: async () => await getERAStores({ username, password }),
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: String(c.id) }))
      return { ...res, data }
    },
  })

  const handleClearSource = () => {
    form.setValue('store_id', '')
  }

  return (
    <Select
      name='store_id'
      label='store_id'
      disabled={!enabled}
      options={data.data}
      control={form.control}
      placeholder='select_store_id'
      loading={enabled && isLoading}
      endAdornment={
        form.watch('store_id') && (
          <InputAdornment sx={{ marginRight: '50px' }} position='end'>
            <IconButton sx={{ p: '4px' }} onClick={handleClearSource}>
              <IconRemove />
            </IconButton>
          </InputAdornment>
        )
      }
    />
  )

  return null
}
