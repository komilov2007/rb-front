import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { disconnectRobohub } from '@/apis/admin/robo-market'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'

export const useFormRobohub = (props: RoboMarketAppDetaiProps) => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { requireAccess } = useSubscriptionAccess()

  const disconnect = useMutation({
    mutationFn: disconnectRobohub,
    onSuccess: () => {
      modal.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.ROBO_MARKET_APP_DETAIL] })
    },
  })

  const handleClick = () => {
    // an already connected merchant can always reach the modal to disconnect
    if (props.is_connected || requireAccess(props)) modal.setTrue()
  }

  return { t, modal, disconnect, handleClick }
}
