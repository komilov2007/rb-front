import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSmsMailings } from '@/apis/admin/sms-mailing'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const usePage = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string | number>('all')

  const { data = { data: [] }, isLoading } = useQuery({
    queryFn: getSmsMailings,
    queryKey: [REACT_QUERY_KEYS.SMS_MAILING_LIST],
    select: res => {
      const data = res.data.map(s => ({
        ...s,
        // @ts-expect-error
        status: s.status === 'service' || s.status === 'reklama' ? 'confirmed' : s.status,
      }))
      return { ...res, data }
    },
  })

  return {
    data,
    status,
    search,
    setStatus,
    isLoading,
    setSearch,
  }
}
