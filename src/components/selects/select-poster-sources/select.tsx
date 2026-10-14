import { Select } from '../select'
import { useQuery } from '@tanstack/react-query'
import IconButton from '@mui/material/IconButton'
import { getPosterSources } from '@/apis/admin/poster'
import { type SchemaTypePoster } from '@/utils/schema'
import InputAdornment from '@mui/material/InputAdornment'
import { useWatch, useFormContext } from 'react-hook-form'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export const SelectSources = () => {
  const form = useFormContext<SchemaTypePoster>()
  const token = useWatch({ name: 'token', control: form.control })
  const enabled = !!token && token?.length > 0
  const { data = { data: [] }, isLoading } = useQuery({
    enabled,
    queryKey: [REACT_QUERY_KEYS.POSTER_SOURCES, token],
    queryFn: async () => await getPosterSources({ token }),
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: String(c.id) }))
      return { ...res, data }
    },
  })

  const handleClearSource = () => {
    form.setValue('source_id', undefined)
  }

  if (data.data.length > 0) {
    return (
      <Select
        name='source_id'
        label='price_type'
        disabled={!enabled}
        options={data.data}
        control={form.control}
        placeholder='select_price_type'
        loading={enabled && isLoading}
        endAdornment={
          form.watch('source_id') && (
            <InputAdornment sx={{ marginRight: '50px' }} position='end'>
              <IconButton sx={{ p: '4px' }} onClick={handleClearSource}>
                <IconRemove />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    )
  }

  return null
}
