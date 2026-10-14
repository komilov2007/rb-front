import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import type { ParamProps } from '@/types/params'
import { useProfileStore } from '@/store/profile'
import { useProductStore } from '@/store/product'
import { extractKey, isVideo } from '@/utils/media'
import type { NameObjectProps } from '@/types/name'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSkipSignUp } from '@/hooks/useSkipSignUp'
import type { LanguageTypes } from '@/types/language'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { GroupsProps } from '@/types/product-online-shop'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { convertList1ToList2 } from '@/utils/product-online-shop'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { cenvertLanguages, defaultNameLanguages } from '@/utils/languages'
import { productOnlineShopSchema, type SchemaTypeProductOnlineShop } from '@/utils/schema'
import {
  createProductsOnlineShop,
  updateProductsOnlineShop,
  getDetailProductOnlineShop,
  getProductOnlineShopSingle,
  generateProductDescription,
} from '@/apis/admin/product'

type PanelsProps = Array<{
  label: string
  value: LanguageTypes
  descriptionLabel: string
  name: keyof Pick<SchemaTypeProductOnlineShop, 'name_uz' | 'name_ru' | 'name_en' | 'name_tr'>
  description: keyof Pick<
    SchemaTypeProductOnlineShop,
    'desc_uz' | 'desc_ru' | 'desc_en' | 'desc_tr'
  >
}>

export interface FormProductOnlineShopProps {
  handleUpdate?: () => void
  variant: 'edit' | 'add' | 'create'
}

export const useFormProductOnlineShop = (props: FormProductOnlineShopProps) => {
  const skip = useSkipSignUp()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const is_wolt = useProfileStore(state => state.me?.integrations.is_wolt)
  const isCreate = props.variant === 'create'
  const { productId } = useParams<ParamProps>()
  const topRef = useRef<HTMLDivElement | null>(null)

  const { language, languages, setTabLanguage } = useProfileStore(state => ({
    language: state.language,
    languages: state.me?.languages ?? [],
    setTabLanguage: state.setTabLanguage,
  }))

  const { groups, setGroup, setGroups } = useProductStore(state => ({
    groups: state.groups,
    setGroup: state.setGroup,
    setGroups: state.setGroups,
  }))

  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP

  const form = useForm<SchemaTypeProductOnlineShop>({
    mode: 'onChange',
    resolver: yupResolver(productOnlineShopSchema),
    defaultValues: productOnlineShopSchema.cast({}, { assert: false }),
  })

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

  useEffect(() => {
    form.setValue('is_wolt', !!is_wolt)
  }, [is_wolt, form])

  const handleClear = () => {
    setGroup('')
    setGroups([])
  }

  const handleBack = () => {
    handleClear()
    if (props.variant === 'create') {
      if (props?.handleUpdate) {
        props.handleUpdate()
      }
    } else {
      navigate(-1)
    }
  }

  const detail = useQuery({
    enabled: (props.variant === 'edit' && Boolean(productId)) || props.variant === 'create',
    queryFn: async () => {
      if (props.variant === 'create') {
        return await getProductOnlineShopSingle()
      }
      return await getDetailProductOnlineShop(String(productId))
    },
    queryKey: [REACT_QUERY_KEYS.PRODUCT_DETAIL, productId, props.variant],
    onSuccess: res => {
      if (Object.keys(res.data).length) {
        const tags = res.data.tags.map(tag => ({ tag }))
        const names = cenvertLanguages('name', res.data.title_translations)
        const images = res.data.image_keys
          .map(image => {
            const url = res.data.images.find(img => img.endsWith(image))
            return {
              image,
              url,
              isDelete: false,
            }
          })
          .filter(url => !isVideo(url.url as string))

        const video = res.data.images.find(img => isVideo(img))

        const descriptions = cenvertLanguages('desc', res.data.description_translations ?? {})
        const properties = res.data.properties.map(property => {
          const names = cenvertLanguages('name', property.name_translations)
          const descriptions = cenvertLanguages('text', property.value_translations)
          return { ...names, ...descriptions, isEdit: false }
        })

        const groups = res.data.variants.map(g => {
          const options = g.options.map((o, j) => {
            const name_translations = cenvertLanguages('name', o.name_translations)
            const value_translations = cenvertLanguages('name', o.value_translations)
            return {
              name_translations,
              value_translations,
              parentId: String(o.id),
              variantId: String(o.variant_id),
              generateId: j === g.options.length - 1 ? g.id : `${g.id}-${o.id}`,
            }
          })

          return {
            options,
            price: g.price,
            generateId: g.id,
            available: g.available,
            photo: extractKey(g.photo),
            parentId: String(g.options[0].id),
          }
        })

        const variants =
          res.data.variants.length > 0
            ? convertList1ToList2(groups as unknown as GroupsProps[])
            : []
        if (res.data.variants.length) {
          setGroup(groups[0].options[0].parentId)
          setGroups(groups as unknown as GroupsProps[])
        }

        form.reset({
          video,
          width: res.data?.stock?.width,
          height: res.data?.stock?.height,
          length: res.data?.stock?.length,
          weight: res.data?.stock?.weight,
          dimension_unit: res.data?.stock?.dimension_unit,
          isBeforeCreateVaraint: true,
          tags,
          images,
          variants,
          ...names,
          properties,
          ...descriptions,
          measure_id: res.data.measure_id,
          category_id: res.data.category_id,
          category_name: res.data.category_name,
          base_price: res.data.pricing.base_price,
          body_price:
            res.data.pricing.body_price === 0 || !res.data.pricing.body_price
              ? undefined
              : res.data.pricing.body_price,
          previous_price: res.data.pricing.previous_price,
          export_to_wolt: res.data.export_integrations.includes('WOLT'),
        })
      }
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
    mutationFn: async (data: SchemaTypeProductOnlineShop) => {
      const tags = data.tags.map(tag => tag.tag)
      const images = data.images.map(image => image.image)

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
      const description_translations = defaultNameLanguages(
        'desc',
        {
          desc_en: data.desc_en ?? '',
          desc_ru: data.desc_ru ?? '',
          desc_tr: data.desc_tr ?? '',
          desc_uz: data.desc_uz ?? '',
        },
        true,
      )

      const properties = data.properties.map(property => {
        const name_translations = defaultNameLanguages(
          'name',
          {
            name_en: property.name_en,
            name_ru: property.name_ru,
            name_uz: property.name_uz,
            name_tr: property.name_tr,
          },
          true,
        )
        const value_translations = defaultNameLanguages(
          'desc',
          {
            desc_en: property.text_en,
            desc_ru: property.text_ru,
            desc_tr: property.text_tr,
            desc_uz: property.text_uz,
          },
          true,
        )

        return { name_translations, value_translations }
      })

      const variants = groups.map(g => {
        const options = g.options.map(o => {
          const name_translations = defaultNameLanguages(
            'name',
            o.name_translations as NameObjectProps,
            true,
          )
          const value_translations = defaultNameLanguages(
            'name',
            o.value_translations as NameObjectProps,
            true,
          )

          return { name_translations, value_translations }
        })
        return {
          options,
          photo: g.photo,
          price: g.price,
          available: g.available,
        }
      })

      const values = {
        tags,
        images: data.video ? [...images, data.video] : images,
        variants,
        properties,
        is_active: true,
        title_translations,
        stock: {
          width: data.width,
          height: data.height,
          length: data.length,
          weight: data.weight,
          dimension_unit: data.dimension_unit,
        },
        description_translations,
        measure_id: data.measure_id,
        category_id: data.category_id,
        fiscal: {
          mxik_code: data.mxik_code ?? null,
          package_code: data.package_code ?? null,
        },
        pricing: {
          base_price: data.base_price,
          body_price: data.body_price ?? 0,
          previous_price: data.previous_price,
        },
        export_integrations: data.export_to_wolt ? ['WOLT'] : [],
      }
      if (props.variant === 'edit') {
        return await updateProductsOnlineShop(values, String(productId))
      }

      return await createProductsOnlineShop(values)
    },
    onSuccess: () => {
      handleBack()
      handleClear()
      setTabLanguage(language)
    },
  })

  const onSubmit = (data: SchemaTypeProductOnlineShop) => {
    const language = languages.filter(value => {
      if (data[`name_${value}`] === '') {
        form.setError(`name_${value}`, { message: 'product_name_is_a_required_field' })
        topRef.current?.scrollIntoView({ behavior: 'smooth' })
        return true
      }
      return false
    })

    if (language.length > 0) {
      setTabLanguage(language[0])
      return
    }

    mutate(data)
  }

  const handlSkip = () => {
    skip.mutate(6, {
      onSuccess: () => {
        if (props?.handleUpdate) {
          props.handleUpdate()
        }
      },
    })
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
    t,
    skip,
    form,
    PATH,
    name,
    desc,
    panels,
    detail,
    topRef,
    is_wolt,
    isCreate,
    onSubmit,
    isLoading,
    handlSkip,
    languages,
    handleBack,
    handleClear,
    handleTranslateTitle,
    translateTitleLoading,
    handleGenerateDescription,
    generateDescriptionLoading,
  }
}
