import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { passwordSchema } from '@/utils/schema'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { updatePassword } from '@/apis/admin/profile'
import { ref, object, string, type InferType } from 'yup'
import { useTranslation } from 'react-i18next'

const schema = object().shape({
  new_password: passwordSchema,
  current_password: passwordSchema,
  confirm_password: string()
    .required('please_re_type_your_password')
    .oneOf([ref('new_password')], 'passwords_does_not_match')
    .default(''),
})

type SchemaType = InferType<typeof schema>

export const usePage = () => {
  const { t } = useTranslation()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      return await updatePassword(data)
    },
    onSuccess: res => {
      toast.success(res.data?.message ?? t('the_action_has_successfully_been_completed'))
      form.reset(schema.cast({}))
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleCancel = () => {
    form.reset(schema.cast({}))
  }

  return { form, onSubmit, isLoading, handleCancel }
}
