import { parseCountry, defaultCountries } from 'react-international-phone'

export const COUNTRIES = ['ru', 'tr', 'kz', 'kg', 'tj', 'tm', 'az', 'uz', 'kr', 'cn']

export const OPTION_COUNTRIES = defaultCountries
  .filter(country => {
    const { iso2 } = parseCountry(country)
    return COUNTRIES.includes(iso2 as string)
  })
  .reverse()
