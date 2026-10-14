interface TruncateProps {
  str: string
  max?: number
  sep?: string
}

export const truncate = ({ str, max, sep }: TruncateProps) => {
  max = max || 10
  const len = str.length
  if (len > max) {
    sep = sep || '...'
    const seplen = sep.length
    if (seplen > max) {
      return str.substring(len - max)
    }
    const n = -0.5 * (max - len - seplen)
    const center = len / 2
    return str.substring(0, center - n) + sep + str.substring(len - center + n)
  }
  return str
}

export function stripHtml(html: string) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}
