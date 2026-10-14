import { toast } from 'react-toastify'
import { getUser } from '@/utils/user'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { type BannersProps } from '@/types/banners'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { getFileFromLink } from '@/utils/get-file-from-link'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { createBanner, updateBanner } from '@/apis/admin/banner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface FormBannerProps extends Partial<BannersProps> {
  variant: 'add' | 'edit' | 'create'
  count?: number
}

export const useFormBanner = ({ variant, count = 0, ...rest }: FormBannerProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { subscription, is_new_version, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    is_new_version: state.me?.is_new_version,
    setSubscriptionModal: state.setSubscriptionModal,
  }))

  const defaultValues =
    variant === 'edit'
      ? {
          product: rest.product,
          category: rest.category,
          have_url: rest.have_url,
          mobile_photo: rest.mobile_photo,
          desktop_photo: rest.desktop_photo,
        }
      : {}

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast(defaultValues, { assert: false }),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast(defaultValues, { assert: false }))
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const user = getUser()
      const mobile_photo =
        typeof data.mobile_photo === 'string'
          ? await getFileFromLink(data.mobile_photo)
          : (data.mobile_photo as File)
      const desktop_photo =
        typeof data.desktop_photo === 'string'
          ? await getFileFromLink(data.desktop_photo)
          : (data.desktop_photo as File)

      const formData = new FormData()

      formData.append('mobile_photo', mobile_photo)
      formData.append('desktop_photo', desktop_photo)
      formData.append('have_url', String(data.have_url))
      if (data.have_url) {
        formData.append('category', String(data.category))

        if (is_new_version && data.product) {
          formData.append('product', String(data.product))
        }
      }

      formData.append('shop', String(user.shop))

      if (variant === 'edit') {
        return await updateBanner(formData, Number(rest.id))
      }
      return await createBanner(formData)
    },
    onSuccess: res => {
      setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
      queryClient.setQueryData([REACT_QUERY_KEYS.BANNER_LIST], ({ data, ...rest }) => {
        const newData =
          variant === 'edit'
            ? data.map((b: BannersProps) => (b.id === res.data.id ? res.data : b))
            : [res.data, ...data]

        return { ...rest, data: newData }
      })
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleOpen = () => {
    const { tariff } = subscription || {}
    const canOpen =
      (tariff === 'START' && count < 1) || (tariff === 'BASIC' && count < 5) || tariff === 'PRO'

    const startTextObj = {
      title: t('Youre_on_the_Start_plan_thats_why_theres_a_limit'),
      description: t('Your_current_plan_Start_allows_only_1_banner'),
    }
    const basicTextObj = {
      title: t('Youre_on_the_Basic_plan_thats_why_theres_a_limit'),
      description: t('Your_current_plan_Basic_allows_only_5_banner'),
    }

    if (canOpen) {
      setTrue()
    } else {
      setSubscriptionModal(true, tariff === 'START' ? startTextObj : basicTextObj)
    }
  }

  return {
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleOpen,
    is_new_version,
  }
}
