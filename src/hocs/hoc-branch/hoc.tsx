import { type HocProps } from '@/types/hoc'
import { ROUTER } from '@/constants/router'
import { getBranchList } from '@/apis/common'
import { Spinner } from '@/components/spinner'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useProfileStore } from '@/store/profile'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const HocBranches = ({ children }: HocProps) => {
  const { pathname } = useLocation()
  const setBranches = useProfileStore(state => state.setBranches)
  const enabled =
    pathname.startsWith(`${ROUTER.ADMIN}/${ROUTER.PRODUCTS}`) ||
    (pathname.startsWith(ROUTER.SIGN_UP) && pathname.endsWith(ROUTER.CREATE_PRODUCT))

  const { isLoading } = useQuery({
    enabled,
    queryFn: getBranchList,
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.BRANCHES_LIST],
    select: res => {
      const newData = res.data.map(b => ({ label: b.name, value: b.id }))
      return { ...res, data: newData }
    },
    onSuccess: res => {
      setBranches(res.data)
    },
  })

  return <>{isLoading && enabled ? <Spinner center /> : children}</>
}
