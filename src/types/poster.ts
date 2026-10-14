export interface SpotProps {
  id: string
  name: string
  address: string
}

export interface PosterBranchProps {
  spot_id: number
  latitude: number
  longitude: number
  spot_name: string
}

export interface PosterProps {
  poster: {
    token: string
    branches: PosterBranchProps[]
    source_id: number
  }
}

export interface SourceProps {
  id: number
  name: string
}
