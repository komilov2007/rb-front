import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useBoolean } from '@/hooks/useBoolean'
import { useMutation } from '@tanstack/react-query'
import { exportOrderPdf } from '@/apis/admin/order'
import { ORDER_STATUS_FILTER } from '@/constants/order'
import { DateObject } from 'react-multi-date-picker'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, array, string, boolean, type InferType } from 'yup'

const schema = object().shape({
  export_type: string().oneOf(['by_orders', 'by_products']).default('by_orders'),
  product_filter: string().oneOf(['all', 'selection']).default('all'),
  file_type: string().oneOf(['pdf', 'excel']).default('pdf'),
  product_id: string().default(''),
  date: array().default([new DateObject().toDate(), new DateObject().toDate()]),
  status: array()
    .of(
      object().shape({
        status: string().required(),
        checked: boolean().default(false),
        label: string().required(),
      }),
    )
    .default(
      Object.values(ORDER_STATUS_FILTER).map(s => ({
        status: s.status,
        checked: false,
        label: s.label,
      })),
    ),
})

type SchemaType = InferType<typeof schema>

export const useAssemblySheet = () => {
  const { value, setTrue, setFalse } = useBoolean()

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const exportType = form.watch('export_type')
  const productFilter = form.watch('product_filter')

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const statusFiltered = data.status?.filter(s => s.checked).map(s => s.status) ?? []
      const status = statusFiltered.length > 0 ? statusFiltered.join(',') : undefined
      const params: {
        export_type: 'by_orders' | 'by_products'
        file_type: 'pdf' | 'excel'
        status?: string
        product_id?: string
        from_date?: string
        to_date?: string
      } = {
        export_type: data.export_type as 'by_orders' | 'by_products',
        file_type: data.file_type as 'pdf' | 'excel',
        status,
        from_date: data.date?.[0] ? dayjs(data.date[0]).format('YYYY-MM-DD') : undefined,
        to_date: data.date?.[1] ? dayjs(data.date[1]).format('YYYY-MM-DD') : undefined,
      }
      if (
        data.export_type === 'by_products' &&
        data.product_filter === 'selection' &&
        data.product_id
      ) {
        params.product_id = data.product_id
      }
      return await exportOrderPdf(params)
    },
    onSuccess: (res, variables) => {
      setFalse()
      const isExcel = variables.file_type === 'excel'
      const mime = isExcel
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'application/pdf'
      const extension = isExcel ? 'xlsx' : 'pdf'
      const blob = new Blob([res.data], { type: mime })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `assembly-sheet-${dayjs().format('YYYY-MM-DD-HHmm')}.${extension}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      form.reset(schema.cast({}))
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return {
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    exportType,
    productFilter,
  }
}
