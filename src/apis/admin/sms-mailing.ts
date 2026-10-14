import { getUser } from '@/utils/user'
import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import type {
  SmsMailingProps,
  SmsMailingSendProps,
  SmsMailingUsersProps,
  SmsMailingRecordProps,
} from '@/types/sms-mailing'

export const createSmsMailing = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/sms-mailing/templates', { shop: user.shop, ...data })
}

export const getSmsMailings = async () => {
  const user = getUser()
  return await request<SmsMailingProps[]>(`v2/sms-mailing/templates/${user.shop}`)
}

export const getSmsMailingUsers = async <T>(params: T) => {
  const user = getUser()
  return await request<List<SmsMailingUsersProps>>(`v2/customer/list/${user.shop}`, { params })
}

export const getSmsMailingDetail = async (id?: string) =>
  await request<SmsMailingProps>(`v2/sms-mailing/template/${id}`)

export const sendSmsMailing = async <T>(data: T) => {
  const user = getUser()
  return await request.post<SmsMailingSendProps>('v2/sms-mailing/send', {
    ...data,
    shop_id: user.shop,
  })
}

export const getSmsMailingRecord = async (id?: string) => {
  const user = getUser()
  return await request<SmsMailingRecordProps[]>(
    `v2/sms-mailing/record/${user.shop}?template_id=${id}`,
  )
}
