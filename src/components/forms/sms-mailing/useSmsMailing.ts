import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSmsMailing } from '@/apis/admin/sms-mailing'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

const schema = object().shape({
  template_name: string().required('template_name_is_a_required_field').nullable().default(''),
  template_text: string()
    .max(160, 'template_text_must_be_at_most_160_characters')
    .required('template_text_is_a_required_field')
    .nullable()
    .default(''),
})

type SchemaType = InferType<typeof schema>

export const useSmsMailing = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { value, setTrue, setFalse } = useBoolean()

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => await createSmsMailing(data),
    onSuccess: () => {
      setFalse()
      form.reset(schema.cast({}, { assert: false }))
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries({
        predicate: query => {
          const q = query.queryKey[0] as string
          return q.startsWith(REACT_QUERY_KEYS.SMS_MAILING_LIST)
        },
      })
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { t, form, value, setTrue, setFalse, onSubmit, isLoading }
}
