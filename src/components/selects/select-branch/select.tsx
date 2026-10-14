import { useBranches } from '@/hooks/useBranches'
import { type FieldValues } from 'react-hook-form'
import { Select } from '@/components/selects/select'
import { type ControlProps } from '@/types/components'
import { ReactComponent as IconLocationMap } from '@/assets/icons/location-map.svg'

type SelectBranchProps<T extends FieldValues> = ControlProps<T> & {
  all?: boolean
}

export const SelectBranch = <T extends FieldValues>({
  all,
  name,
  control,
}: SelectBranchProps<T>) => {
  const { data, options, isLoading } = useBranches()

  return (
    <Select
      name={name}
      label='branch'
      control={control}
      loading={isLoading}
      placeholder='select_branch'
      options={all ? options : data}
      startAdornment={<IconLocationMap />}
    />
  )
}
