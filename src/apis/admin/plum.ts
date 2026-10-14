import { request } from '@/configs/requests'
import type { CardsProps, ResPlumCreateCreditCardProps } from '@/types/atmos'

export const getPlumCards = async () => {
  return await request<CardsProps[]>('v2/plum/bank/card/list')
}

export const createPlumCard = async (data: { card_number: string; expiry: string }) =>
  await request.post<ResPlumCreateCreditCardProps>('v2/plum/bank/card/create', data)

export const otpPlumCard = async <T>(data: T) =>
  await request.post('v2/plum/bank/card/confirm', data)

export const deletePlumCreditCard = async (id: string) =>
  await request.delete(`v2/plum/bank/card/delete/${id}`)
