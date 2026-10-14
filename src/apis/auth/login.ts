import { request } from '@/configs/requests'

export const logInUser = async <T>(data: T) => {
  return await request.post('v2/auth/login', data)
}

export const logInUserMulticard = async <T>(data: T) => {
  return await request.post('v2/auth/multibank/login', data)
}
