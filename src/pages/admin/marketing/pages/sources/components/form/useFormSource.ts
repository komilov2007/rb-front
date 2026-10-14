import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { PLATFORMS } from '@/constants/busniness'
import { useProfileStore } from '@/store/profile'
import { useMutation } from '@tanstack/react-query'
import { createSource } from '@/apis/admin/sources'
import { type SourcesProps } from '@/types/sources'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export interface FormSourcerops {
  handleUpdate: (data: SourcesProps) => void
}

const schema = object().shape({
  name: string().required('name_is_a_required_field').default(''),
  platform: string().oneOf(Object.keys(PLATFORMS)).required().default(PLATFORMS.TELEGRAM.value),
})

type SchemaType = InferType<typeof schema>

export const useFormPromoCode = ({ handleUpdate }: FormSourcerops) => {
  const { t } = useTranslation()
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}, { assert: false }))
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      return await createSource(data)
    },
    onSuccess: res => {
      setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      handleUpdate(res.data)
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleOpen = () => {
    const { tariff } = subscription || {}
    const canOpen = tariff === 'BASIC' || tariff === 'PRO'

    canOpen ? setTrue() : setSubscriptionModal(true)
  }

  return { form, value, setTrue, setFalse, onSubmit, isLoading, handleOpen }
}
