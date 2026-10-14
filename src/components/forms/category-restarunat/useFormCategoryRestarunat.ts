import { getUser } from '@/utils/user'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { defaultLanguages } from '@/utils/languages'
import { type LanguageTypes } from '@/types/language'
import { yupResolver } from '@hookform/resolvers/yup'
import { type CategoryProps } from '@/types/category'
import { useSkipSignUp } from '@/hooks/useSkipSignUp'
import { getFileFromLink } from '@/utils/get-file-from-link'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { generateProductDescription } from '@/apis/admin/product'
import { categoriesSchema, type SchemaTypeCategories } from '@/utils/schema'
import {
  updateCategory,
  createCategory,
  getCategoryDetail,
  getStepCategoryDetail,
  createOrUpdateCategory,
} from '@/apis/admin/category'

type PanelsProps = Array<{
  label: string
  value: LanguageTypes
  name: keyof Omit<SchemaTypeCategories, 'photo'>
}>

export interface FormCategoryRestarunatProps {
  id?: number
  noPlus?: boolean
  variant: 'edit' | 'add' | 'create'
  handleUpdate: (values?: CategoryProps, isSkip?: boolean) => void
}

export const useFormCategoryRestarunat = ({
  id,
  variant,
  handleUpdate,
}: FormCategoryRestarunatProps) => {
  const user = getUser()
  const skip = useSkipSignUp()
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { branches, languages, setTabLanguage } = useProfileStore(state => ({
    languages: state.me?.languages ?? [],
    setTabLanguage: state.setTabLanguage,
    branches: state.branches.map(b => b.value),
  }))
  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP

  const form = useForm<SchemaTypeCategories>({
    mode: 'onChange',
    resolver: yupResolver(categoriesSchema),
    defaultValues: categoriesSchema.cast({ branches }),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(categoriesSchema.cast({}))
    },
  })
  const handlSkip = () => {
    skip.mutate(6, {
      onSuccess: () => {
        handleUpdate(undefined, true)
      },
    })
  }

  const nameEn = form.watch('name_en')
  const nameUz = form.watch('name_uz')
  const nameTr = form.watch('name_tr')
  const nameRu = form.watch('name_ru')
  const name = nameEn || nameUz || nameTr || nameRu

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaTypeCategories) => {
      const photo =
        typeof data.photo === 'string' ? await getFileFromLink(data.photo) : (data.photo as File)

      const formData = new FormData()
      const names = defaultLanguages('name', {
        name_en: data.name_en,
        name_ru: data.name_ru,
        name_uz: data.name_uz,
        name_tr: data.name_tr,
      }) as Array<[string, string]>

      names.forEach(([key, value]) => {
        formData.append(key, value)
      })

      if (branches && branches?.length > 0) {
        branches.forEach(branch => {
          formData.append('branches', String(branch))
        })
      }

      formData.append('photo', photo)
      formData.append('is_active', 'true')
      formData.append('shop', String(user.shop))
      formData.append('parent', data.parent ?? '')
      formData.append('scroll_type', data.scroll_type)

      if (variant === 'edit') {
        return await updateCategory(formData, String(id))
      }
      if (variant === 'create') {
        return await createOrUpdateCategory(formData)
      }
      return await createCategory(formData)
    },
    onSuccess: res => {
      setFalse()
      toast.success(
        t(variant === 'edit' ? 'category_edited_successfully' : 'category_added_successfully'),
      )
      handleUpdate(res.data)
    },
  })

  const detail = useQuery({
    enabled: (variant === 'edit' && value) || variant === 'create',
    queryFn: async () => {
      if (variant === 'create') {
        return await getStepCategoryDetail()
      }
      return await getCategoryDetail(id)
    },
    queryKey: [REACT_QUERY_KEYS.CATEGORY_DETAIL, id, variant],
    onSuccess: res => {
      form.reset({
        photo: res.data.photo,
        name_en: res.data.name_en,
        name_ru: res.data.name_ru,
        name_uz: res.data.name_uz,
        name_tr: res.data.name_tr,
        parent: res.data?.parent?.id as unknown as string,
        scroll_type: res.data?.scroll_type,
      })
    },
  })

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

  const onSubmit = (data: SchemaTypeCategories) => {
    const language = languages.filter(value => {
      if (data[`name_${value}`] === '') {
        form.setError(`name_${value}`, { message: 'category_name_is_a_required_field' })
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

  const handleClearParent = () => {
    form.setValue('parent', '')
  }

  return {
    skip,
    form,
    PATH,
    name,
    value,
    panels,
    detail,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handlSkip,
    languages,
    handleClearParent,
    handleTranslateTitle,
    translateTitleLoading,
  }
}
