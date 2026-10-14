import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getClickSuperApp, installClickSuperApp } from '@/apis/admin/click-super-app'

const schema = object().shape({
  natural: string().required(),
  name: string().required('name_is_a_required_field').default(''),
  tin_or_pinfl: string().required('tin_pinfl_is_a_required_field').default(''),
  mfo: string().required('mfo_is_a_required_field').default(''),
  bank_account: string().required('bank_account_is_a_required_field').default(''),
  address: string().required('address_is_a_required_field').default(''),
  phone: string().required('phone_is_a_required_field').default(''),
})

type SchemaType = InferType<typeof schema>

export interface FormClickSuperAppProps {
  onClose?: () => void
  is_application?: boolean
}

export const useFormClickSuperApp = ({ onClose, is_application }: FormClickSuperAppProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CLICK_SUPER_APP_DETAIL],
    queryFn: getClickSuperApp,
    select: res => {
      const data = {
        name: res.data.name,
        tin_or_pinfl: res.data.tin_or_pinfl,
        mfo: res.data.mfo,
        bank_account: res.data.bank_account,
        address: res.data.address,
        phone: res.data.phone,
        natural: res.data.is_natural ? 'individual' : 'legal',
      }
      return { ...res, data }
    },
    onSuccess: res => {
      form.reset(res.data)
    },
  })

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast(data?.data, { assert: false }),
  })

  const clickSuperApp = useMutation({
    mutationFn: async ({ natural, ...data }: SchemaType) =>
      await installClickSuperApp({ ...data, is_natural: natural === 'individual', is_application }),
    onSuccess: () => {
      if (onClose) {
        onClose()
      }
      form.reset(schema.cast({}, { assert: false }))
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.CLICK_SUPER_APP_DETAIL])
    },
  })

  const onSubmit = (data: SchemaType) => {
    clickSuperApp.mutate(data)
  }

  return {
    t,
    form,
    onSubmit,
    isLoading,
    clickSuperApp,
  }
}
