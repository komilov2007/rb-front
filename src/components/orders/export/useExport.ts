import dayjs from 'dayjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useBoolean } from '@/hooks/useBoolean'
import { exportOrder } from '@/apis/admin/order'
import { orderStatusSchema } from '@/utils/schema'
import { useMutation } from '@tanstack/react-query'
import { object, array, type InferType } from 'yup'
import { DateObject } from 'react-multi-date-picker'
import { yupResolver } from '@hookform/resolvers/yup'
import { downloadExternal } from '@/utils/native-bridge'

export const schema = object()
  .shape({
    date: array().default([new DateObject().toDate(), new DateObject().toDate()]),
  })
  .concat(orderStatusSchema)

export type SchemaType = InferType<typeof schema>

export const useExport = () => {
  const [tab, setTab] = useState(0)
  const { value, setTrue, setFalse } = useBoolean()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const statusFiltered = data.status.filter(s => s.checked).map(s => s.status)
      const status = data.status.length === statusFiltered.length ? undefined : statusFiltered
      const dateParams =
        tab === 0
          ? {
              to_date: dayjs(data.date[1]).format('YYYY-MM-DD'),
              from_date: dayjs(data.date[0]).format('YYYY-MM-DD'),
            }
          : {}
      return await exportOrder({ status, ...dateParams })
    },
    onSuccess: res => {
      setFalse()
      downloadExternal(res.data.file)
      form.reset(schema.cast({}))
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, value, setTrue, setFalse, onSubmit, isLoading, tab, setTab }
}
