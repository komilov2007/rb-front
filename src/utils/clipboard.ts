import type { ClipboardEvent } from 'react'

/**
 * `navigator.clipboard.readText()` is unusable on mobile: it does not exist in
 * Android WebView at all (so the property access itself throws) and iOS gates it
 * behind a permission prompt. A paste event already carries the text, so read it
 * from there and only fall back to the async API.
 */
export const readPastedText = async (event?: ClipboardEvent<HTMLElement>) => {
  const fromEvent = event?.clipboardData?.getData('text')
  if (fromEvent) return fromEvent

  try {
    return (await navigator.clipboard?.readText()) ?? ''
  } catch {
    return ''
  }
}

/** Strips formatting and the country code, matching what the phone inputs store. */
export const pastedPhone = async (event?: ClipboardEvent<HTMLElement>) => {
  const text = await readPastedText(event)
  return text.replace(/\s/g, '').replace(/^\+?998/, '')
}

/** Never throws — `navigator.clipboard` can be absent or permission-denied. */
export const writeClipboard = async (text: string) => {
  try {
    if (!navigator.clipboard?.writeText) return false
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
