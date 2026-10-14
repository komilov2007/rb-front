import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useState, type MouseEvent } from 'react'
import { number, object, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getAutoResponder, updateLateTime } from '@/apis/admin/order'
import type { SelectProps, SelectChangeEvent } from '@mui/material/Select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type SelectLateProps = Pick<SelectProps, 'value' | 'onChange'> & {
  mobile?: boolean
  variant: 'body' | 'header'
}

const schema = object().shape({
  hour: number()
    .min(0)
    .max(24, 'hour_validation')
    .typeError('hour_must_be_a_number_type')
    .test('noEOrSign', value => typeof value === 'number' && !/[eE+-]/.test(String(value)))
    .default(0),
  minut: number()
    .min(0)
    .max(60, 'minute_validation')
    .typeError('minut_must_be_a_number_type')
    .test('noEOrSign', value => typeof value === 'number' && !/[eE+-]/.test(String(value)))
    .default(15),
  option: number().nullable(),
})

type SchemaType = InferType<typeof schema>

export const useSelect = (props: SelectLateProps) => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [value, setValue] = useState<number | null>(null)
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })
  const { data, isLoading } = useQuery({
    queryFn: getAutoResponder,
    queryKey: [REACT_QUERY_KEYS.ORDER_AUTO_RESPONDER],
    onSuccess: res => {
      setValue(res.data.late_time)
      const isHour = res.data.late_time / 60 > 1
      const hour = isHour ? Math.floor(res.data.late_time / 60) : 0
      const minut = isHour ? res.data.late_time % 60 : (res.data.late_time ?? 0)
      form.reset({
        hour,
        minut,
      })
    },
  })

  const changeTime = useMutation({
    mutationFn: async (late_time: number | null) =>
      await updateLateTime({
        late_time,
      }),
    onSuccess: () => {
      modal.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ORDER_AUTO_RESPONDER])
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ORDER_STATUS_COUNT])
      void queryClient.invalidateQueries({
        predicate: query => {
          const q = query.queryKey[0] as string
          return q.startsWith(REACT_QUERY_KEYS.ORDER_STATUS_LIST)
        },
      })
    },
  })

  const handleChangeTime = (event: SelectChangeEvent<number | null>) => {
    changeTime.mutate(event.target.value as number, {
      onSuccess: () => {
        setValue(event.target.value as number)
      },
    })
  }

  const handleUpdateTime = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    changeTime.mutate(null, {
      onSuccess: () => {
        setValue(null)
      },
    })
  }

  const onSubmit = (data: SchemaType) => {
    const hour = data.hour * 60 + data.minut
    changeTime.mutate(hour)
  }

  return {
    data,
    form,
    modal,
    value,
    onSubmit,
    isLoading,
    changeTime,
    handleChangeTime,
    handleUpdateTime,
  }
}
