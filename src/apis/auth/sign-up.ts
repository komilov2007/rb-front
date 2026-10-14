import { request } from '@/configs/requests'

export const signUpUser = async <T>(data: T) => {
  return await request.post('v2/auth/register', data)
}

export const signUpVerify = async <T>(data: T) => {
  return await request.post('v2/auth/verify', data)
}

export const signUpResendVerificationCode = async <T>(data: T) => {
  return await request.post('v2/auth/resend/verification-code', data)
}

export const signUpPartnerCount = async <T>(params: T) =>
  await request('v2/partner/referal-click', { params })
