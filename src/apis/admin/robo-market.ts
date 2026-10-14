import { type List } from '@/types/list'
import { request } from '@/configs/requests'
import {
  type RoboMarketProps,
  type RoboMarketAppProps,
  type RoboMarketSliderProps,
  type RoboMarketAppDetaiProps,
  type RoboMarketAppReviewsProps,
  type PartnerAppConnectionProps,
} from '@/types/robo-market'
import { getUser } from '@/utils/user'

export const getRoboMarketList = async () =>
  await request<RoboMarketProps[]>('v2/robomarket/market/list')

export const getAppList = async <T>(id: unknown, params: T) => {
  return await request<RoboMarketAppProps[]>(
    id === 'all' ? 'v2/robomarket/app/list' : `v2/robomarket/app/list/${id}`,
    { params },
  )
}

export const getMarketSilderList = async () =>
  await request<RoboMarketSliderProps[]>('v2/robomarket/slider')

export const getAppDetail = async (id: string) =>
  await request<RoboMarketAppDetaiProps>(`v2/robomarket/app/${id}/detail`)

export const getAppDetailComment = async (id: string) =>
  await request<List<RoboMarketAppReviewsProps>>(`v2/robomarket/app/comment/list/${id}`)

export const createAppComment = async <T>(data: T) =>
  await request.post('v2/robomarket/app/comment/create', data)

export const sendApplication = async (id: unknown) =>
  await request(`v2/robomarket/app/send/request/${id}`)

export const authorizeRobohub = async (data: { redirect_uri: string; state: string }) =>
  await request.post<{ redirect_url: string }>('v2/robohub/authorize/', data)

export const disconnectRobohub = async () => await request.post('v2/robohub/disconnect/')

export const connectPartnerApp = async (partnerSlug: string) =>
  await request.post<PartnerAppConnectionProps>(`v2/partner-api/${partnerSlug}/connect/`)

export const disconnectPartnerApp = async (partnerSlug: string) =>
  await request.post(`v2/partner-api/${partnerSlug}/disconnect/`)

export const deleteIntegration = async (integration: string) => {
  const user = getUser()
  return await request.delete(`v2/robomarket/integration/delete/${user.shop}/${integration}`)
}
