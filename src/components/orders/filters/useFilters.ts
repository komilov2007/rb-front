import { useForm } from 'react-hook-form'
import { useBoolean } from '@/hooks/useBoolean'
import { yupResolver } from '@hookform/resolvers/yup'
import { type OrderByStatusProps } from '@/types/order'
import { ORDER_STATUS_FILTER } from '@/constants/order'
import { useLocation, useNavigate } from 'react-router-dom'
import { schemaOrderFilter, type SchemaTypeOrderFilter } from '@/utils/schema'

export const useFilters = (props: OrderByStatusProps) => {
  const navigate = useNavigate()
  const { state }: { state: SchemaTypeOrderFilter } = useLocation()
  const { search, pathname } = useLocation()
  const defaultOrderStatus = Object.values(ORDER_STATUS_FILTER).filter(f =>
    props.status === 'HISTORY'
      ? f.status === 'COMPLETED' || f.status === 'CANCEL' || f.status === 'DELIVERED'
      : props.status === 'ALL' || props.status === 'LATE'
        ? f.status === 'NEW' ||
          f.status === 'ON_THE_WAY' ||
          f.status === 'PROGRESS' ||
          f.status === 'READY'
        : false,
  )

  const defaultValues = state
    ? {
        ...state,
        service_type: schemaOrderFilter.cast({}).service_type.map(s => ({
          ...s,
          checked: state.service_type?.find(v => v.type === s.type)?.checked,
        })),
        status: defaultOrderStatus.map(s => ({
          ...s,
          checked: state.status?.find(v => v.status === s.status)?.checked,
        })),
      }
    : {
        ...schemaOrderFilter.cast({}, { assert: false }),
        status: defaultOrderStatus,
      }

  const { value, setTrue, setFalse } = useBoolean(false, {
    onTrue: () => {
      form.reset(defaultValues)
    },
  })

  const form = useForm<SchemaTypeOrderFilter>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schemaOrderFilter),
  })

  const onSubmit = (data: SchemaTypeOrderFilter) => {
    setFalse()
    const status = data.status.filter(s => s.checked)
    const period = data.date === 'ALL' ? null : data.period
    const payment_type = data.payment_type.filter(p => p.checked)
    const service_type = data.service_type.filter(s => s.checked)
    const state = { ...data, period, status, payment_type, service_type }

    navigate(`${pathname}${search}`, {
      state,
    })
  }

  return { form, value, setTrue, setFalse, onSubmit }
}
