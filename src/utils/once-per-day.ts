export const todayKey = (tz = 'Asia/Tashkent') =>
  new Date().toLocaleDateString('en-CA', { timeZone: tz })

export function shouldShowOncePerDay(key: string, tz = 'Asia/Tashkent') {
  return localStorage.getItem(key) !== todayKey(tz)
}

export function markShownToday(key: string, tz = 'Asia/Tashkent') {
  localStorage.setItem(key, todayKey(tz))
}
