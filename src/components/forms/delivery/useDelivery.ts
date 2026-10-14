import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { DELIVERIES } from '@/constants/delivery'
import { type DeliveryProps } from '@/types/branch'
import { type LanguageTypes } from '@/types/language'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type SchemaType } from './form.schema'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { deleteShopDelivery, getShopDelivery, updateShopDelivery } from '@/apis/admin/shop'

export type PanelsProps = Array<{
  label: string
  value: LanguageTypes
  name: 'text_uz' | 'text_ru' | 'text_en' | 'text_tr'
}>

export const useDelivery = () => {
  const { t } = useTranslation()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })
  const { languages, setTabLanguage } = useProfileStore(state => ({
    languages: state.me?.languages ?? [],
    setTabLanguage: state.setTabLanguage,
  }))

  const { data, refetch, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.SHOP_DELIVERY_DETAILS],
    queryFn: async () => await getShopDelivery<DeliveryProps>(),
    select: data => {
      const branches = data.data.branches.map(b => ({
        name: b.name,
        branchId: b.id,
        address: b.address,
        checked: b.service.includes('DELIVERY'),
      }))
      const cities = data.data.cities.map(c => c.id)

      const values = {
        cities,
        branches,
        price: data.data.price,
        text_uz: data.data.text_uz,
        text_en: data.data.text_en,
        text_ru: data.data.text_ru,
        text_tr: data.data.text_tr,
        delivery: data.data.delivery,
        country: data.data.country?.id,
        max_price: data.data.max_price,
        min_price: data.data?.min_price,
        inital_km: data.data?.inital_km,
        shipping_time: data.data?.shipping_time,
        every_km_price: data.data?.every_km_price,
        inital_km_price: data.data?.inital_km_price,
        is_free_threshold: data.data.is_free_threshold,
        payment_types: data.data.payment_types ?? [],
      }
      return { ...data, values }
    },
    onSuccess: data => {
      form.reset(data.values)
    },
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(data?.values)
    },
  })

  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: async ({ branches, text_en, text_ru, text_uz, text_tr, ...rest }: SchemaType) => {
      const texts =
        DELIVERIES.CUSTOM.value === rest.delivery
          ? {
              text_en,
              text_ru,
              text_uz,
              text_tr,
            }
          : null

      const values =
        rest.delivery === DELIVERIES.FLEXABLE.value
          ? {
              ...data?.data,
              ...rest,
              text: null,
              branches: data?.data.branches.map(b => {
                const checked = branches.find(v => v.branchId === b.id)?.checked
                if (checked) {
                  return { ...b, service: ['DELIVERY', 'PICKUP'] }
                }
                return { ...b, service: ['PICKUP'] }
              }),
              is_active: true,
            }
          : {
              ...data?.data,
              ...rest,
              ...texts,
              is_active: true,
              branches: data?.data.branches.map(b => {
                const checked = branches.find(v => v.branchId === b.id)?.checked
                if (checked) {
                  return { ...b, service: ['DELIVERY', 'PICKUP'] }
                }
                return { ...b, service: ['PICKUP'] }
              }),
            }

      return await updateShopDelivery(values)
    },
    onSuccess: () => {
      void refetch()
      setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const { mutate, isLoading: isLoadingDelete } = useMutation({
    mutationFn: async () => {
      return await deleteShopDelivery(String(data?.data.id))
    },
    onSuccess: () => {
      void refetch()
      setFalse()
      toast.success(t('deleted'))
    },
  })

  const handleDelete = () => {
    mutate()
  }

  const onSubmit = (data: SchemaType) => {
    const language = languages.filter(value => {
      if (data[`text_${value}`] === '') {
        form.setError(`text_${value}`, { message: 'text_is_a_required_field' })
        return true
      }
      return false
    })
    if (language.length > 0) {
      setTabLanguage(language[0])
    } else {
      mutateUpdate(data)
    }
  }

  const panels: PanelsProps = [
    {
      value: 'uz',
      name: 'text_uz',
      label: `${t('text_for_explanation')} (O'zbek)`,
    },
    {
      value: 'ru',
      name: 'text_ru',
      label: `${t('text_for_explanation')} (Pусский)`,
    },
    {
      value: 'en',
      name: 'text_en',
      label: `${t('text_for_explanation')} (English)`,
    },
    {
      value: 'tr',
      name: 'text_tr',
      label: `${t('text_for_explanation')} (Türkçe)`,
    },
  ]

  return {
    data,
    form,
    value,
    panels,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleDelete,
    isLoadingDelete,
    isLoadingUpdate,
  }
}
