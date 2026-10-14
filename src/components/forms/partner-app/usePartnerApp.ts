import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type ErrorProps } from '@/types/error'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess'
import { connectPartnerApp, disconnectPartnerApp } from '@/apis/admin/robo-market'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'

const PARTNER_DESCRIPTION_KEYS: Record<string, string> = {
  gorgona: 'gorgona_description',
}

export const usePartnerApp = (props: RoboMarketAppDetaiProps) => {
  const modal = useBoolean()
  const confirm = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { requireAccess } = useSubscriptionAccess()

  const partnerSlug = String(props.partner_slug)
  const isShopMissing = props.is_connected === null || props.is_connected === undefined
  const isConnected = props.is_connected === true

  const descriptionKey = PARTNER_DESCRIPTION_KEYS[partnerSlug]
  const description = descriptionKey ? t(descriptionKey) : props.desc

  const refetchDetail = () => {
    void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.ROBO_MARKET_APP_DETAIL] })
  }

  const showError = (err: ErrorProps) => {
    const status = err.response?.status

    if (status === 400) {
      toast.error(t('first_select_a_shop'))
      return
    }
    if (status === 403) {
      toast.error(t('only_the_shop_owner_can_connect'))
      return
    }
    toast.error(err.response?.data?.message ?? t('some_error_occurred_please_try_again'))
  }

  const connect = useMutation({
    mutationFn: async () => await connectPartnerApp(partnerSlug),
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      refetchDetail()
    },
    onError: showError,
  })

  const disconnect = useMutation({
    mutationFn: async () => await disconnectPartnerApp(partnerSlug),
    onSuccess: () => {
      confirm.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      refetchDetail()
    },
    onError: (err: ErrorProps) => {
      if (err.response?.status === 404) {
        confirm.setFalse()
        refetchDetail()
        return
      }
      showError(err)
    },
  })

  const handleOpen = () => {
    if (isConnected || requireAccess(props)) modal.setTrue()
  }

  const handleConnect = () => {
    if (isShopMissing) return
    connect.mutate()
  }

  return {
    t,
    modal,
    confirm,
    connect,
    disconnect,
    isConnected,
    description,
    isShopMissing,
    handleOpen,
    handleConnect,
  }
}
