import { useEffect, useRef } from 'react'
import { useBoolean } from '@/hooks/useBoolean'
import { useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authorizeRobohub } from '@/apis/admin/robo-market'
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'

const hostOf = (url: string) => {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

export const useAuthorize = (props: RoboMarketAppDetaiProps) => {
  const modal = useBoolean()
  const asked = useRef(false)
  const [searchParams] = useSearchParams()
  const { requireAccess, isReady } = useSubscriptionAccess()

  const redirectUri = searchParams.get('redirect_uri') ?? ''
  const state = searchParams.get('state') ?? ''
  const isEnabled = props.slug === 'robohub' && !!redirectUri && !!state

  const authorize = useMutation({
    mutationFn: authorizeRobohub,
    onSuccess: res => {
      // keep the dialog in its loading state, the browser leaves the app right away
      window.location.href = res.data.redirect_url
    },
  })

  useEffect(() => {
    if (!isEnabled || !isReady || asked.current) return
    asked.current = true
    if (requireAccess(props)) modal.setTrue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled, isReady])

  const handleAllow = () => {
    authorize.mutate({ redirect_uri: redirectUri, state })
  }

  return { modal, authorize, handleAllow, isEnabled, host: hostOf(redirectUri) }
}
