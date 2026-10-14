import { type FormEvent } from 'react'
import { toast } from 'react-toastify'
import { type AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { otpCard } from '@/apis/admin/atmos'
import { otpPlumCard } from '@/apis/admin/plum'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { useMutation } from '@tanstack/react-query'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { type ResCreateCreditCardProps, type PlumErrorProps } from '@/types/atmos'

const schema = object().shape({
  otp: string().min(4).required().default(''),
})

type SchemaType = InferType<typeof schema>

export type OtpProps = {
  handleUpdate: () => void
} & Pick<ResCreateCreditCardProps, 'transaction_id'>

type ErrorProps = AxiosError<{
  detail: string
  status: string
}>

export const useOtp = ({ transaction_id, handleUpdate }: OtpProps) => {
  const isPlum = useProfileStore(s => s.globalSettings?.active_payment_type === 'PLUM')
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}, { assert: false }))
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const confirmCard = isPlum ? otpPlumCard : otpCard
      return await confirmCard({ ...data, transaction_id })
    },
    onSuccess: () => {
      setFalse()
      handleUpdate()
    },
    onError: (res: ErrorProps | AxiosError<PlumErrorProps>) => {
      if (isPlum) {
        const data = res.response?.data as PlumErrorProps
        toast.error(data?.error?.errorMessage)
      } else {
        toast.error((res as ErrorProps).response?.data.detail)
      }
    },
  })

  const onComplete = (otp: string) => {
    mutate({ otp })
  }
  const handleSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const onSubmit = (e: FormEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    void form.handleSubmit(handleSubmit)(e)
  }

  return { form, value, setTrue, setFalse, isLoading, onComplete, onSubmit }
}
