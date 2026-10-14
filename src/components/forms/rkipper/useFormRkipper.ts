import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getRkipper, installRkipper } from '@/apis/admin/rkipper'

const schema = object().shape({
  host: string().required(),
  port: string().required(),
  table: string().required(),
  station: string().required(),
  password: string().required(),
  username: string().required(),
})

type SchemaType = InferType<typeof schema>

export interface FormRkipperProps {
  onClose: () => void
}

export const useFormRkipper = ({ onClose }: FormRkipperProps) => {
  const { t } = useTranslation()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.RKIPPER_DETAIL],
    queryFn: getRkipper,
    onSuccess: res => {
      form.reset({
        host: res.data.host,
        port: res.data.port,
        table: res.data.table,
        station: res.data.station,
        username: res.data.username,
        password: res.data.password,
      })
    },
  })

  const smartUp = useMutation({
    mutationFn: async (data: SchemaType) => await installRkipper(data),
    onSuccess: () => {
      onClose()
      form.reset(schema.cast({}, { assert: false }))
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaType) => {
    smartUp.mutate(data)
  }

  return { t, data, form, smartUp, onSubmit, isLoading }
}
