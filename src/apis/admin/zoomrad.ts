import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import type { ZoomradProps, ZoomradCredsBodyProps } from '@/types/zoomrad'

export const getZoomradCreds = async () => {
  const user = getUser()
  return await request<ZoomradProps>(`v2/robomarket/zoomrad/creds/${user.shop}`)
}

export const postZoomradCreds = async (data: ZoomradCredsBodyProps) => {
  const user = getUser()
  return await request.post(`v2/robomarket/zoomrad/creds/${user.shop}`, data)
}
