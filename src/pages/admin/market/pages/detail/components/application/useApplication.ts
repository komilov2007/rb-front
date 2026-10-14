import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useMutation } from '@tanstack/react-query'
import { sendApplication } from '@/apis/admin/robo-market'
import { useSubscriptionAccess } from '@/hooks/useSubscriptionAccess'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'
export const useApplication = (props: Partial<RoboMarketAppDetaiProps>) => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const { requireAccess } = useSubscriptionAccess()

  const application = useMutation({
    mutationFn: sendApplication,
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleClick = () => {
    if (!requireAccess(props)) return

    if (
      props.slug === 'POSTER' ||
      props.slug === 'PBX' ||
      props.slug === 'BILLZ' ||
      props.slug === 'IIKO' ||
      props.slug === 'SMARTUP' ||
      props.slug === 'RKIPPER' ||
      props.slug === 'UZPOST' ||
      props.slug === 'FARGO' ||
      props.slug === 'CLICK_SUPERAPP' ||
      props.slug === 'BTS' ||
      props.slug === 'YANDEX_EATS' ||
      props.slug === 'AMOCRM' ||
      props.slug === 'YANDEX_MARKET' ||
      props.slug === 'YANDEX_DELIVERY' ||
      props.slug === 'BITO' ||
      props.slug === 'UZUM_MARKET' ||
      props.slug === 'NOOR_DELIVERY' ||
      props.slug === 'DIZGO' ||
      props.slug === 'ERA' ||
      props.slug === 'ROBO_POCHTA' ||
      props.slug === 'EMU'
    ) {
      modal.setTrue()
    } else {
      application.mutate(props.id)
    }
  }

  return { modal, application, handleClick }
}
