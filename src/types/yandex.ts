export interface YandexProps {
  client_id: string
  client_secret: string
  scope: string
  grant_type: string
  host: string
}

export interface YandexVerificationProps {
  is_valid: boolean
}
