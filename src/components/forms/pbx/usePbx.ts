import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { installPbx, getOnlinePbx } from '@/apis/admin/pbx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

const schema = object().shape({
  auth_key: string().required('auth_key_is_a_required_field'),
  pbx_domain: string().required('pbx_domain_is_a_required_field'),
})

type SchemaType = InferType<typeof schema>

export interface PbxProps {
  onClose: () => void
}

export const usePbx = ({ onClose }: PbxProps) => {
  const { t } = useTranslation()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.PBX_DETAIL],
    queryFn: getOnlinePbx,
    onSuccess: res => {
      form.reset({
        auth_key: res.data.auth_key,
        pbx_domain: res.data.pbx_domain,
      })
    },
  })

  const pbx = useMutation({
    mutationFn: async (data: SchemaType) => await installPbx(data),
    onSuccess: () => {
      onClose()
      form.reset(schema.cast({}, { assert: false }))
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaType) => {
    pbx.mutate(data)
  }

  return { t, pbx, data, form, onSubmit, isLoading }
}
