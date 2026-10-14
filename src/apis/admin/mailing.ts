import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import { type MailingProps, type MailingDetailProps, type MailingUsersProps } from '@/types/mailing'

export const getMailings = async <T>(params: T) => {
  const user = getUser()
  return await request<List<MailingProps>>(`v2/mailing/list/${user.shop}`, { params })
}

export const getMailingDetail = async (id: string) =>
  await request<MailingDetailProps>(`v2/mailing/${id}/detail`)

export const getMailingUsers = async <T>(params: T) => {
  const user = getUser()
  return await request<List<MailingUsersProps>>(`v2/mailing/users/list/${user.shop}`, { params })
}

export const deleteMailing = async (id: number) => await request.delete(`v2/mailing/${id}/delete`)
export const createMailing = async <T>(data: T) => await request.post('v2/mailing/create', data)

export const sendMailing = async (id: string) => {
  const user = getUser()
  return await request.post(`v2/mailing/send/${id}/${user.shop}`)
}
