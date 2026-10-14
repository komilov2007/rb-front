import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type {
  MeProps,
  ProfileProps,
  PreDashBoardProps,
  ProfileBotFeedProps,
  ProfileBotStatusProps,
} from '@/types/profile'

export const getProfile = async () => await request<ProfileProps>('v2/profile/detail')
export const getPreDashboard = async () => {
  const user = getUser()
  return await request<PreDashBoardProps>(`v2/pre/dashboard/${user.shop}`)
}
export const updateProfile = async <T>(data: T) => await request.post('v2/profile/detail', data)
export const updatePassword = async <T>(data: T) =>
  await request.post('v2/profile/change/password', data)

export const updateEmail = async <T>(data: T) => await request.post('v2/profile/update/email', data)
export const updatePhone = async <T>(data: T) => await request.post('v2/profile/update/phone', data)
export const profileVerify = async <T>(data: T) => await request.post('v2/profile/verify', data)

export const getMe = async () => {
  const user = getUser()
  return await request<MeProps>(`v2/shop/getMe/${user.shop}`)
}

export const profileBotFeed = async () => await request<ProfileBotFeedProps>('v2/bot/feed/link')

export const profileBotStatus = async () =>
  await request.post<ProfileBotStatusProps>('v2/bot/feed/status')

export const getAdminToken = async (shopId: string) =>
  await request<{ id: string; name: string; token: string; created_at: string }>(
    `v2/shop/${shopId}/admin-token`,
  )

export const createAdminToken = async (shopId: string, data: { name: string }) =>
  await request.post<{ id: string; name: string; token: string; created_at: string }>(
    `v2/shop/${shopId}/admin-token`,
    data,
  )

export const deleteAdminToken = async (shopId: string) =>
  await request.delete(`v2/shop/${shopId}/admin-token`)
