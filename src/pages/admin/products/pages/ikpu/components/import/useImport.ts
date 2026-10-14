import { useForm } from 'react-hook-form'
import { importIkpu } from '@/apis/admin/ikpu'
import { useBoolean } from '@/hooks/useBoolean'
import { mixed, object, type InferType } from 'yup'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const schema = object().shape({
  file: mixed().test('required', 'you_need_to_provide_a_file', file => {
    if (file) return true
    return false
  }),
})

type SchemaType = InferType<typeof schema>

export interface ImportIkpuProps {
  handleUpdate: () => void
}

export const useImport = ({ handleUpdate }: ImportIkpuProps) => {
  const { t } = useTranslation()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}))
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const formData = new FormData()
      formData.append('file', data.file as File)
      return await importIkpu(formData)
    },
    onSuccess: () => {
      setFalse()
      handleUpdate()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, value, setTrue, setFalse, onSubmit, isLoading }
}
