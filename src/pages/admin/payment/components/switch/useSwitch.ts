import { getUser } from '@/utils/user'
import { toast } from 'react-toastify'
import { type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type PaymentProps } from '@/types/payment'
import { checkVariantAuth, updatePayment } from '@/apis/admin/payment'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { schema, type SchemaType } from './form.schema'

export const useSwitch = (props: PaymentProps) => {
  const user = getUser()
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const isVariant = props.slug === 'variant' || props.state === 'VARIANT'
  const checked = props.data?.is_active ?? false

  const defaultValues = schema.cast(
    {
      ...props.data?.params,
      slug: props.slug,
      natural:
        props.data?.params?.pinfl && props.data.params.pinfl.length > 0 ? 'individual' : 'legal',
      tin_or_pinfl: props.data?.params?.pinfl ?? props.data?.params?.tin,
      self_fiscalization: props.data?.self_fiscalization,
    },
    { assert: false },
  )

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onTrue: () => {
      form.reset(defaultValues)
    },
    onFalse: () => {
      form.reset(defaultValues)
    },
  })

  const updatePaymentMutation = useMutation({
    mutationFn: async ({ natural, tin_or_pinfl, self_fiscalization, ...data }: SchemaType) => {
      const shop = user.shop

      if (isVariant) {
        if (!data.is_active) {
          return await updatePayment({ shop, is_active: false }, props.id)
        }
        return await updatePayment(
          {
            shop,
            params: {
              login: data.login?.trim() ?? '',
              password: data.password ?? '',
              minimal_amount: Number(data.minimal_amount ?? 0),
              markup_3_months: Number(data.markup_3_months ?? 0),
              markup_6_months: Number(data.markup_6_months ?? 0),
              markup_9_months: Number(data.markup_9_months ?? 0),
              markup_12_months: Number(data.markup_12_months ?? 0),
            },
            is_active: true,
          },
          props.id,
        )
      }

      const newData =
        data.slug === 'no-token'
          ? data
          : props.data?.is_active
            ? {
                is_active: data.is_active,
              }
            : {
                params:
                  data.slug === 'unversal' || data.slug === 'uzum-nasiya'
                    ? { token: data.token }
                    : data.slug === 'payme'
                      ? {
                          key: data.key,
                          merchant_id: data.merchant_id,
                        }
                      : data.slug === 'click'
                        ? {
                            service_id: data.service_id,
                            merchant_id: data.merchant_id,
                          }
                        : data.slug === 'click_api' || data.slug === 'click_superapp'
                          ? {
                              ...data,
                              tin:
                                self_fiscalization && natural === 'legal'
                                  ? tin_or_pinfl
                                  : undefined,
                              pinfl:
                                self_fiscalization && natural === 'individual'
                                  ? tin_or_pinfl
                                  : undefined,
                            }
                          : data,
                is_active: data.is_active,
                self_fiscalization,
              }

      return await updatePayment({ shop, ...newData }, props.id)
    },
    onSuccess: () => {
      setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.PAYMENT_LIST])
    },
    onError: () => {
      setTrue()
      toast.error(t('something_went_wrong'))
    },
  })
  const handleVariantArror = () => {
    form.setError('login', {
      type: 'manual',
      message: 'phone_is_invalid',
    })
    form.setError('password', {
      type: 'manual',
      message: 'password_is_invalid',
    })
    toast.error(t('phone_or_password_is_invalid'))
  }

  const variantAuthMutation = useMutation({
    mutationFn: async (data: SchemaType) =>
      await checkVariantAuth({
        login: data.login?.trim() ?? '',
        password: data.password ?? '',
        minimal_amount: Number(data.minimal_amount ?? 0),
        markup_3_months: Number(data.markup_3_months ?? 0),
        markup_6_months: Number(data.markup_6_months ?? 0),
        markup_9_months: Number(data.markup_9_months ?? 0),
        markup_12_months: Number(data.markup_12_months ?? 0),
      }),
    onSuccess: response => {
      if (!response.data.ok) {
        handleVariantArror()
        return
      }
      updatePaymentMutation.mutate({
        ...form.getValues(),
        is_active: true,
        slug: 'variant',
      })
    },
    onError: handleVariantArror,
  })
  const handleChange = (_: ChangeEvent<HTMLInputElement>, is_active: boolean) => {
    if (isVariant) {
      if (!is_active) {
        updatePaymentMutation.mutate({
          is_active: false,
          slug: 'variant',
        })
        return
      }
      setTrue()
      return
    }
    if (is_active) {
      if (props.slug === 'no-token') {
        updatePaymentMutation.mutate({
          is_active: true,
          slug: props.slug,
        })
        return
      }
      setTrue()
      return
    }
    updatePaymentMutation.mutate({
      is_active: false,
      slug: props.slug,
    })
  }
  const onSubmit = (data: SchemaType) => {
    if (isVariant) {
      variantAuthMutation.mutate(data)
      return
    }
    updatePaymentMutation.mutate({
      ...data,
      is_active: true,
      slug: props.slug,
    })
  }
  const isLoading = updatePaymentMutation.isLoading || variantAuthMutation.isLoading
  return {
    form,
    value,
    setTrue,
    setFalse,
    isLoading,
    onSubmit,
    handleChange,
    checked,
  }
}
