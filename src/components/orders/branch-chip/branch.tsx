import { Spinner } from '@/components/spinner'
import { useBranches } from '@/hooks/useBranches'

interface BranchChipProps {
  id: string
}
export const BranchChip = ({ id }: BranchChipProps) => {
  const { data, isLoading } = useBranches()
  const branchName = data.find(b => b.value === id)?.label

  return <>{isLoading ? <Spinner /> : branchName}</>
}
