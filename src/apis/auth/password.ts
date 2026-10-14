import { request } from '@/configs/requests'

export const forgotPassword = async <T>(data: T) =>
  await request.post('v2/auth/forgot/password', data)

export const recoverPassword = async <T>(data: T, id: string) =>
  await request.post(`v2/auth/recover/forgot/password/${id}`, data)

export const forgotPasswordVerify = async <T>(data: T) =>
  await request.post('v2/auth/verify/forgot/password', data)
