import * as Sentry from '@sentry/react'

/**
 * Background failures the user cannot act on (push-token registration, message
 * subscription). These used to reach the UI as `toast.error(JSON.stringify(error))`,
 * which renders an empty `{}` box for any `DOMException` or plain `Error` —
 * their properties are non-enumerable. Log for us, stay silent for the user.
 */
export const reportError = (context: string, error: unknown) => {
  if (import.meta.env.DEV) console.warn(`[${context}]`, error)
  Sentry.captureException(error, { tags: { context } })
}
