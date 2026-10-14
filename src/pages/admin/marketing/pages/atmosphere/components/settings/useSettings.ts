import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { defaultLanguages } from '@/utils/languages'
import { type LanguageTypes } from '@/types/language'
import { updateAtmosphere } from '@/apis/admin/atmosphere'
import { type AtmosphereProps } from '@/types/atmosphere'
import { useAtmosphereCache } from '../../useAtmosphereCache'

export interface SettingsProps {
  canEdit: boolean
  atmosphere: AtmosphereProps
}

export interface SettingsValues {
  title_uz: string
  title_ru: string
  title_en: string
  title_tr: string
  desc_uz: string
  desc_ru: string
  desc_en: string
  desc_tr: string
  is_active: boolean
}

const LANGUAGES: LanguageTypes[] = ['uz', 'ru', 'en', 'tr']

const LANGUAGE_LABELS: Record<LanguageTypes, string> = {
  uz: 'O‘zbek',
  ru: 'Pусский',
  en: 'English',
  tr: 'Türkçe',
}

const getValues = (atmosphere: AtmosphereProps): SettingsValues => ({
  title_uz: atmosphere.title_uz ?? '',
  title_ru: atmosphere.title_ru ?? '',
  title_en: atmosphere.title_en ?? '',
  title_tr: atmosphere.title_tr ?? '',
  desc_uz: atmosphere.desc_uz ?? '',
  desc_ru: atmosphere.desc_ru ?? '',
  desc_en: atmosphere.desc_en ?? '',
  desc_tr: atmosphere.desc_tr ?? '',
  is_active: atmosphere.is_active,
})

export const useSettings = ({ atmosphere }: SettingsProps) => {
  const { t } = useTranslation()
  const { update } = useAtmosphereCache()
  const form = useForm<SettingsValues>({ defaultValues: getValues(atmosphere) })

  useEffect(() => {
    // Keep whatever the user is editing if the page gets refetched in the background
    form.reset(getValues(atmosphere), { keepDirtyValues: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atmosphere.updated_at])

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SettingsValues) => {
      const texts = [
        ...(defaultLanguages('title', {
          title_uz: data.title_uz,
          title_ru: data.title_ru,
          title_en: data.title_en,
          title_tr: data.title_tr,
        }) as Array<[string, string]>),
        ...(defaultLanguages('desc', {
          desc_uz: data.desc_uz,
          desc_ru: data.desc_ru,
          desc_en: data.desc_en,
          desc_tr: data.desc_tr,
        }) as Array<[string, string]>),
      ].map(([key, value]) => [key, value ?? ''])

      return await updateAtmosphere({
        ...Object.fromEntries(texts),
        is_active: data.is_active,
      })
    },
    onSuccess: res => {
      toast.success(t('the_action_has_successfully_been_completed'))
      form.reset(getValues(res.data))
      update(data => ({ ...data, ...res.data }))
    },
  })

  const onSubmit = (data: SettingsValues) => {
    mutate(data)
  }

  const panels = LANGUAGES.map(value => ({
    value,
    title: `title_${value}` as const,
    desc: `desc_${value}` as const,
    titleLabel: `${t('atmosphere_page_title')} (${LANGUAGE_LABELS[value]})`,
    descLabel: `${t('description')} (${LANGUAGE_LABELS[value]})`,
  }))

  return {
    form,
    panels,
    onSubmit,
    isLoading,
  }
}
