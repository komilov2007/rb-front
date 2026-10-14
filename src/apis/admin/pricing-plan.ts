import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import { type SubcriptionPromoCodeProps } from '@/types/pricing-plan'

export const subcriptionPlan = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/subscription/subscribe', { ...data, shop: user.shop })
}

interface SubcriptionPlanPaymentStatusProps {
  state: 'cancel' | 'finished'
}

export const subcriptionPlanPaymentStatus = async () =>
  await request<SubcriptionPlanPaymentStatusProps>('v2/subscription/status/transaction')

export const subcriptionPromocode = async <T>(data: T) =>
  await request.post<SubcriptionPromoCodeProps>('v2/subscription/add/promo-code', data)
