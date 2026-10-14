export interface ZoomradCredsBodyProps {
  client_id: string
  client_secret: string
  key_client: string
  key_server: string
  redirect_uri: string
  service_type_code: string
}

export interface ZoomradProps {
  zoomrad: ZoomradCredsBodyProps | null
}
