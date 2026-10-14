export interface CloposBranchProps {
  latitude: number
  longitude: number
  spot_id: string
  spot_name: string
}

export interface CloposProps {
  clopos: {
    brand: string
    client_id: string
    client_secret: string
    branches: CloposBranchProps[]
  }
}

export interface CloposSpotProps {
  id: number
  name: string
  is_main: number
  media: []
}
