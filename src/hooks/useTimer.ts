import dayjs from 'dayjs'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

interface TimerProps {
  time: string
  minute: number
}

export const useTimer = ({ time, minute }: TimerProps) => {
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const [timerData, setTimerData] = useState('MM:SS')

  const handleReset = useCallback(() => {
    const expireTime = dayjs(time).add(minute, 'minute')
    const defaultRemainingTime = expireTime.diff(dayjs(), 'second')
    setTimeInSeconds(defaultRemainingTime >= 0 ? defaultRemainingTime : 0)
  }, [time, minute])

  useLayoutEffect(() => {
    const expireTime = dayjs(time).add(minute, 'minute')
    const defaultRemainingTime = expireTime.diff(dayjs(), 'second')
    setTimeInSeconds(defaultRemainingTime >= 0 ? defaultRemainingTime : 0)
  }, [time, minute])

  const secondsToMS = useCallback((seconds: number) => {
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor((seconds % 3600) % 60)

    const mDisplay = m > 0 ? String(m).padStart(2, '0') : '00'
    const sDisplay = s > 0 ? String(s).padStart(2, '0') : '00'

    return mDisplay + ':' + sDisplay
  }, [])

  useEffect(() => {
    setTimerData(secondsToMS(timeInSeconds))
    const intervalId = setInterval(() => {
      if (timeInSeconds <= 0) {
        clearInterval(intervalId)
        return 0
      } else {
        setTimeInSeconds(prevState => prevState - 1)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [secondsToMS, timeInSeconds])

  const isTimeInSeconds = timeInSeconds > 0

  return { timerData, handleReset, timeInSeconds, isTimeInSeconds }
}
