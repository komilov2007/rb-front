import { useProfileStore } from '@/store/profile'
import type { FieldValues } from 'react-hook-form'
import { Select } from '@/components/selects/select'
import type { ControlProps } from '@/types/components'

export const SelectBranches = <T extends FieldValues>({ name, control }: ControlProps<T>) => {
  const branches = useProfileStore(state => state.branches)

  return (
    <Select
      multiple
      name={name}
      label='branches'
      control={control}
      options={branches}
      placeholder='select_branches'
    />
  )
}
