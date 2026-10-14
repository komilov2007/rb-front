import { useEffect } from 'react'
import type { HocProps } from '@/types/hoc'

export const HocGoogleVerfication = ({ children }: HocProps) => {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'google-site-verification'
    meta.content = 'JOmytqhxcApvj_hRH6XHFYuAPLA-9aJOd7Ws3kQz4ic'
    document.head.appendChild(meta)

    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  return <>{children}</>
}
