export interface MultiBankTokenProps {
  aud: string
  exp: number
  iat: number
  jti: string
  nbf: number
  sub: string
  scopes: []
}

export interface MultiBankProps {
  isMultibank?: boolean
}
