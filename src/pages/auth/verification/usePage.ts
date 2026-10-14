import { setUser } from '@/utils/user'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { type LocationProps } from './type'
import { useNavigate } from 'react-router-dom'
import { signUpVerify } from '@/apis/auth/sign-up'
import { useMutation } from '@tanstack/react-query'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordVerify } from '@/apis/auth/password'

const schema = object().shape({
  code: string().min(4).required().default(''),
})

type SchemaType = InferType<typeof schema>

export const usePage = () => {
  const navigate = useNavigate()
  const info: LocationProps = JSON.parse(localStorage.getItem('verification') as string)
  const isForgotPassword = info?.location === ROUTER.FORGOT_PASSWORD
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const verify = useMutation({
    mutationFn: async (data: SchemaType) => {
      const { email, phone } = info
      const values = email
        ? { ...data, email }
        : {
            ...data,
            phone,
          }

      if (isForgotPassword) {
        return await forgotPasswordVerify(values)
      }
      return await signUpVerify(values)
    },
    onSuccess: res => {
      if (isForgotPassword) {
        navigate(ROUTER.RESET_PASSWORD, { state: res.data })
      } else {
        setUser(res.data, true)
        navigate(`${ROUTER.SIGN_UP}${ROUTER.BUSINESS_DETAILS}`)
        const step = JSON.stringify(1)
        sessionStorage.setItem('step', step)
      }
    },
  })

  const onSubmit = (data: SchemaType) => {
    verify.mutate(data)
  }

  const onComplete = (code: string) => {
    verify.mutate({ code })
  }

  return {
    form,
    info,
    verify,
    onSubmit,
    onComplete,
    isForgotPassword,
  }
}
