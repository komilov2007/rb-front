import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { setUser } from '@/utils/user'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { phoneFormat } from '@/utils/phone'
import { object, type InferType } from 'yup'
import { type UserProps } from '@/types/user'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { type ErrorProps } from '@/types/error'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, type SyntheticEvent } from 'react'
import { passwordSchema, schemaAuth } from '@/utils/schema'
import { logInUser, logInUserMulticard } from '@/apis/auth/login'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'
import { AUTH_TABS, type AuthTabValueProps } from '@/constants/auth'

const schema = object()
  .shape({
    password: passwordSchema,
  })
  .concat(schemaAuth)

type SchemaType = InferType<typeof schema>

export const usePage = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [referal] = useSearchParamsState('ref', '')
  const [typeMultibank] = useSearchParamsState('type', '')
  const [langMultibank] = useSearchParamsState('lang', '')
  const [accessTokenMultibank] = useSearchParamsState('access_token', '')
  const isMultibank = accessTokenMultibank.length > 0 && typeMultibank === 'multibank'

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: isMultibank
      ? async () =>
          await logInUserMulticard({
            referal,
            type: typeMultibank,
            lang: langMultibank,
            access_token: accessTokenMultibank,
          })
      : async ({ tab, email, phone, password }: SchemaType) => {
          const values = {
            password,
            phone: tab === AUTH_TABS.email.value ? email : phoneFormat(String(phone)),
          }

          return await logInUser(values)
        },
    onSuccess: res => {
      if (isMultibank) {
        localStorage.setItem('multibank', accessTokenMultibank)
      }
      const user: UserProps = res.data
      toast.success(t('successfully_logged_in'))
      if (user?.shop) {
        setUser(user)
        navigate(ROUTER.ADMIN_HOME)
      } else {
        setUser(user, true)
        navigate(`${ROUTER.SIGN_UP}${ROUTER.BUSINESS_DETAILS}`)
      }
    },
    onError: (error: ErrorProps) => {
      if (error.response?.data.errors) {
        error.response?.data.errors.forEach(err => {
          if (err.field === 'phone') {
            if (form.watch('tab') === AUTH_TABS.email.value) {
              form.setError('email', {
                type: 'manual',
                message: err.message,
              })
            } else {
              form.setError('phone', {
                type: 'manual',
                message: err.message,
              })
            }
          } else {
            //  @ts-ignore
            form.setError(err.field, {
              type: 'manual',
              message: err.message,
            })
          }
        })
      }
      if (error.response?.data.code === 10001) {
        const values =
          form.watch('tab') === AUTH_TABS.email.value
            ? { email: form.getValues('email') }
            : { phone: form.getValues('phone') }
        const verification = JSON.stringify({
          ...values,
          time: dayjs().format(),
          location: location.pathname,
        })
        navigate(ROUTER.VERIFICATION)
        localStorage.setItem('verification', verification)
      }
    },
  })

  useEffect(() => {
    if (isMultibank) {
      mutate(form.getValues())
      localStorage.setItem('i18nextLng', langMultibank)
      void i18n.changeLanguage(langMultibank)
    }
  }, [isMultibank])

  const onSubmit = (data: SchemaType) => {
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

  return { form, onSubmit, isLoading, isMultibank, onChangeTab }
}
