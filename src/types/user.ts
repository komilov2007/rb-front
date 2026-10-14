import { type BusninessTypesProps } from './busniness'

export interface UserProps {
  isExpiredAccess: boolean
  isExpiredRefresh: boolean
  access: string
  account: number
  created_at: string
  email: null | string
  firstname: string
  id: number
  is_active: boolean
  is_finished: boolean
  is_new_version: boolean
  is_staff: boolean
  is_superuser: boolean
  is_verified: boolean
  phone: null | string
  refresh: string
  updated_at: string
  message?: string
  step: number
  business_type: BusninessTypesProps
  shop: string
}

export interface TokenProps {
  exp: number
  iat: number
  jti: string
  token_type: 'access' | 'refresh'
  user_id: number
}
