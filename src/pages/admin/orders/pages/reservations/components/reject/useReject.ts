import { REASONS } from './constants'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateReservationStatus } from '@/apis/admin/reservation'

const schema = object().shape({
  reason: string().oneOf(Object.keys(REASONS)).required().default(''),
  comment: string()
    .notRequired()
    .default('')
    .when('reason', (value, schema) => {
      if (value[0] === REASONS.OTHER.value) {
        return schema
          .max(500, 'comment_must_be_at_most_500_characters')
          .required('comment_is_a_required_field')
      }
      return schema
    }),
})

type SchemaType = InferType<typeof schema>

export interface RejectProps {
  id: number
  variant: 'table' | 'modal'
  handleUpdate?: () => void
}

export const useReject = ({ id, handleUpdate }: RejectProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}, { assert: false }))
    },
  })
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const reason = data.reason as keyof typeof REASONS
      // the customer receives this text in the bot as is
      const seller_comment =
        reason === REASONS.OTHER.value ? data.comment?.trim() : t(REASONS[reason].label)
      return await updateReservationStatus({ status: 'REJECTED', seller_comment }, id)
    },
    onSuccess: res => {
      toast.success(t('the_action_has_successfully_been_completed'))
      queryClient.setQueryData(
        [REACT_QUERY_KEYS.RESERVATION_DETAIL, res.data.id],
        (prev: object | undefined) => ({ ...prev, data: res.data }),
      )
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.RESERVATION_LIST])
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.RESERVATION_STATS])
      setFalse()
      if (handleUpdate) handleUpdate()
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, value, setTrue, setFalse, onSubmit, isLoading }
}
