import { REASONS } from './constants'
import { useForm } from 'react-hook-form'
import { useBoolean } from '@/hooks/useBoolean'
import { useMutation } from '@tanstack/react-query'
import { type OrderListProps } from '@/types/order'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { changeOrderStatus } from '@/apis/admin/order'

const schema = object().shape({
  admin_comment: string().oneOf(Object.keys(REASONS)).required().default(''),
  comment: string()
    .notRequired()
    .default('')
    .when('admin_comment', (value, schema) => {
      if (value[0] === REASONS.OTHER.value) {
        return schema
          .max(500, 'comment_must_be_at_most_500_characters')
          .required('comment_is_a_required_field')
      }
      return schema
    }),
})

type SchemaType = InferType<typeof schema>

export interface RejectProps extends OrderListProps {
  handleUpdate: () => void
}

export const useReject = ({ handleUpdate, ...props }: RejectProps) => {
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
      const admin = data.admin_comment as keyof typeof REASONS
      const admin_comment =
        data.admin_comment === REASONS.OTHER.value ? data.comment : REASONS[admin].label
      const values = {
        status: 'CANCEL',
        admin_comment,
      }
      return await changeOrderStatus(values, props.id)
    },
    onSuccess: () => {
      setFalse()
      handleUpdate()
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, value, setTrue, setFalse, onSubmit, isLoading }
}
