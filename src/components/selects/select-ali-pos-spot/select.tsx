import { Map } from './map'
import Stack from '@mui/material/Stack'
import { MAP_CENTER } from '@/constants/map'
import Skeleton from '@mui/material/Skeleton'
import { useQuery } from '@tanstack/react-query'
import { getAliposSpots } from '@/apis/admin/ali-pos'
import type { SchemaTypeAliPos } from '@/utils/schema'
import type { AliPosBranchProps } from '@/types/ali-pos'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { useWatch, useFieldArray, useFormContext } from 'react-hook-form'

interface SelectAliPosSpotProps {
  branches: AliPosBranchProps[]
}

export const SelectAliPosSpot = ({ branches }: SelectAliPosSpotProps) => {
  const form = useFormContext<SchemaTypeAliPos>()
  const client_secret = useWatch({
    name: 'client_secret',
    control: form.control,
  })
  const client_id = useWatch({
    name: 'client_id',
    control: form.control,
  })

  const { fields } = useFieldArray({
    name: 'branches',
    control: form.control,
  })

  const enabled =
    typeof client_secret === 'string' &&
    client_secret?.length > 0 &&
    typeof client_id === 'string' &&
    client_id?.length > 0

  const { isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.ALI_POS_SPOT_LIST, client_secret, client_id],
    queryFn: async () => await getAliposSpots({ client_secret, client_id }),
    enabled,
    onSuccess: res => {
      const data = res.data.map(b => {
        const branch = branches.find(branch => String(branch.spot_id) === String(b.id))
        if (branch) {
          return {
            ...branch,
            checked: true,
            spot_name: b.title,
          }
        }
        return {
          checked: false,
          spot_name: b.title,
          spot_id: String(b.id),
          latitude: MAP_CENTER.latitude,
          longitude: MAP_CENTER.longitude,
        }
      })
      form.setValue('branches', data)
    },
  })

  if (enabled) {
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
                  control={form.control}
                  name={`branches.${index}.checked`}
                  error={!!form.formState.errors.branches}
                />
                {form.watch(`branches.${index}.checked`) && <Map index={index} />}
              </Stack>
            ))}
      </Stack>
    )
  }
  return null
}
