import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { nameSchema } from '@/utils/schema'
import { useRef, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { mixed, object, type InferType } from 'yup'
import { type LanguageTypes } from '@/types/language'
import { yupResolver } from '@hookform/resolvers/yup'
import { type CategoryProps } from '@/types/category'
import { useSkipSignUp } from '@/hooks/useSkipSignUp'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { generateProductDescription } from '@/apis/admin/product'
import { cenvertLanguages, defaultNameLanguages } from '@/utils/languages'
import {
  updateCategoryOnlineShop,
  createCategoryOnlineShop,
  getCategoryOnlineShopSingle,
} from '@/apis/admin/category'

const schema = object()
  .shape({
    photo: mixed().test('required', 'upload_category_image', file => {
      if (file) return true
      return false
    }),
  })
  .concat(nameSchema('category_name_is_a_required_field'))

type SchemaType = InferType<typeof schema>

type PanelsProps = Array<{
  label: string
  value: LanguageTypes
  name: keyof Omit<SchemaType, 'photo'>
}>

export interface FormCategoryRestarunatProps {
  handleUpdate: (values?: CategoryProps, isSkip?: boolean) => void
}

export const useFormCategoryRestarunat = ({ handleUpdate }: FormCategoryRestarunatProps) => {
  const skip = useSkipSignUp()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const translateTitleButton = useBoolean()
  const topRef = useRef<HTMLDivElement | null>(null)
  const { language, languages, setTabLanguage } = useProfileStore(state => ({
    language: state.language,
    languages: state.me?.languages ?? [],
    setTabLanguage: state.setTabLanguage,
  }))

  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const nameEn = form.watch('name_en')
  const nameUz = form.watch('name_uz')
  const nameTr = form.watch('name_tr')
  const nameRu = form.watch('name_ru')
  const name = nameEn || nameUz || nameTr || nameRu

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const name_translations = defaultNameLanguages(
        'name',
        {
          name_en: data.name_en,
          name_ru: data.name_ru,
          name_uz: data.name_uz,
          name_tr: data.name_tr,
        },
        true,
      )

      if (detail.data?.data.id) {
        const photoKey = String(data.photo)?.split('/').pop()
        return await updateCategoryOnlineShop(
          {
            photo: photoKey,
            name_translations,
            scroll_type: 'HORIZONTAL',
          },
          String(detail.data?.data.id),
        )
      }

      return await createCategoryOnlineShop({
        photo: data.photo,
        name_translations,
        scroll_type: 'HORIZONTAL',
      })
    },
    onSuccess: res => {
      toast.success(
        t(detail.data?.data.id ? 'category_edited_successfully' : 'category_added_successfully'),
      )
      handleUpdate(res.data as CategoryProps)
      setTabLanguage(language)
    },
  })

  const detail = useQuery({
    queryFn: getCategoryOnlineShopSingle,
    queryKey: [REACT_QUERY_KEYS.CATEGORY_DETAIL],
    onSuccess: res => {
      if (res.data.id) {
        const names = cenvertLanguages('name', res.data.name_translations)
        form.reset({
          ...names,
          photo: res.data?.photo,
        })
      }
    },
  })

  const handleSubmit = (data: SchemaType) => {
    const language = languages.filter(value => {
      if (data[`name_${value}`] === '') {
        form.setError(`name_${value}`, { message: 'category_name_is_a_required_field' })
        topRef.current?.scrollIntoView({ behavior: 'smooth' })
        return true
      }
      return false
    })
    if (language.length > 0) {
      setTabLanguage(language[0])
    } else {
      mutate(data)
    }
  }

  const { mutate: translateTitle, isLoading: translateTitleLoading } = useMutation({
    mutationFn: async (data: { name: string; is_translation: boolean }) => {
      return await generateProductDescription(data)
    },
    onSuccess: res => {
      form.setValue('name_en', res.data?.en)
      form.setValue('name_uz', res.data?.uz)
      form.setValue('name_ru', res.data?.ru)
      form.setValue('name_tr', res.data?.tr)
      translateTitleButton.setTrue()
    },
  })

  const handleTranslateTitle = () => {
    translateTitle({ name, is_translation: true })
  }

  const onSubmit = (e: FormEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    void form.handleSubmit(handleSubmit)(e)
  }

  const handlSkip = () => {
    skip.mutate(6, {
      onSuccess: () => {
        handleUpdate(undefined, true)
      },
    })
  }

  const panels: PanelsProps = [
    {
      value: 'uz',
      name: 'name_uz',
      label: `${t('category_name')} (O'zbek)`,
    },
    {
      value: 'ru',
      name: 'name_ru',
      label: `${t('category_name')} (Pусский)`,
    },
    {
      value: 'en',
      name: 'name_en',
      label: `${t('category_name')} (English)`,
    },
    {
      value: 'tr',
      name: 'name_tr',
      label: `${t('category_name')} (Türkçe)`,
    },
  ]

  return {
    skip,
    form,
    PATH,
    name,
    topRef,
    panels,
    detail,
    onSubmit,
    isLoading,
    handlSkip,
    languages,
    translateTitleButton,
    handleTranslateTitle,
    translateTitleLoading,
  }
}
