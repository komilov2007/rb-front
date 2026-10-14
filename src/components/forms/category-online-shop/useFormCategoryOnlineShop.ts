import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRef, type FormEvent } from 'react'
import { useBoolean } from '@/hooks/useBoolean'
import type { ParamProps } from '@/types/params'
import { useProfileStore } from '@/store/profile'
import type { LanguageTypes } from '@/types/language'
import { yupResolver } from '@hookform/resolvers/yup'
import { CATEGORY_TYPES } from '@/constants/category'
import { useNavigate, useParams } from 'react-router-dom'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { cenvertLanguages, defaultNameLanguages } from '@/utils/languages'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { schemaCategoryOnlineShop, type SchemaTypeCategoryOnlineShop } from '@/utils/schema'
import {
  updateCategoryOnlineShop,
  createCategoryOnlineShop,
  getCategoryOnlineShopDetail,
} from '@/apis/admin/category'
import { generateProductDescription } from '@/apis/admin/product'

type PanelsProps = Array<{
  label: string
  value: LanguageTypes
  name: keyof Pick<SchemaTypeCategoryOnlineShop, 'name_en' | 'name_ru' | 'name_uz' | 'name_tr'>
}>

export interface FormCategoryOnlineShopProps {
  variant: 'edit' | 'add' | 'create'
  onSelect?: (props: { value: number; label: string }) => void
}

export const useFormCategoryOnlineShop = (props: FormCategoryOnlineShopProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const topRef = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()
  const modal = useBoolean(props.variant !== 'create')
  const { categoryId } = useParams<ParamProps>()
  const form = useForm<SchemaTypeCategoryOnlineShop>({
    mode: 'onChange',
    resolver: yupResolver(schemaCategoryOnlineShop),
    defaultValues: schemaCategoryOnlineShop.cast({}, { assert: false }),
  })

  const { languages, setTabLanguage } = useProfileStore(state => ({
    languages: state.me?.languages ?? [],
    setTabLanguage: state.setTabLanguage,
  }))

  const nameEn = form.watch('name_en')
  const nameUz = form.watch('name_uz')
  const nameTr = form.watch('name_tr')
  const nameRu = form.watch('name_ru')
  const name = nameEn || nameUz || nameTr || nameRu

  const handleBack = () => {
    if (props.variant === 'create') {
      modal.setFalse()
    } else {
      navigate(-1)
    }
  }

  const detail = useQuery({
    enabled: props.variant === 'edit' && Boolean(categoryId),
    queryFn: async () => await getCategoryOnlineShopDetail(String(categoryId)),
    queryKey: [REACT_QUERY_KEYS.CATEGORY_DETAIL, categoryId, props.variant],
    onSuccess: res => {
      const names = cenvertLanguages('name', res.data.name_translations)
      form.reset({
        ...names,
        photo: res.data.photo,
        banner_photo: res.data.banner_photo,
        photo_key: res.data.photo_key,
        banner_photo_key: res.data.banner_photo_key,
        scroll_type: res.data.scroll_type,
        category_type: res.data.parent_id ? CATEGORY_TYPES.ASSIGN.value : CATEGORY_TYPES.ADD.value,
        parent_id: res.data.parent_id ? String(res.data.parent_id) : null,
      })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaTypeCategoryOnlineShop) => {
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
      const isEdit = props.variant === 'edit'
      const baseValues = {
        photo: isEdit ? data.photo_key : data.photo,
      }

      const values =
        data.category_type === CATEGORY_TYPES.ADD.value
          ? {
              ...baseValues,
              banner_photo: props.variant === 'edit' ? data.banner_photo_key : data.banner_photo,
            }
          : {
              parent_id: Number(data.parent_id),
              ...baseValues,
            }

      const payload = {
        ...values,
        name_translations,
        scroll_type: data.scroll_type,
      }

      if (isEdit) {
        return await updateCategoryOnlineShop(payload, String(categoryId))
      }

      return await createCategoryOnlineShop(payload)
    },
    onSuccess: res => {
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.CATEGORIES_ONLINE_SHOP_LIST])
      handleBack()
      if (props?.onSelect) props?.onSelect({ label: res.data.name, value: res.data.id })
    },
  })

  const handleSubmit = (data: SchemaTypeCategoryOnlineShop) => {
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
    t,
    form,
    name,
    modal,
    panels,
    detail,
    topRef,
    onSubmit,
    isLoading,
    languages,
    handleBack,
    handleTranslateTitle,
    translateTitleLoading,
  }
}
