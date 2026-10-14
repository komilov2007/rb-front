export const numberFormat = (number: number | string) => {
  return parseFloat(String(number)).toLocaleString()
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)} bln`
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)} mln`
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)} k`
  } else {
    return `${num}`
  }
}
