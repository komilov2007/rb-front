import { Select } from '../select'
import { useCategoryList } from '@/hooks/useCategoryList'
import { type FieldValues } from 'react-hook-form'
import type { SelectCategoryProps } from '@/types/components'

export const SelectCategory = <T extends FieldValues>({
  hasAll,
  categoryId,
  ...props
}: SelectCategoryProps<T>) => {
  const { data, isLoading } = useCategoryList(hasAll ? { all: 1 } : {})
  const options = data?.data.filter(o => o.value !== categoryId)

  return <Select {...props} loading={isLoading} options={options ?? []} />
}
