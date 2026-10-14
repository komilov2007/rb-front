import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { type SyntheticEvent } from 'react'
import { phoneFormat } from '@/utils/phone'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPassword } from '@/apis/auth/password'
import { useLocation, useNavigate } from 'react-router-dom'
import { schemaAuth, type SchemaTypeAuth } from '@/utils/schema'
import { AUTH_TABS, type AuthTabValueProps } from '@/constants/auth'

export const usePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const form = useForm<SchemaTypeAuth>({
    mode: 'onChange',
    resolver: yupResolver(schemaAuth),
    defaultValues: schemaAuth.cast({}),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ tab, email, phone }: SchemaTypeAuth) => {
      const values =
        tab === AUTH_TABS.email.value
          ? {
              email,
            }
          : {
              phone: phoneFormat(String(phone)),
            }

      return await forgotPassword(values)
    },
    onSuccess: res => {
      navigate(ROUTER.VERIFICATION)
      const verification = JSON.stringify({
        ...res.data,
        time: dayjs().format(),
        location: location.pathname,
      })
      localStorage.setItem('verification', verification)
    },
  })

  const onSubmit = (data: SchemaTypeAuth) => {
    mutate(data)
  }

  const onChangeTab = (_: SyntheticEvent, tab: AuthTabValueProps) => {
    form.setValue('tab', tab)
    if (tab === 'email') {
      form.clearErrors('phone')
    } else {
      form.clearErrors('email')
    }
  }

  return { form, onSubmit, isLoading, onChangeTab }
}
