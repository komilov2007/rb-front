import { PAYMENTS } from './constants'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { getCards } from '@/apis/admin/atmos'
import { getPlumCards } from '@/apis/admin/plum'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, number, type InferType } from 'yup'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useLocation, useSearchParams } from 'react-router-dom'
import { shopBankPayment, shopPayment } from '@/apis/admin/shop'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'
import { subcriptionPlanPaymentStatus } from '@/apis/admin/pricing-plan'
import { isReactNative, openExternal } from '@/utils/native-bridge'

const schema = object().shape({
  card: string(),
  amount: number()
    .nullable()
    .min(1000, 'amount_must_be_greater_than_or_equal_to_1000')
    .typeError('amount_must_be_a_number_type')
    .test(
      'noEOrSign',
      'invalid_amount',
      value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
    ),
  payment_type: string().nullable().required('').default(null),
  tin_or_pinfl: string().when('payment_type', (value, schema) => {
    if (value[0] === 'BANK') {
      return schema.required('required')
    }
    return schema
  }),
})

type SchemaType = InferType<typeof schema>

export type BalanceProps =
  | {
      variant: 'header'
    }
  | {
      amount: number
      onSubmit: () => void
      variant: 'pricing-plan'
    }

export const useBalance = (props: BalanceProps) => {
  const { t } = useTranslation()
  const { search, pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [status] = useSearchParamsState('status', '')
  const [payment_status] = useSearchParamsState('payment_status', '')
  const isPlum = useProfileStore(s => s.globalSettings?.active_payment_type === 'PLUM')
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const cards = useQuery({
    queryFn: isPlum ? getPlumCards : getCards,
    queryKey: [REACT_QUERY_KEYS.ATMOS_CARDS],
    onSuccess: res => {
      if (res.data.length > 0) {
        form.setValue('payment_type', res.data[0].id)
      }
    },
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}))
    },
    onTrue: () => {
      form.reset({
        payment_type: cards.data?.data[0].id,
        amount: props.variant === 'header' ? null : props.amount,
      })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const payment_type = PAYMENTS.find(p => p.value === data.payment_type)?.value ?? 'CARD'
      const values = {
        payment_type,
        amount: data.amount,
        card: payment_type === 'CARD' ? data.payment_type : undefined,
        redirect_url: `${window.location.origin}${pathname}${data.payment_type === 'RAHMAT' ? '' : search.length > 0 ? `${search}&status=checking&payment_type=${data.payment_type}` : `?status=checking&payment_type=${data.payment_type}`}`,
      }
      if (payment_type === 'BANK') {
        return await shopBankPayment({
          amount: data.amount,
          tin_or_pinfl: data.tin_or_pinfl,
        })
      }
      return await shopPayment(values)
    },
  })

  const paymentStatus = useQuery({
    enabled: status === 'checking',
    queryFn: subcriptionPlanPaymentStatus,
    queryKey: [REACT_QUERY_KEYS.PRICING_PLAN_PAYMENT_STATUS],
    onSuccess: res => {
      if (res.data.state === 'finished' && props.variant === 'pricing-plan') {
        props.onSubmit()
      }
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data, {
      onSuccess: res => {
        const payment_type = PAYMENTS.find(p => p.value === data.payment_type)?.value ?? 'CARD'
        if (data.payment_type === 'BANK') {
          form.reset(schema.cast({}, { assert: false }))
          setFalse()
          toast.success(t('the_action_has_successfully_been_completed'))
        } else {
          if (payment_type === 'CARD') {
            setFalse()
            window.location.reload()
          } else if (isReactNative()) {
            /**
             * Navigating the WebView itself to the provider strands the user:
             * there is no browser chrome to come back with, and 3DS/OTP pages
             * routinely try `window.open`, which is dead in a WebView. Hand the
             * URL to the OS browser instead and keep the admin on screen so the
             * `status=checking` poll can resume when they return.
             */
            openExternal(res.data.url as string)
            setFalse()
          } else {
            window.location.href = res.data.url as string
          }
        }
      },
    })
  }

  const handleClose = () => {
    searchParams.delete('status')
    searchParams.delete('payment_id')
    searchParams.delete('payment_status')
    setSearchParams(searchParams)
  }

  const handleOpen = () => {
    setTrue()
  }

  return {
    t,
    form,
    cards,
    value,
    status,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleOpen,
    handleClose,
    paymentStatus,
    payment_status,
  }
}
