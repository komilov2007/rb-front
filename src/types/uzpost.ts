export interface UzpostProps {
  username: string
  first_name: string
  last_name: string
  phone: string
}

export interface UzpostCityProps {
  regions: Array<{
    children: []
    code: string
    country_code: string
    description: string
    hierarchy: []
    id: number
    lat: number
    lng: number
    name: string
    parent_id: number
  }>
}

export interface UzpostDistrictProps {
  id: number
  name: string
}
