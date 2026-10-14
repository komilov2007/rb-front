import { getUser } from '@/utils/user'
import type { List } from '@/types/list'
import { request } from '@/configs/requests'
import type { UnitProps } from '@/types/products'
import type { BranchAllProps } from '@/types/branch'
import type { CurrencyProps } from '@/types/currency'
import type { CityProps, CountryListProps } from '@/types/country'
import type {
  CashbackProps,
  ProductStockProps,
  DeliveryMerchantProps,
  DeliveryMerchantCityProps,
  PrivacyPolicyResponseProps,
  GlobalSettingsProps,
} from '@/types/common'

export const getCurrencyList = async () => await request<CurrencyProps[]>('v2/currency/list')
export const getCountryList = async () => await request<CountryListProps>('v2/country/list')
export const getUnit = async () => await request<UnitProps[]>('v2/unit/list')
export const getCityList = async (id: number | null) =>
  await request<CityProps>(`v2/city/list/${id}`)

export const updateBotStep = async <T>(data: T) =>
  await request.post('v2/auth/user/step/update', data)
export const updateLanguage = async () => await request.post('v2/change/language')
export const sendLog = async (error: string) => await request.post('v2/bot/error', { error })

export const getBranchList = async () => {
  const user = getUser()
  return await request<BranchAllProps[]>(`v2/branch/list/all/${user.shop}`)
}

export const getDeliveryMerchant = async <T>(params: T) => {
  const user = getUser()
  return await request<DeliveryMerchantProps>(`v2/delivery/merchant/${user.shop}`, {
    params,
  })
}

export const deliveryMerchant = async <T>(data: T) => {
  const user = getUser()
  return await request.post('v2/delivery/merchant', {
    ...data,
    shop: user.shop,
  })
}

export const deleteDeliveryMerchant = async <T>(params: T) => {
  const user = getUser()
  return await request.delete(`v2/delivery/merchant/${user.shop}`, {
    params,
  })
}

export const getDeliveryMerchantCities = async <T>(params: T) => {
  return await request<DeliveryMerchantCityProps[]>('v2/city/list/1', {
    params,
  })
}

export const getProductStock = async <T>(params: T) => {
  return await request<List<ProductStockProps>>('v3/products/stock-base/list', {
    params,
  })
}

export const updateProductStock = async <T>(data: T, id?: boolean | string) =>
  await request(
    typeof id === 'boolean' ? 'v3/products/stocks/weight/update' : `v3/products/stock/${id}`,
    { data, method: typeof id === 'boolean' ? 'POST' : 'PUT' },
  )

export const getCashback = async () => {
  const user = getUser()
  return await request<CashbackProps>(`v2/shop/${user.shop}/cashback-settings`)
}

export const updateCashback = async <T>(data: T) => {
  const user = getUser()
  return await request.put(`v2/shop/${user.shop}/cashback-settings`, data)
}

export const getPrivacyPolicy = async () =>
  await request<PrivacyPolicyResponseProps>('v2/privacy-policy')

export const getGlobalSettings = async () =>
  await request<GlobalSettingsProps>('v2/global/settings')
