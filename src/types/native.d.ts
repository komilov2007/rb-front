/**
 * Contract with the React Native WebView shell (rb-frontend-mobile).
 * Mirrors rb-shop/env.d.ts — the shell injects `isReactNativeApp` before the
 * page's own scripts run, and `ReactNativeWebView` is the message bridge.
 */
declare global {
  interface Window {
    isReactNativeApp?: boolean
    ReactNativeWebView?: { postMessage: (data: string) => void }
  }
}

export {}
