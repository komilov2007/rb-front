export interface ErrorProps {
  status: number
  /** Axios' own message — the only field present when the request never reached the server. */
  message: string
  /**
   * Absent on network-level failures (offline, DNS, timeout, aborted). This is
   * common on mobile, so every access must be guarded.
   */
  response?: {
    data: {
      error: string
      code: number | string
      message: string
      errors: Array<{
        field: string
        message: string
      }>
      detail: Array<{
        input: string
        loc: string[]
        msg: string
        type: string
      }>
    }
    status: number
    statusText: string
  }
  config?: {
    url: string
    baseURL: string
  }
}
