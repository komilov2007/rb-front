import { type HocProps } from '@/types/hoc'
import { getPrivacyPolicy } from '@/apis/common'
import { usePrivacyPolicyStore } from '@/store/privacy-policy'
import { useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const HocPrivacyPolicy = ({ children }: HocProps) => {
  const setPrivacyPolicy = usePrivacyPolicyStore(state => state.setPrivacyPolicy)

  useQuery({
    queryFn: getPrivacyPolicy,
    queryKey: [REACT_QUERY_KEYS.PRIVACY_POLICY],
    onSuccess: res => {
      setPrivacyPolicy(res.data)
    },
  })

  return <>{children}</>
}
