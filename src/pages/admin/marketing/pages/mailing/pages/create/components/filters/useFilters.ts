import { useState } from 'react'
import dayjs from 'dayjs'
import { type AxiosResponse } from 'axios'
import { useForm } from 'react-hook-form'
import { object, type InferType } from 'yup'
import { useBoolean } from '@/hooks/useBoolean'
import { useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'react-router-dom'
import { DATE_PERIOD_FILTER } from '@/constants/date-period'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { datePeriodSchema, countryAndCitiesSchema } from '@/utils/schema'
import { type CityProps, type CountryListProps } from '@/types/country'

const schema = object().concat(countryAndCitiesSchema).concat(datePeriodSchema)

type SchemaType = InferType<typeof schema>

const ORDER_MAX = 50
const SUM_MAX = 100000
const DEFAULT_ORDERS = [0, 0]
const DEFAULT_SUM = [0, 0]

export const useFilters = () => {
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const [orders, setOrders] = useState<number[]>(DEFAULT_ORDERS)
  const [sum, setSum] = useState<number[]>(DEFAULT_SUM)
  const { value, setTrue, setFalse } = useBoolean(false, {
    onTrue: () => {
      const startDate = searchParams.get('start_date')
      const endDate = searchParams.get('end_date')
      const minOrders = searchParams.get('min_orders')
      const maxOrders = searchParams.get('max_orders')
      const minOrdersSum = searchParams.get('min_orders_sum')
      const maxOrdersSum = searchParams.get('max_orders_sum')

      form.reset({
        ...schema.cast({}),
        country: Number(searchParams.get('country')) || null,
        cities: searchParams.getAll('cities').map(Number),
        date: startDate && endDate ? DATE_PERIOD_FILTER.CUSTOM.value : DATE_PERIOD_FILTER.ALL.value,
        period: startDate && endDate ? [dayjs(startDate).toDate(), dayjs(endDate).toDate()] : [],
      })
      setOrders(
        minOrders !== null && maxOrders !== null
          ? [Number(minOrders), Number(maxOrders)]
          : DEFAULT_ORDERS,
      )
      setSum(
        minOrdersSum !== null && maxOrdersSum !== null
          ? [Number(minOrdersSum), Number(maxOrdersSum)]
          : DEFAULT_SUM,
      )
    },
  })
  const form = useForm<SchemaType>({
    defaultValues: schema.cast({}),
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: SchemaType) => {
    const period = data.period ?? []
    const hasDate = data.date !== DATE_PERIOD_FILTER.ALL.value && period[0] && period[1]
    const hasOrders = orders[0] > 0 || orders[1] > 0
    const hasSum = sum[0] > 0 || sum[1] > 0
    // The selects already populated these caches, so the names cost no extra request.
    const countries = queryClient.getQueryData<AxiosResponse<CountryListProps>>([
      REACT_QUERY_KEYS.COUNTRY_LIST,
    ])
    const cityList = queryClient.getQueryData<AxiosResponse<CityProps>>([
      REACT_QUERY_KEYS.CITY_LIST,
      data.country,
    ])
    const countryName =
      countries?.data.find(c => c.id === data.country)?.name ?? searchParams.get('country_name')
    const getCityName = (id: number) => cityList?.data.find(c => c.id === id)?.name ?? String(id)

    setSearchParams(params => {
      Object.entries({
        page: 1,
        country: data.country,
        country_name: data.country ? countryName : null,
        min_orders: hasOrders ? orders[0] : null,
        max_orders: hasOrders ? orders[1] : null,
        min_orders_sum: hasSum ? sum[0] : null,
        max_orders_sum: hasSum ? sum[1] : null,
        start_date: hasDate ? dayjs(period[0]).format('YYYY-MM-DD') : null,
        end_date: hasDate ? dayjs(period[1]).format('YYYY-MM-DD') : null,
      }).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      })
      params.delete('cities')
      params.delete('cities_name')
      data.cities?.forEach(city => {
        if (city) {
          params.append('cities', String(city))
          params.append('cities_name', getCityName(city))
        }
      })

      return params
    })

    setFalse()
  }

  const handleOrders = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setOrders(newValue)
    }
  }

  const handleSum = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSum(newValue)
    }
  }

  return {
    sum,
    form,
    value,
    orders,
    setTrue,
    SUM_MAX,
    setFalse,
    onSubmit,
    handleSum,
    ORDER_MAX,
    handleOrders,
  }
}
