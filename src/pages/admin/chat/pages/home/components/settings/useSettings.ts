import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { yupResolver } from '@hookform/resolvers/yup'
import { bool, object, string, type InferType } from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getChatSettings, updateChatSettings } from '@/apis/admin/chat'
import { useProfileStore } from '@/store/profile'

const schema = object().shape({
  on_bot: bool().default(false),
  on_group: bool().default(false),
  auto_answer: bool().default(false),
  answer_instagram: string().nullable(),
  answer: string()
    .nullable()
    .when('auto_answer', (value, schema) => {
      if (value[0]) {
        return schema.required('answer_is_a_required_field').default('')
      }
      return schema
    }),
})

type SchemaType = InferType<typeof schema>

interface SettingsProps {
  name: keyof SchemaType
  label: string
}

export const SETTINGS: SettingsProps[] = [
  {
    name: 'on_group',
    label: 'chat_on_group',
  },
  {
    name: 'on_bot',
    label: 'chat_on_bot',
  },
  {
    name: 'auto_answer',
    label: 'chat_auto_answer',
  },
]

export const useSettings = () => {
  const { t } = useTranslation()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}))
    },
  })

  const { setSubscriptionModal, is_free, is_expired, is_basic } = useProfileStore(state => ({
    setSubscriptionModal: state.setSubscriptionModal,
    is_free: state.me?.subscription.is_free,
    is_expired: state.me?.subscription.is_expired,
    is_basic: state.me?.subscription.is_basic,
  }))

  const hasAccess = (is_basic || is_expired) && !is_free

  const settings = useQuery({
    enabled: value,
    queryFn: getChatSettings,
    queryKey: [REACT_QUERY_KEYS.CHAT_SETTINGS],
    onSuccess: res => {
      const values = {
        answer: res.data.answer,
        on_bot: res.data.on_bot,
        on_group: res.data.on_group,
        auto_answer: res.data.auto_answer,
        answer_instagram: res.data.answer_instagram,
      }
      form.reset(values)
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const values = { ...data, answer: data.answer?.length === 0 ? null : data.answer }
      return await updateChatSettings(values)
    },
    onSuccess: () => {
      setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleOpen = () => {
    const canOpen = !hasAccess

    if (canOpen) {
      setTrue()
    } else {
      setSubscriptionModal(true)
    }
  }

  return { form, value, setTrue, settings, setFalse, onSubmit, isLoading, handleOpen }
}
