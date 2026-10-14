import { getUser } from '@/utils/user'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { useNavigate } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMarketingStore } from '@/store/marketing'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { getFileFromLink } from '@/utils/get-file-from-link'
import { sendMailing, createMailing } from '@/apis/admin/mailing'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const useSend = () => {
  const navigate = useNavigate()
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      handleCancel()
      navigate(`${ROUTER.ADMIN}/${ROUTER.MARKETING}/${ROUTER.MARKETING_MAILING}`)
    },
  })
  const { data, setStep, handleCancel } = useMarketingStore(state => ({
    data: state.data,
    setStep: state.setStep,
    handleCancel: state.handleCancel,
  }))
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })
  const queryClient = useQueryClient()
  const send = useMutation({
    mutationFn: sendMailing,
    onSuccess: () => {
      setTrue()
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ME])
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (values: SchemaType) => {
      const user = getUser()
      const formData = new FormData()
      const file =
        typeof data.file === 'string' ? await getFileFromLink(data.file) : (data.file as File)

      formData.append('file', file)
      if (data.text && data.text?.length > 0) {
        formData.append('text', data.text)
      }

      if (data.title && data.title?.length > 0) {
        formData.append('title', data.title)
      }

      if (data.buttons && data.buttons?.length > 0) {
        formData.append('buttons', JSON.stringify(data.buttons))
      }
      if (data.users && data.users?.length > 0) {
        formData.append('users', JSON.stringify(data.users))
      }
      // const schedule_datetime =
      //   values.type === SEND_TIME_OPTIONS.NOW.value
      //     ? dayjs().format('YYYY-MM-DDTHH:mm:00')
      //     : `${dayjs(values.date).format('YYYY-MM-DD')}T${dayjs(values.time).format('HH:mm:00')}`
      // formData.append('schedule_datetime', schedule_datetime)
      formData.append('shop', user.shop)
      return await createMailing(formData)
    },
    onSuccess: res => {
      send.mutate(res.data.id)
    },
  })

  const handleBack = () => {
    setStep('description')
  }

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { send, form, data, value, onSubmit, setFalse, isLoading, handleBack }
}
