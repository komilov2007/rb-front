import { getUser } from '@/utils/user'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { mixed, object, type InferType } from 'yup'
import { useTranslation } from 'react-i18next'
import { nameSchema } from '@/utils/schema'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { defaultLanguages } from '@/utils/languages'
import { type LanguageTypes } from '@/types/language'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { validateAtmosphereFile } from '../../constants'
import { useAtmosphereCache } from '../../useAtmosphereCache'
import { type AtmosphereCategoryProps } from '@/types/atmosphere'
import { createAtmosphereCategory, updateAtmosphereCategory } from '@/apis/admin/atmosphere'

const schema = object()
  .shape({
    image: mixed<File | string>()
      .nullable()
      .default(null)
      .test('file', function (value) {
        if (!(value instanceof File)) return true
        const error = validateAtmosphereFile(value)
        return error ? this.createError({ message: error }) : true
      }),
  })
  .concat(nameSchema('category_name_is_a_required_field'))

export type SchemaType = InferType<typeof schema>

type PanelsProps = Array<{
  label: string
  value: LanguageTypes
  name: 'name_uz' | 'name_ru' | 'name_en' | 'name_tr'
}>

export interface FormCategoryProps {
  variant: 'add' | 'edit'
  category?: AtmosphereCategoryProps
  onSuccess?: (category: AtmosphereCategoryProps) => void
}

export const useFormCategory = ({ variant, category, onSuccess }: FormCategoryProps) => {
  const user = getUser()
  const { t } = useTranslation()
  const { invalidate } = useAtmosphereCache()
  const { languages, setTabLanguage } = useProfileStore(state => ({
    languages: state.me?.languages ?? [],
    setTabLanguage: state.setTabLanguage,
  }))

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { value, setTrue, setFalse } = useBoolean(false, {
    onTrue: () => {
      form.reset(
        category
          ? {
              image: category.image,
              name_uz: category.name_uz ?? '',
              name_ru: category.name_ru ?? '',
              name_en: category.name_en ?? '',
              name_tr: category.name_tr ?? '',
            }
          : schema.cast({}, { assert: false }),
      )
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const formData = new FormData()
      const names = defaultLanguages('name', {
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
        name_tr: data.name_tr,
      }) as Array<[string, string]>

      names.forEach(([key, value]) => {
        formData.append(key, value ?? '')
      })

      if (data.image instanceof File) {
        formData.append('image', data.image)
      }

      if (variant === 'edit' && category) {
        return await updateAtmosphereCategory(formData, category.id)
      }

      formData.append('shop', String(user.shop))
      return await createAtmosphereCategory(formData)
    },
    onSuccess: async res => {
      toast.success(
        t(variant === 'edit' ? 'category_edited_successfully' : 'category_added_successfully'),
      )
      setFalse()
      await invalidate()
      onSuccess?.(res.data)
    },
  })

  const onSubmit = (data: SchemaType) => {
    const language = languages.filter(value => {
      if (!data[`name_${value}`]) {
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
    { value: 'uz', name: 'name_uz', label: `${t('category_name')} (O'zbek)` },
    { value: 'ru', name: 'name_ru', label: `${t('category_name')} (Pусский)` },
    { value: 'en', name: 'name_en', label: `${t('category_name')} (English)` },
    { value: 'tr', name: 'name_tr', label: `${t('category_name')} (Türkçe)` },
  ]

  return {
    form,
    value,
    panels,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
  }
}
