import dayjs from 'dayjs'
import { setUser } from '@/utils/user'
import { useForm } from 'react-hook-form'
import { type SyntheticEvent } from 'react'
import { ROUTER } from '@/constants/router'
import { phoneFormat } from '@/utils/phone'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'
import { signUpPartnerCount, signUpUser } from '@/apis/auth/sign-up'
import { AUTH_TABS, type AuthTabValueProps } from '@/constants/auth'
import { schemaSignUp, type SchemaTypeSignUp } from '@/utils/schema'

export const usePage = () => {
  const navigate = useNavigate()
  const [referal] = useSearchParamsState('ref', null)
  const form = useForm<SchemaTypeSignUp>({
    mode: 'onChange',
    resolver: yupResolver(schemaSignUp),
    defaultValues: schemaSignUp.cast({}),
  })

  useQuery({
    enabled: !!referal && referal.length > 0,
    queryKey: [REACT_QUERY_KEYS.SIGN_UP_PARTNER_COUNT, referal],
    queryFn: async () => await signUpPartnerCount({ ref: referal }),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ tab, policy, email, phone, ...rest }: SchemaTypeSignUp) => {
      const data = tab === AUTH_TABS.email.value ? { email } : { phone: phoneFormat(String(phone)) }
      return await signUpUser({ ...data, ...rest, referal })
    },
    onSuccess: res => {
      navigate(ROUTER.VERIFICATION)
      const verification = { ...res.data, time: dayjs().format() }
      localStorage.setItem('verification', JSON.stringify(verification))
    },
  })

  const onSubmit = (data: SchemaTypeSignUp) => {
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
