export interface FargoProps {
  from_door: boolean
  min_price: number
}

export interface FargoCityProps {
  data: {
    list: Array<{
      actual_place_name: string
      center_latitude: number
      center_longitude: number
      description: string
      id: number
      lat: number
      lon: number
      name: string
    }>
    total: number
  }
  request_id: string
  status: string
}

export interface FargoDistrictProps {
  data: {
    list: Array<{
      id: number
      name: string
    }>
    total: number
  }
  request_id: string
  status: string
}
