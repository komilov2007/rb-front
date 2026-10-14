import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { type ParamProps } from '@/types/params'
import { yupResolver } from '@hookform/resolvers/yup'
import { createAppComment } from '@/apis/admin/robo-market'
import { object, string, number, type InferType } from 'yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const schema = object().shape({
  rate: number().required().default(0),
  comment: string()
    .max(1000, 'comment_must_be_at_most_1000_characters')
    .required('comment_is_a_required_field')
    .default(''),
})

type SchemaType = InferType<typeof schema>

export const useReviewCreate = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { roboMarketAppId } = useParams<ParamProps>()

  const form = useForm<SchemaType>({
    defaultValues: schema.cast({}),
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}))
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) =>
      await createAppComment({
        app: roboMarketAppId,
        ...data,
      }),
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data, {
      onSuccess: () => {
        setFalse()
        toast.success(t('the_action_has_successfully_been_completed'))
        void queryClient.invalidateQueries({
          queryKey: [REACT_QUERY_KEYS.ROBO_MARKET_APP_COMMENT, roboMarketAppId],
        })
      },
    })
  }

  return { form, value, setTrue, setFalse, isLoading, onSubmit }
}
