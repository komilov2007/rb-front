import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSignUpStore } from '@/store/sign-up'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createBot, getBotDetail } from '@/apis/admin/sign-up'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'

const schema = object().shape({
  token: string().required('token_is_a_required_field').default(''),
})

type SchemaType = InferType<typeof schema>

export interface FormTelegramBotProps {
  variant: 'auth' | 'admin'
}

export const useFormTelegramBot = (props: FormTelegramBotProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [returnPage] = useSearchParamsState('return', '')
  const queryClient = useQueryClient()
  const isVariantAdmin = props.variant === 'admin'
  const { step, setStep } = useSignUpStore(state => ({ step: state.step, setStep: state.setStep }))
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => await createBot(data),
    onSuccess: () => {
      toast.success(t('token_added_successfully'))
      if (isVariantAdmin) {
        void queryClient.invalidateQueries([REACT_QUERY_KEYS.TELEGRAM_BOT_SETTINGS])
        navigate(
          returnPage.length
            ? returnPage
            : `${ROUTER.ADMIN}/${ROUTER.PLATFORMS}/${ROUTER.TELEGRAM_BOTS}`,
        )
      } else {
        const newStep = step > 2 ? step : step + 1
        setStep(newStep)
        navigate(ROUTER.CREATE_SETTINGS)
      }
    },
  })
  const detail = useQuery({
    queryFn: getBotDetail,
    enabled: !isVariantAdmin,
    queryKey: [REACT_QUERY_KEYS.BOT_DETAIL],
    onSuccess: res => {
      form.reset({ token: res.data.token })
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return { form, detail, onSubmit, isLoading, isVariantAdmin }
}
