import { useEffect } from 'react'
import { type HocProps } from '@/types/hoc'

export const Scroll = ({ children }: HocProps) => {
  if (navigator.userAgent.includes('Win')) {
    document.getElementsByTagName('body')[0].classList.add('win')
  } else if (navigator.userAgent.includes('Mac')) {
    document.getElementsByTagName('body')[0].classList.add('mac')
  }

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const inputs = document.querySelectorAll('input, textarea')
    inputs.forEach(input => {
      // @ts-ignore
      input.addEventListener('focus', handleFocus)
    })

    return () => {
      inputs.forEach(input => {
        // @ts-ignore
        input.removeEventListener('focus', handleFocus)
      })
    }
  }, [])

  return <>{children}</>
}
