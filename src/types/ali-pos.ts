export interface AliPosBranchProps {
  latitude: number
  longitude: number
  spot_id: string
  spot_name: string
}

export interface AliPosProps {
  alipos: {
    client_id: string
    client_secret: string
    branches: AliPosBranchProps[]
  }
}

export interface AliPosSpotProps {
  id: number
  title: string
  address: string
}
