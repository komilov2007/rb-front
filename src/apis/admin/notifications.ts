import { getUser } from '@/utils/user'
import type { List } from '@/types/list'
import { request } from '@/configs/requests'
import type { NotificationProps, NotificationCountProps } from '@/types/notifications'

export const getNotifications = async <T>(params: T) => {
  const user = getUser()
  return await request<List<NotificationProps>>(`v2/firebase/notifications/shop/${user.shop}`, {
    params,
  })
}

export const notificationRead = async (id: number) => {
  return await request.post(`v2/firebase/notification/${id}/update/read`)
}

export const notificationReadAll = async () => {
  const user = getUser()
  return await request.post(`v2/firebase/notification/update/read-all/${user.shop}`)
}

export const getNotificationCount = async () => {
  const user = getUser()
  return await request<NotificationCountProps>(`v2/counts/${user.shop}`)
}
