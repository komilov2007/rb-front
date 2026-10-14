import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { phoneFormat } from '@/utils/phone'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type ErrorProps } from '@/types/error'
import type { CourierProps } from '@/types/role'
import { useProfileStore } from '@/store/profile'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { updateCourier, createCourier } from '@/apis/admin/role'

export type FormEmployeeProps = {
  variant: 'add' | 'edit'
  count?: number
  handleUpdate: (data: CourierProps) => void
} & Partial<CourierProps>

export const useFormCourier = ({
  id,
  phone,
  variant,
  count = 0,
  firstname,
  is_active,
  handleUpdate,
}: FormEmployeeProps) => {
  const { t } = useTranslation()
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))
  const phoneNumber = phone && phone?.length > 0 ? phone?.replace('+998', '') : ''
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast(
      {
        phone: phoneNumber,
        firstname,
      },
      { assert: false },
    ),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(
        schema.cast(
          {
            firstname,
            phone: phoneNumber,
          },
          { assert: false },
        ),
      )
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const phone = phoneFormat(data.phone)
      if (variant === 'edit') {
        return await updateCourier({ ...data, phone, is_active }, id as number)
      }
      return await createCourier({ ...data, phone })
    },
    onSuccess: res => {
      setFalse()
      handleUpdate(res.data)
      toast.success(t('the_action_has_successfully_been_completed'))
    },
    onError: (error: ErrorProps) => {
      if (error.response?.data.errors) {
        error.response?.data.errors.forEach(err => {
          if (err.field === 'phone') {
            form.setError('phone', {
              type: 'manual',
              message: err.message,
            })
          }
        })
      }
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleOpen = () => {
    const { tariff } = subscription || {}
    const canOpen = (tariff === 'BASIC' && count < 5) || tariff === 'PRO'

    canOpen ? setTrue() : setSubscriptionModal(true)
  }

  return {
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleOpen,
  }
}
