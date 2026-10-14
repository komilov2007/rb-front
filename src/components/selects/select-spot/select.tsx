import { Map } from './map'
import Stack from '@mui/material/Stack'
import { MAP_CENTER } from '@/constants/map'
import Skeleton from '@mui/material/Skeleton'
import { getSpots } from '@/apis/admin/poster'
import { useQuery } from '@tanstack/react-query'
import type { SchemaTypePoster } from '@/utils/schema'
import type { PosterBranchProps } from '@/types/poster'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { useWatch, useFieldArray, useFormContext } from 'react-hook-form'

interface SelectSpotProps {
  branches: PosterBranchProps[]
}

export const SelectSpot = ({ branches }: SelectSpotProps) => {
  const form = useFormContext<SchemaTypePoster>()
  const token = useWatch({
    name: 'token',
    control: form.control,
  })
  const { fields } = useFieldArray({
    name: 'branches',
    control: form.control,
  })

  const { isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.SPOT_LIST, token],
    queryFn: async () => await getSpots(token),
    enabled: typeof token === 'string' && token?.length > 0,
    onSuccess: res => {
      const data = res.data.map(b => {
        const branch = branches.find(branch => Number(branch.spot_id) === Number(b.id))
        if (branch) {
          return {
            ...branch,
            checked: true,
            spot_name: b.name,
          }
        }
        return {
          checked: false,
          spot_name: b.name,
          spot_id: Number(b.id),
          latitude: MAP_CENTER.latitude,
          longitude: MAP_CENTER.longitude,
        }
      })
      form.setValue('branches', data)
    },
  })

  if (typeof token === 'string' && token?.length > 0) {
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
