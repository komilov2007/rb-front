import { getUser } from '@/utils/user'
import { request } from '@/configs/requests'
import { type QrCodeProps } from '@/types/qr-code'

export const getQrCode = async () => {
  const user = getUser()
  return await request<QrCodeProps>(`v2/shop/qrcode/${user.shop}`)
}

export const updateQrCode = async <T>(data: T) => {
  const user = getUser()
  return await request.put(`v2/shop/qrcode/${user.shop}`, data)
}
