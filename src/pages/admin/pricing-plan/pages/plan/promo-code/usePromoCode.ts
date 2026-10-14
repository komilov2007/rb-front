import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useMutation } from '@tanstack/react-query'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { subcriptionPromocode } from '@/apis/admin/pricing-plan'
import { type SubcriptionPromoCodeProps } from '@/types/pricing-plan'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'

const schema = object().shape({ code: string().required('code_is_a_required_field').default('') })

type SchemaType = InferType<typeof schema>

export interface PromoCodeProps {
  promoCode: SubcriptionPromoCodeProps | null
  setPromoCode: Dispatch<SetStateAction<SubcriptionPromoCodeProps | null>>
}

export const usePromoCode = ({ promoCode, setPromoCode }: PromoCodeProps) => {
  const { t } = useTranslation()
  const [paramsPromoCode] = useSearchParamsState('promoCode', '')

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      if (!paramsPromoCode) {
        form.reset(schema.cast({}))
      }
    },
  })

  useEffect(() => {
    if (paramsPromoCode) {
      form.setValue('code', paramsPromoCode)
    }
  }, [paramsPromoCode, form])

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const code = data.code.toLocaleUpperCase()
      return await subcriptionPromocode({ code })
    },
    onSuccess: res => {
      setFalse()
      setPromoCode(res.data)
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handeRemove = () => {
    setPromoCode(null)
  }

  return { form, value, setTrue, setFalse, onSubmit, isLoading, handeRemove }
}
