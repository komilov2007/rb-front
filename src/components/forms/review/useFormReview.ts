import { useForm } from 'react-hook-form'
import { useBoolean } from '@/hooks/useBoolean'
import type { ReviewProps } from '@/types/review'
import { useMutation } from '@tanstack/react-query'
import { answerComment } from '@/apis/admin/review'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = object().shape({
  comment: string().required('answer_required_field').default('').max(160, 'answer_max_160'),
})

type SchemaType = InferType<typeof schema>

export interface FormReviewProps extends ReviewProps {
  handleUpdate: (value: ReviewProps) => void
}

export const useFormReview = (props: FormReviewProps) => {
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
    mutationFn: async (data: SchemaType) => await answerComment(data, props.id),
    onSuccess: res => {
      setFalse()
      props.handleUpdate(res.data)
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, value, setTrue, setFalse, onSubmit, isLoading }
}
