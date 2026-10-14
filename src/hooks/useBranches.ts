import { ALL_OPTION } from '@/constants/option'
import { useQuery } from '@tanstack/react-query'
import { getBranchAll } from '@/apis/admin/branch'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const useBranches = () => {
  const { data = { data: [], options: [] }, isLoading } = useQuery({
    queryFn: getBranchAll,
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.BRANCH_ALL_LIST],
    select: res => {
      const newData = res.data.map(b => ({ label: b.name, value: String(b.id) }))
      const options = [ALL_OPTION, ...newData]
      return { ...res, data: newData, options }
    },
  })

  return { data: data.data, options: data.options, isLoading }
}
