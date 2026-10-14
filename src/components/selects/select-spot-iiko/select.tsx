import { Map } from './map'
import Stack from '@mui/material/Stack'
import { MAP_CENTER } from '@/constants/map'
import Skeleton from '@mui/material/Skeleton'
import { useQuery } from '@tanstack/react-query'
import type { IikoBranchProps } from '@/types/iiko'
import type { SchemaTypeIiko } from '@/utils/schema'
import { SelectTerminals } from '../select-terminals'
import { getIikoOrganizations } from '@/apis/admin/iiko'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { useWatch, useFieldArray, useFormContext } from 'react-hook-form'

interface SelectSpotIikoProps {
  branches: IikoBranchProps[]
}

export const SelectSpotIiko = ({ branches }: SelectSpotIikoProps) => {
  const form = useFormContext<SchemaTypeIiko>()
  const api_login = useWatch({ name: 'api_login', control: form.control })
  const enabled = !!api_login && api_login?.length > 0
  const { isLoading } = useQuery({
    enabled,
    queryFn: async () => await getIikoOrganizations({ api_login }),
    queryKey: [REACT_QUERY_KEYS.IIKO_ORGANIZATIONS, api_login],
    onSuccess: res => {
      const data = res.data.map(b => {
        const branch = branches.find(branch => String(branch.spot_id) === String(b.id))
        if (branch) {
          return {
            ...branch,
            checked: true,
            spot_name: b.name,
          }
        }
        return {
          checked: false,
          terminal_id: '',
          spot_name: b.name,
          spot_id: String(b.id),
          latitude: MAP_CENTER.latitude,
          longitude: MAP_CENTER.longitude,
        }
      })
      form.setValue('branches', data)
    },
  })

  const { fields } = useFieldArray({
    name: 'branches',
    control: form.control,
  })

  if (typeof api_login === 'string' && api_login?.length > 0) {
    return (
      <Stack component='ul'>
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => (
              <Skeleton component='li' key={i} width='200px' height='20px' />
            ))
          : fields.map((f, index) => (
              <Stack key={f.id} component='li'>
                <InputCheckbox
                  label={f.spot_name}
                  sx={{ ml: '-9px' }}
                  control={form.control}
                  name={`branches.${index}.checked`}
                  error={!!form.formState.errors.branches}
                />
                {form.watch(`branches.${index}.checked`) && (
                  <Stack gap='10px'>
                    <SelectTerminals id={f.spot_id} index={index} />
                    <Map index={index} {...f} />
                  </Stack>
                )}
              </Stack>
            ))}
      </Stack>
    )
  }
  return null
}
