import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getYandexMapCheckKey } from '@/apis/map'

interface ErrorMapProps {
  response: {
    status: number
  }
}

const KEYS = [
  '8b56a857-f05f-4dc6-a91b-bc58f302ff21',
  'a2617277-0573-40b0-a017-85d5da6270eb',
  'd2633460-8cef-4761-a075-28606eb1cef6',
  'a6109ff2-9e28-48bc-86b5-a5366e8be390',
  '29294198-6cdc-4996-a870-01e89b830f3e',
  'b2f23b5a-acf4-4e88-947e-a53e339ab0dc',
  'e01731fd-cbf5-4a15-9a50-14d7d90a78d7',
  '920e70cd-e1fc-4fd7-9850-bfc247be19a3',
]

export const useYandexKey = () => {
  const [apikey, setApikey] = useState(localStorage.getItem('apikey') ?? KEYS[0])
  const { isLoading } = useQuery({
    queryKey: ['key', apikey],
    queryFn: async () =>
      await getYandexMapCheckKey({
        apikey,
        geocode: 'Uzbekistan',
      }),
    onError: (error: ErrorMapProps) => {
      if (error.response.status === 403) {
        const findIndex = KEYS.findIndex(k => k === apikey)
        const isLast = findIndex + 1 === KEYS.length
        const key = isLast ? KEYS[0] : KEYS[findIndex + 1]
        setApikey(key)
        localStorage.setItem('apikey', key)
      }
    },
  })

  return { apikey, isLoading }
}
