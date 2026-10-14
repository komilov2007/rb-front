export {}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

interface TelegramWebApp {
  ready: () => void
  expand: () => void
  close: () => void
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  colorScheme: 'light' | 'dark'
  platform: string
  initData: string
  initDataUnsafe: object
  enableClosingConfirmation: () => void
  disableVerticalSwipes: () => void
  requestFullscreen: () => void
  LocationManager: { init: () => void }
}
