export type CityProps = Array<{
  id: number
  country: number
  name: string
}>

export interface CountryProps {
  id: number
  name: string
}

export type CountryListProps = CountryProps[]
