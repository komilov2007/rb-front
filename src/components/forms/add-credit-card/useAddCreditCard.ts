import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { createCard } from '@/apis/admin/atmos'
import { createPlumCard } from '@/apis/admin/plum'
import { useProfileStore } from '@/store/profile'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import type { PlumErrorProps } from '@/types/atmos'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef, useState, type FormEvent, type ReactNode } from 'react'

interface RefOtpProps {
  setTrue: () => void
}
type ErrorProps = AxiosError<{
  detail: string
  status: string
  transaction_id: null
}>
type PlumAxiosErrorProps = AxiosError<PlumErrorProps>

export type AddCreditCardProps =
  | {
      variant: 'header'
      children: ReactNode
      handleOpen: () => void
    }
  | {
      variant: 'card'
    }
  | {
      variant: 'profile'
    }
  | {
      variant: 'profile-empty'
    }

export const useAddCreditCard = (props: AddCreditCardProps) => {
  const { i18n } = useTranslation()
  const queryClient = useQueryClient()
  const isPlum = useProfileStore(s => s.globalSettings?.active_payment_type === 'PLUM')
  const otpRef = useRef<RefOtpProps>(null)
  const [transactionId, setTransactionId] = useState<null | number>(null)
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}, { assert: false }))
    },
  })
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const cardData = {
        card_number: data.card_number.replace(/ /g, ''),
        expiry: data.expiry.split('/').reverse().join(''),
      }
      if (isPlum) {
        return await createPlumCard(cardData)
      }
      return await createCard({
        ...cardData,
        lang: i18n.language,
      })
    },
    onSuccess: res => {
      if (isPlum) {
        otpRef.current?.setTrue()
        setTransactionId(res.data?.transaction_id)
      } else {
        if (res.data.status !== 'OK') {
          toast.error(res.data.detail)
        } else {
          otpRef.current?.setTrue()
          setTransactionId(res.data?.transaction_id)
        }
      }
    },
    onError: (res: ErrorProps | PlumAxiosErrorProps) => {
      if (isPlum) {
        const data = res.response?.data as PlumErrorProps
        toast.error(data?.error?.errorMessage)
      } else {
        toast.error((res as ErrorProps).response?.data.detail)
      }
    },
  })

  const handleSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const onSubmit = (e: FormEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    void form.handleSubmit(handleSubmit)(e)
  }

  const handleUpdate = () => {
    setFalse()
    void queryClient.invalidateQueries([REACT_QUERY_KEYS.ATMOS_CARDS])

    if (props.variant === 'header') {
      props.handleOpen()
    }
  }

  const handleClick = () => {
    void form.trigger('card_number')
    void form.trigger('expiry')
  }

  const handleClose = () => {
    setFalse()

    if (props.variant === 'header') {
      props.handleOpen()
    }
  }

  return {
    form,
    value,
    otpRef,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleClose,
    handleClick,
    handleUpdate,
    transactionId,
  }
}
