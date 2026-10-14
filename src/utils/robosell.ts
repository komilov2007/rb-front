import { HOSTNAME } from '@/constants/domain-themes'

export const isRobosell = () => {
  return (
    HOSTNAME.includes('robosell.uz') ||
    HOSTNAME.includes('dev.robosell.uz') ||
    HOSTNAME.includes('localhost')
  )
}
