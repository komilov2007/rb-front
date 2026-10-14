import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { useSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, SUM_MAX, MARJA_MAX, ASTATKA_MAX, type SchemaType } from './form.schema'

const FILTER_KEYS: Array<keyof SchemaType> = [
  'base_price_from',
  'base_price_to',
  'stock_amount_from',
  'stock_amount_to',
  'margin_from',
  'margin_to',
]

const DEFAULTS: SchemaType = {
  base_price_from: 0,
  base_price_to: SUM_MAX,
  stock_amount_from: 0,
  stock_amount_to: ASTATKA_MAX,
  margin_from: 0,
  margin_to: MARJA_MAX,
}

const getInitialValues = (searchParams: URLSearchParams): SchemaType => {
  const values = { ...DEFAULTS }
  for (const key of FILTER_KEYS) {
    const param = searchParams.get(key)
    if (param !== null) {
      values[key] = Number(param)
    }
  }
  return values
}

export const useFilter = () => {
  const { value, setTrue, setFalse } = useBoolean()
  const currency = useProfileStore(state => state.me?.currency?.code)
  const [searchParams, setSearchParams] = useSearchParams()

  const form = useForm<SchemaType>({
    defaultValues: getInitialValues(searchParams),
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const activeFilterCount = useMemo(() => {
    let count = 0
    const bpFrom = searchParams.get('base_price_from')
    const bpTo = searchParams.get('base_price_to')
    if (bpFrom !== null || bpTo !== null) count++

    const saFrom = searchParams.get('stock_amount_from')
    const saTo = searchParams.get('stock_amount_to')
    if (saFrom !== null || saTo !== null) count++

    const mFrom = searchParams.get('margin_from')
    const mTo = searchParams.get('margin_to')
    if (mFrom !== null || mTo !== null) count++

    return count
  }, [searchParams])

  const onSubmit = (data: SchemaType) => {
    setSearchParams(prev => {
      prev.set('page', '1')

      for (const key of FILTER_KEYS) {
        const value = data[key]
        if (value !== undefined && value !== null && value !== DEFAULTS[key]) {
          prev.set(key, String(value))
        } else {
          prev.delete(key)
        }
      }

      return prev
    })
    setFalse()
  }

  const onReset = () => {
    form.reset(DEFAULTS)
    setSearchParams(prev => {
      for (const key of FILTER_KEYS) {
        prev.delete(key)
      }
      prev.set('page', '1')
      return prev
    })
    setFalse()
  }

  const handleChange =
    (name: 'margin' | 'base_price' | 'stock_amount', distance: number) =>
    (_: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return
      }
      if (activeThumb === 0) {
        const value = Math.min(newValue[0], (form.watch(`${name}_to`) ?? 0) - distance)
        form.setValue(`${name}_from`, Math.abs(value))
      } else {
        const value = Math.max(newValue[1], (form.watch(`${name}_from`) ?? 0) + distance)
        form.setValue(`${name}_to`, Math.abs(value))
      }
    }

  return {
    form,
    value,
    setTrue,
    currency,
    setFalse,
    onSubmit,
    onReset,
    handleChange,
    activeFilterCount,
  }
}
