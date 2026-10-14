export interface WoltBranchProps {
  spot_name: string
  latitude: number
  longitude: number
}

export interface WoltCredsProps {
  wolt: {
    client_id: string
    client_secret: string
    venue_id: string
  }
}
