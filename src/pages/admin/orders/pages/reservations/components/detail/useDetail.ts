import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getReservationDetail, updateReservationStatus } from '@/apis/admin/reservation'
import type { ReservationProps, ReservationAnswerStatusProps } from '@/types/reservation'

const schema = object().shape({
  seller_comment: string()
    .notRequired()
    .default('')
    .max(500, 'comment_must_be_at_most_500_characters'),
})

type SchemaType = InferType<typeof schema>

export const useDetail = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [row, setRow] = useState<ReservationProps | null>(null)
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      setRow(null)
      form.reset(schema.cast({}, { assert: false }))
    },
  })

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { data } = useQuery({
    enabled: value && !!row,
    queryFn: async () => await getReservationDetail(row?.id),
    queryKey: [REACT_QUERY_KEYS.RESERVATION_DETAIL, row?.id],
  })

  const values = data?.data ?? row

  const { mutate, isLoading } = useMutation({
    mutationFn: async (status: ReservationAnswerStatusProps) => {
      const seller_comment = form.getValues('seller_comment')?.trim()
      return await updateReservationStatus(
        { status, seller_comment: seller_comment || undefined },
        Number(row?.id),
      )
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
    },
  })

  const onSubmit = (status: ReservationAnswerStatusProps) => async () => {
    await form.handleSubmit(() => {
      mutate(status)
    })()
  }

  return { row, form, value, values, setRow, setTrue, setFalse, onSubmit, isLoading }
}
