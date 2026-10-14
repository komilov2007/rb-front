/**
 * Helpers for running inside the React Native WebView shell.
 *
 * In a WebView `window.open` and synthetic `<a download>` clicks silently do
 * nothing, and navigating with `window.location.href` to a third-party page
 * strands the user with no browser chrome to get back. Every such call site
 * should route through here instead.
 */

/**
 * Dual signal, same as rb-shop/src/provider/telegram.tsx:64 — the injected flag
 * or the presence of the bridge object.
 */
export const isReactNative = () =>
  typeof window !== 'undefined' &&
  (window.isReactNativeApp === true || typeof window.ReactNativeWebView !== 'undefined')

const post = (payload: Record<string, unknown>) => {
  try {
    window.ReactNativeWebView?.postMessage(JSON.stringify(payload))
    return true
  } catch {
    return false
  }
}

/**
 * Opens a URL outside the SPA. Native shell hands it to the OS (so `t.me` opens
 * Telegram and PDFs open in a viewer); on the web it is a normal new tab.
 */
export const openExternal = (url?: string | null) => {
  if (!url) return
  if (isReactNative() && post({ type: 'OPEN_URL', url })) return
  // No `noopener`: the Wolt and Instagram OAuth popups reach back through
  // `window.opener`, and this helper replaced their plain `window.open` calls.
  window.open(url, '_blank')
}

/**
 * Downloads a file. `url` must be directly fetchable by the OS — for in-memory
 * blobs the caller keeps its own `a.click()` path on the web and should prefer a
 * server-generated URL when running natively.
 */
export const downloadExternal = (url?: string | null) => {
  if (!url) return
  if (isReactNative() && post({ type: 'DOWNLOAD_FILE', url })) return
  // No `noopener`: the Wolt and Instagram OAuth popups reach back through
  // `window.opener`, and this helper replaced their plain `window.open` calls.
  window.open(url, '_blank')
}

/** True when the current document is inside the native shell on a small screen. */
export const isNativeMobile = () => isReactNative()
