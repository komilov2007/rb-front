import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { type LocationProps } from './type'
import { ROUTER } from '@/constants/router'
import { passwordSchema } from '@/utils/schema'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { recoverPassword } from '@/apis/auth/password'
import { ref, object, string, type InferType } from 'yup'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const schema = object().shape({
  password: passwordSchema,
  confirm_password: string()
    .required('please_re_type_your_password')
    .oneOf([ref('password')], 'passwords_does_not_match')
    .default(''),
})

type SchemaType = InferType<typeof schema>

export const usePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state }: LocationProps = useLocation()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      return await recoverPassword(data, state.id)
    },
    onSuccess: () => {
      navigate(ROUTER.AUTH)
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, onSubmit, isLoading }
}
