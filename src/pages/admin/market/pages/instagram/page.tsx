import { ROUTER } from '@/constants/router'
import { Spinner } from '@/components/spinner'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { setInstagram } from '@/apis/admin/instagram'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'

const INSTAGRAM_ROBO_MARKET_ID = import.meta.env.VITE_API_INSTAGRAM_ROBO_MARKET_ID

const Page = () => {
  const navigate = useNavigate()
  const [code] = useSearchParamsState('code', '')
  const { isLoading } = useQuery({
    queryFn: async () => await setInstagram(code),
    queryKey: [REACT_QUERY_KEYS.INSTAGRAM, code],
    onSuccess: () => {
      navigate(`${ROUTER.ADMIN}/${ROUTER.ROBO_MARKET}/${INSTAGRAM_ROBO_MARKET_ID}`)
    },
  })

  return <>{isLoading ? <Spinner center /> : null}</>
}

export default Page
