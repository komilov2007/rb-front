import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import type { ParamProps } from '@/types/params'
import { BANNER_TYPE } from '@/constants/banner'
import { useProfileStore } from '@/store/profile'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import type { LanguageTypes } from '@/types/language'
import { schema, type SchemaType } from './form.schema'
import { useNavigate, useParams } from 'react-router-dom'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import type { BannerProps, BannersProps } from '@/types/banners'
import { cenvertLanguages, defaultNameLanguages } from '@/utils/languages'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getBannersOnlineShop,
  updateBannerOnlineShop,
  createBannerOnlineShop,
  getBannerDetailOnlineShop,
} from '@/apis/admin/banner'

export interface FormBannerProps extends Partial<BannersProps> {
  variant: 'add' | 'edit' | 'create'
  count?: number
}

type PanelsProps = Array<{
  label: string
  value: LanguageTypes
  name: keyof Pick<SchemaType, 'name_uz' | 'name_ru' | 'name_en' | 'name_tr'>
}>

export const useFormBannerOnlineShop = ({ variant }: FormBannerProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isCreate = variant === 'create'
  const { bannerId } = useParams<ParamProps>()
  const { subscription, tabLanguage, setSubscriptionModal } = useProfileStore(state => ({
    tabLanguage: state.tabLanguage,
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const {
    data = {
      data: {
        count: 0,
        data: [],
        enableMainBanner: false,
      },
    },
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.BANNER_LIST],
    select: res => {
      const count = res?.data.length ?? 0
      const enableMainBanner =
        (subscription?.tariff === 'START' && count < 1) ||
        (subscription?.tariff === 'BASIC' && count < 5) ||
        subscription?.tariff === 'PRO' ||
        !isCreate

      return { ...res, data: { count, data: res.data, enableMainBanner } }
    },
    queryFn: async () => await getBannersOnlineShop({ type: 'MAIN' }),
    onSuccess: res => {
      form.setValue(
        'banner_type',
        res.data.enableMainBanner ? BANNER_TYPE.MAIN.value : BANNER_TYPE.CATEGORY.value,
      )
    },
  })

  const detail = useQuery({
    enabled: variant === 'edit' && Boolean(bannerId),
    queryFn: async () => await getBannerDetailOnlineShop(String(bannerId)),
    queryKey: [REACT_QUERY_KEYS.BANNER_DETAIL, bannerId, variant],
    onSuccess: res => {
      const names = cenvertLanguages('name', res.data.button_translations || [])
      form.reset({
        ...names,
        mobile_photo: res.data.mobile_photo_key,
        desktop_photo: res.data.desktop_photo_key,
        product_id: res.data.product_id,
        category_id: res.data.category_id,
        banner_type: res.data.banner_type,
        link_type: res.data.product_id ? 'PRODUCT' : res.data.category_id ? 'CATEGORY' : '',
        category_name: res.data.category_name || '',
        product_name: res.data.product_name || '',
      })
    },
  })

  const handleBack = () => {
    navigate(-1)
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const title_translations = defaultNameLanguages(
        'name',
        {
          name_en: data.name_en,
          name_ru: data.name_ru,
          name_uz: data.name_uz,
          name_tr: data.name_tr,
        },
        true,
      )

      const values = {
        mobile_photo: data.mobile_photo,
        desktop_photo: data.banner_type === 'MAIN' ? data?.desktop_photo : null,
        product_id: data.banner_type === 'CATEGORY' ? null : data?.product_id,
        category_id: data?.category_id,
        button_translations: title_translations,
        banner_type: data.banner_type,
      }
      if (variant === 'edit') {
        return await updateBannerOnlineShop(values, Number(bannerId))
      }

      return await createBannerOnlineShop(values)
    },
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.BANNER_LIST_ONLINE_SHOP])
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.CATEGORY_BANNER_LIST])
      handleBack()
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  const handleDeleteCategory = () => {
    form.setValue('category_id', null)
    form.setValue('product_id', null)
    form.setValue('link_type', null)
  }

  const mobilePhoto = useWatch({ control: form.control, name: 'mobile_photo' })
  const linkType = useWatch({ control: form.control, name: 'link_type' })
  const bannerType = useWatch({
    control: form.control,
    name: 'banner_type',
  }) as BannerProps

  const panels: PanelsProps = [
    {
      value: 'uz',
      name: 'name_uz',
      label: `${t('button_link_text')} (O'zbek)`,
    },
    {
      value: 'ru',
      name: 'name_ru',
      label: `${t('button_link_text')} (Pусский)`,
    },
    {
      value: 'en',
      name: 'name_en',
      label: `${t('button_link_text')} (English)`,
    },
    {
      value: 'tr',
      name: 'name_tr',
      label: `${t('button_link_text')} (Türkçe)`,
    },
  ]

  const currentPanel = panels.find(p => p.value === tabLanguage)
  const btnName = currentPanel ? form.watch(currentPanel.name) : ''

  const handleSubscription = () => {
    const texts =
      subscription?.tariff === 'START'
        ? {
            title: t('Youre_on_the_Start_plan_thats_why_theres_a_limit'),
            description: t('Your_current_plan_Start_allows_only_1_banner'),
          }
        : {
            title: t('Youre_on_the_Basic_plan_thats_why_theres_a_limit'),
            description: t('Your_current_plan_Basic_allows_only_5_banner'),
          }

    if (!data.data.enableMainBanner) {
      setSubscriptionModal(true, texts)
    }
  }

  return {
    form,
    data,
    panels,
    detail,
    btnName,
    onSubmit,
    linkType,
    isCreate,
    isLoading,
    handleBack,
    bannerType,
    mobilePhoto,
    handleSubscription,
    handleDeleteCategory,
  }
}
