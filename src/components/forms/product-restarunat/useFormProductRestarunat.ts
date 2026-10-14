import { useRef } from 'react'
import { getUser } from '@/utils/user'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import { defaultLanguages } from '@/utils/languages'
import { useSkipSignUp } from '@/hooks/useSkipSignUp'
import { yupResolver } from '@hookform/resolvers/yup'
import { MEDIA_CORS_SERVIRES } from '@/constants/media'
import { getFileFromLink } from '@/utils/get-file-from-link'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { productSchema, type SchemaTypeProduct } from '@/utils/schema'
import {
  type SkusProps,
  type PanelsProps,
  type ParameterProps,
  type FormProductProps,
} from './type'
import {
  updateProduct,
  createProduct,
  getDetailProduct,
  getProductSignUp,
  createOrUpdateProduct,
  generateProductDescription,
} from '@/apis/admin/product'

export const useFormProductRestarunat = ({
  id,
  variant,
  count = 0,
  categoryId,
  handleUpdate,
}: FormProductProps) => {
  const user = getUser()
  const skip = useSkipSignUp()
  const languageRadioRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { branches, languages, subscription, setTabLanguage, is_yandex_eats_integrated } =
    useProfileStore(state => ({
      subscription: state.me?.subscription,
      languages: state.me?.languages ?? [],
      setTabLanguage: state.setTabLanguage,
      branches: state.branches.map(b => b.value),
      is_yandex_eats_integrated: state.globalSettings?.is_yandex_eats_integrated,
    }))

  const { tariff } = subscription || {}
  const canOpen =
    (tariff === 'START' && count < 500) || (tariff === 'BASIC' && count < 3000) || tariff === 'PRO'
  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP

  const defaultValues = categoryId
    ? { ...productSchema.cast({ branches }, { assert: false }), category: Number(categoryId) }
    : productSchema.cast({ branches }, { assert: false })

  const form = useForm<SchemaTypeProduct>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(productSchema),
    context: { is_yandex_eats_integrated },
  })

  const onTrigger = async () => {
    const valid = await form.trigger()
    if (!valid) {
      if (form.formState.errors.images) {
        if (languageRadioRef.current) {
          languageRadioRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(defaultValues)
    },
  })

  const handlSkip = () => {
    skip.mutate(6, {
      onSuccess: () => {
        handleUpdate()
      },
    })
  }

  const nameEn = form.watch('name_en')
  const nameUz = form.watch('name_uz')
  const nameTr = form.watch('name_tr')
  const nameRu = form.watch('name_ru')
  const name = nameEn || nameUz || nameTr || nameRu

  const descEn = form.watch('desc_en')
  const descUz = form.watch('desc_uz')
  const descTr = form.watch('desc_tr')
  const descRu = form.watch('desc_ru')
  const desc = descEn || descUz || descTr || descRu

  const { isLoading: isLoadingDetail, isFetching: isFetchingDetail } = useQuery({
    enabled: value && variant === 'edit',
    queryKey: [REACT_QUERY_KEYS.PRODUCT_DETAIL, id],
    queryFn: async () => await getDetailProduct(Number(id)),
    onSuccess: res => {
      const { unit, photos, category, parameter, additional_parameter, ...rest } = res.data
      const images = photos.map((p: { photo: string }) => ({ image: p.photo }))
      const newData = {
        ...rest,
        images,
        unit: unit?.id,
        category: category?.id,
        additional_parameter: additional_parameter?.map((p: ParameterProps) => ({
          ...p,
          skus: p.skus?.map(({ unit, ...s }) => ({ ...s, unit_id: unit.id })),
        })),
        parameter: parameter && [
          {
            ...parameter,
            skus: parameter.skus.map(({ unit, ...s }: SkusProps) => ({ ...s, unit_id: unit.id })),
          },
        ],
      }
      form.reset(newData)
    },
  })

  const { mutate: generateDescription, isLoading: generateDescriptionLoading } = useMutation({
    mutationFn: async (data: { name: string; description: string | undefined }) => {
      return await generateProductDescription(data)
    },
    onSuccess: res => {
      form.setValue('desc_en', res.data?.en)
      form.setValue('desc_uz', res.data?.uz)
      form.setValue('desc_ru', res.data?.ru)
      form.setValue('desc_tr', res.data?.tr)
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

  const handleGenerateDescription = () => {
    const descriptionText = desc?.replace(/<[^>]+>/g, '')
    generateDescription({ name, description: descriptionText })
  }

  const handleTranslateTitle = () => {
    translateTitle({ name, is_translation: true })
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      price,
      unit,
      images = [],
      category,
      branches,
      ...data
    }: SchemaTypeProduct) => {
      const formData = new FormData()
      formData.append('price', String(price))
      formData.append('unit', unit)
      if (category) {
        formData.append('category', String(category))
      }
      formData.append('shop', String(user.shop))

      const listImages = images.filter(({ image }) =>
        typeof image === 'string'
          ? MEDIA_CORS_SERVIRES.filter(s => String(image).startsWith(s)).length === 0
          : image,
      )

      const photos = await Promise.all([
        ...listImages.map(async ({ image }) =>
          typeof image === 'string' ? await getFileFromLink(image) : image,
        ),
      ])

      if (photos && photos?.length > 0) {
        photos.forEach((photo, index) => {
          formData.append('images[' + index + ']', photo as string)
        })
      }

      const names = defaultLanguages('name', {
        name_en: data.name_en,
        name_ru: data.name_ru,
        name_uz: data.name_uz,
        name_tr: data.name_tr,
      }) as Array<[string, string]>
      const descriptions = defaultLanguages('desc', {
        desc_en: data.desc_en ?? '',
        desc_ru: data.desc_ru ?? '',
        desc_uz: data.desc_uz ?? '',
        desc_tr: data.desc_tr ?? '',
      }) as Array<[string, string]>

      names.forEach(([key, value]) => {
        formData.append(key, value)
      })

      if (branches && branches?.length > 0) {
        branches.forEach(branch => {
          formData.append('branches', String(branch))
        })
      }

      descriptions.forEach(([key, value]) => {
        if (value.length > 0) {
          formData.append(key, value)
        }
      })
      if (data.parameter.length > 0) {
        const parameter = data.parameter.map(p => {
          const names = defaultLanguages(
            'name',
            {
              name_en: p.name_en,
              name_ru: p.name_ru,
              name_uz: p.name_uz,
              name_tr: p.name_tr,
            },
            true,
          )
          const skus = p.skus.map(s => {
            const names = defaultLanguages(
              'name',
              {
                name_en: s.name_en,
                name_ru: s.name_ru,
                name_uz: s.name_uz,
                name_tr: s.name_tr,
              },
              true,
            )
            return { ...s, ...names }
          })
          return { ...names, skus }
        })[0]
        formData.append('parameter', JSON.stringify(parameter))
      }

      if (data.additional_parameter.length > 0) {
        const additional_parameter = data.additional_parameter.map(({ type, ...a }) => {
          const names = defaultLanguages(
            'name',
            {
              name_en: a.name_en,
              name_ru: a.name_ru,
              name_uz: a.name_uz,
              name_tr: a.name_tr,
            },
            true,
          )
          const skus = a.skus.map(s => {
            const names = defaultLanguages(
              'name',
              {
                name_en: s.name_en,
                name_ru: s.name_ru,
                name_uz: s.name_uz,
                name_tr: s.name_tr,
              },
              true,
            )
            return { ...s, ...names }
          })

          return { ...names, skus, type }
        })
        formData.append('additional_parameter', JSON.stringify(additional_parameter))
      }

      if (variant === 'edit') {
        return await updateProduct(formData, String(id))
      }
      if (variant === 'create') {
        return await createOrUpdateProduct(formData)
      }
      return await createProduct(formData)
    },
    onSuccess: res => {
      toast.success(
        t(variant === 'edit' ? 'product_edited_successfully' : 'product_added_successfully'),
      )
      setFalse()
      handleUpdate(res.data)
    },
  })

  const detail = useQuery({
    queryFn: getProductSignUp,
    enabled: variant === 'create',
    queryKey: [REACT_QUERY_KEYS.SIGN_UP_PRODUCT_STEP],
    onSuccess: res => {
      if (res.data !== '') {
        const { unit, photos, category, parameter, additional_parameter, ...rest } = res.data
        const images = photos.map((p: { photo: string }) => ({ image: p.photo }))
        const newData = {
          ...rest,
          images,
          unit: unit.id,
          category: category?.id,
          additional_parameter: additional_parameter?.map((p: ParameterProps) => ({
            ...p,
            skus: p.skus.map(({ unit, ...s }) => ({ ...s, unit_id: unit.id })),
          })),
          parameter: parameter && [
            {
              ...parameter,
              skus: parameter.skus.map(({ unit, ...s }: SkusProps) => ({ ...s, unit_id: unit.id })),
            },
          ],
        }
        form.reset(newData)
      }
    },
  })

  const onSubmit = (data: SchemaTypeProduct) => {
    const language = languages.filter(value => {
      if (data[`name_${value}`] === '') {
        form.setError(`name_${value}`, { message: 'product_name_is_a_required_field' })
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
      label: `${t('product_name')} (O'zbek)`,
      description: 'desc_uz',
      descriptionLabel: `${t('description')} (O'zbek)`,
    },
    {
      value: 'ru',
      name: 'name_ru',
      label: `${t('product_name')} (Pусский)`,
      description: 'desc_ru',
      descriptionLabel: `${t('description')} (Pусский)`,
    },
    {
      value: 'en',
      name: 'name_en',
      label: `${t('product_name')} (English)`,
      description: 'desc_en',
      descriptionLabel: `${t('description')} (English)`,
    },
    {
      value: 'tr',
      name: 'name_tr',
      label: `${t('product_name')} (Türkçe)`,
      description: 'desc_tr',
      descriptionLabel: `${t('description')} (Türkçe)`,
    },
  ]

  return {
    skip,
    form,
    PATH,
    name,
    desc,
    value,
    panels,
    detail,
    tariff,
    setTrue,
    canOpen,
    setFalse,
    onSubmit,
    isLoading,
    handlSkip,
    languages,
    onTrigger,
    isLoadingDetail,
    isFetchingDetail,
    languageRadioRef,
    handleTranslateTitle,
    translateTitleLoading,
    is_yandex_eats_integrated,
    handleGenerateDescription,
    generateDescriptionLoading,
  }
}
