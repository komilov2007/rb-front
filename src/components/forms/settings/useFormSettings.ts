import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { MAP_CENTER } from '@/constants/map'
import { SOCIALS } from '@/constants/socials'
import { useTranslation } from 'react-i18next'
import { useSignUpStore } from '@/store/sign-up'
import { yupResolver } from '@hookform/resolvers/yup'
import { type LanguageTypes } from '@/types/language'
import { LANGUAGE_OPTIONS } from '@/constants/languages'
import { OPTION_COUNTRIES } from '@/constants/countires'
import { useLocation, useNavigate } from 'react-router-dom'
import { DEFAULT_WORKING_TIMES } from '@/constants/schedules'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getShopSettings, updateShopSettings } from '@/apis/admin/shop'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { schemaSetting, type SchemaTypeDesc, type SchemaTypeSetting } from '@/utils/schema'

export interface SettingsProps {
  variant: 'auth' | 'admin'
}

type PanelsProps = Array<{
  label: string
  value: LanguageTypes
  name: keyof Omit<SchemaTypeDesc, 'photo'>
}>

export const useFormSettings = ({ variant }: SettingsProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const isAdmin = variant === 'admin'
  const queryClient = useQueryClient()
  const { pathname } = useLocation()
  const languageRadioRef = useRef<HTMLDivElement | null>(null)
  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP

  const { step, setStep } = useSignUpStore(state => ({ step: state.step, setStep: state.setStep }))
  const form = useForm<SchemaTypeSetting>({
    mode: 'onChange',
    resolver: yupResolver(schemaSetting),
    defaultValues: schemaSetting.cast({}, { assert: false }),
  })

  const { mutate, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: async (data: SchemaTypeSetting) => {
      const languages = data.languages.filter(l => l.checked).map(l => l.value)
      const socials = data.socials
        .filter(s => s.url && s?.url?.length > 0)
        .map(s => ({ type: s.type, url: s.url }))
      const workingTime = data.schedules.reduce((prev, next) => {
        const hours = next.hours?.map(h => ({
          open: dayjs(h.open).isValid() ? dayjs(h.open).format('HH:mm:00') : '00:00:00',
          close: dayjs(h.close).isValid() ? dayjs(h.close).format('HH:mm:00') : '23:59:59',
        }))
        return {
          ...prev,
          [next.day]: {
            hours,
            is_closed: !next.is_closed,
          },
        }
      }, {})
      const address = {
        branch_name: data.branch_name,
        latitude: data.latitude,
        longitude: data.longitude,
      }

      const normalizedPhone = data.business_phone?.replace(/\s/g, '') ?? ''

      const findPhone = OPTION_COUNTRIES.find(
        ([, , countryCode, mask]) =>
          normalizedPhone.startsWith(`+${countryCode}`) &&
          normalizedPhone.slice(countryCode.length + 1).length ===
            String(mask).replace(/\s/g, '').length,
      )

      const values = {
        socials,
        address,
        languages,
        name: data.name,
        currency: data.currency,
        working_time: workingTime,
        main_language: data.main_language,
        business_phone: findPhone ? data.business_phone : null,
        desc_en: languages.includes('en') ? data.desc_en : '',
        desc_ru: languages.includes('ru') ? data.desc_ru : '',
        desc_uz: languages.includes('uz') ? data.desc_uz : '',
        desc_tr: languages.includes('tr') ? data.desc_tr : '',
      }
      return await updateShopSettings(values)
    },
    onSuccess: () => {
      toast.success(t('settings_saved_successfully'))
      if (variant === 'auth') {
        const newStep = step > 3 ? step : step + 1
        setStep(newStep)
        navigate(`${PATH}/${ROUTER.CREATE_CATEGORY}`)
        void queryClient.invalidateQueries([REACT_QUERY_KEYS.ME])
      }
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      void window.location.reload()
    },
  })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [REACT_QUERY_KEYS.SIGN_UP_SHOP_SETTINGS],
    queryFn: getShopSettings,
    select: res => {
      const languages = Object.values(LANGUAGE_OPTIONS).map(({ Icon, ...l }) =>
        res.data.languages.includes(l.value) ? { ...l, checked: true } : l,
      )

      const workingTimes = Object.entries(res.data.working_time)
      const times =
        res.data.working_time && workingTimes.length > 0
          ? workingTimes
          : Object.entries(DEFAULT_WORKING_TIMES)

      const schedules = times.map(([key, values]) => {
        const hours = values.hours.map(h => ({
          open: h.open
            ? `${dayjs().format('YYYY-MM-DD')} ${h.open}`
            : dayjs().format('YYYY-MM-DD 00:00:00'),
          close: h.open
            ? `${dayjs().format('YYYY-MM-DD')} ${h.close}`
            : dayjs().format('YYYY-MM-DD 23:59:59'),
        }))
        return {
          hours,
          day: Number(key),
          is_closed: !values.is_closed,
        }
      })

      const socials = SOCIALS.map(s => {
        const value = res.data.socials.find(social => social.type === s.type)
        return { ...s, url: value?.url ?? null }
      })

      const data = {
        socials,
        languages,
        schedules,
        name: res.data.name,
        logo: res.data.logo,
        desc_en: res.data.desc_en ?? '',
        desc_ru: res.data.desc_ru ?? '',
        desc_uz: res.data.desc_uz ?? '',
        desc_tr: res.data.desc_tr ?? '',
        main_language: res.data.main_language,
        business_phone: res.data.business_phone ?? '',
        currency: Number(res.data.currency?.id) ?? null,
        branch_name: res.data.address.branch_name?.name_en,
        latitude: res.data.address.latitude ?? MAP_CENTER.latitude,
        longitude: res.data.address.longitude ?? MAP_CENTER.longitude,
      }
      return { ...res, data }
    },
    onSuccess: res => {
      form.reset(res.data)
    },
  })

  const onSubmit = (data: SchemaTypeSetting) => {
    mutate(data)
  }

  const handleCancel = () => {
    form.reset(data?.data)
  }

  const onError = () => {
    if (form.formState.errors?.main_language) {
      if (languageRadioRef.current) {
        languageRadioRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  useEffect(() => {
    const hasError = !!form.formState.errors?.main_language
    if (form.formState.isSubmitted && hasError) {
      requestAnimationFrame(() => {
        if (languageRadioRef.current) {
          languageRadioRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    }
    // re-run when submission state or errors change
  }, [form.formState.isSubmitted, form.formState.errors?.main_language])

  const panels: PanelsProps = [
    {
      value: 'uz',
      name: 'desc_uz',
      label: `${t('about_us')} (O'zbek)`,
    },
    {
      value: 'ru',
      name: 'desc_ru',
      label: `${t('about_us')} (Pусский)`,
    },
    {
      value: 'en',
      name: 'desc_en',
      label: `${t('about_us')} (English)`,
    },
    {
      value: 'tr',
      name: 'desc_tr',
      label: `${t('about_us')} (Türkçe)`,
    },
  ]

  return {
    data,
    form,
    PATH,
    panels,
    isAdmin,
    onError,
    onSubmit,
    isLoading,
    isFetching,
    handleCancel,
    isLoadingUpdate,
    languageRadioRef,
  }
}
