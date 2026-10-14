import { request } from '@/configs/requests'
import type { CardsProps, ResCreateCreditCardProps } from '@/types/atmos'

export const getCards = async () => {
  return await request<CardsProps[]>('v2/bank/card/list')
}

export const createCard = async <T>(data: T) =>
  await request.post<ResCreateCreditCardProps>('v2/bank/card/create', data)

export const otpCard = async <T>(data: T) => await request.post('v2/bank/card/confirm', data)

export const deleteCreditCard = async (id: string) =>
  await request.delete(`v2/bank/card/delete/${id}`)
