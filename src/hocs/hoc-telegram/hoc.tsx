import { useEffect } from 'react'
import type { HocProps } from '@/types/hoc'
import { isMobileDevice } from '@/utils/device'

export const HocTelegram = (props: HocProps) => {
  useEffect(() => {
    const telegram = window?.Telegram?.WebApp
    const device = isMobileDevice()

    if (!telegram) return

    telegram.ready()
    telegram.expand()
    telegram.enableClosingConfirmation()
    telegram.disableVerticalSwipes()
    if (device.isMobile) {
      // telegram.requestFullscreen()
      telegram?.LocationManager?.init()
    }
  }, [])

  return <>{props.children}</>
}
