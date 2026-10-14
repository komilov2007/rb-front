import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getUser, setUser } from '@/utils/user'
import { useBoolean } from '@/hooks/useBoolean'
import { useSignUpStore } from '@/store/sign-up'
import { object, string, number, type InferType, boolean } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { PLATFORMS, BUSINESS_TYPES } from '@/constants/busniness'
import {
  getShopDetails,
  createAndUpdateShop,
  getShopCountryList,
  getShopCategoryList,
} from '@/apis/admin/shop'

const defaultValue = 99999
const schema = object().shape({
  name: string().required('company_name_is_a_required_field').default(''),
  business_type: string().oneOf(Object.keys(BUSINESS_TYPES)).required().default(''),
  platforms: string().oneOf(Object.keys(PLATFORMS)).required().default(PLATFORMS.TELEGRAM.value),
  country: number()
    .nullable()
    .transform((val, original) =>
      original === '' || original == null ? undefined : Number(original),
    ),
  business_category: number().nullable(),
  category_name: string()
    .nullable()
    .when('business_category', (value, schema) => {
      if (value[0] === defaultValue) {
        return string().required('category_name_is_a_required_field')
      }
      return schema
    }),
  other_category: boolean().nullable(),
})

type SchemaType = InferType<typeof schema>

export interface FormShopProps {
  variant: 'auth' | 'admin'
}

export const useFormShop = (props: FormShopProps) => {
  const user = getUser()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const isVariantAdmin = props.variant === 'admin'
  const { setStep } = useSignUpStore(state => ({
    setStep: state.setStep,
  }))
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })
  const defaultOtherValue = {
    label: t('other'),
    value: defaultValue,
  }

  const businessType = form.watch('business_type')
  const businessCategory = form.watch('business_category')
  const otherValue = businessCategory === defaultOtherValue.value

  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      form.reset(schema.cast({}))
    },
  })

  const { isLoading: isLoadingDetail, isFetching: isFetchingDetail } = useQuery({
    enabled: !!user.shop && !isVariantAdmin,
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.SHOP_DETAILS],
    queryFn: getShopDetails,
    onSuccess: res => {
      form.reset({ ...res.data, platforms: res.data.platforms[0] })
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) =>
      await createAndUpdateShop(data, props.variant === 'admin'),
    onSuccess: res => {
      toast.success(t('the_action_has_successfully_been_completed'))
      setUser({
        ...user,
        shop: res.data.id,
        business_type: res.data.business_type,
        access: res.data?.access_token,
        refresh: res.data?.refresh_token,
      })
      setStep(2)
      navigate(
        res.data.platforms === 'WEBSITE'
          ? ROUTER.CREATE_WEBSITE_SIGN_UP
          : ROUTER.CREATE_BOT_SIGN_UP,
      )
    },
  })

  const { data: countryList = { data: [] }, isLoading: countryLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.SHOP_COUNTRY_LIST],
    queryFn: getShopCountryList,
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))

      data.push(defaultOtherValue)

      return { ...res, data }
    },
  })

  const { data: categoryList = { data: [] }, isLoading: categoryLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.SHOP_CATEGORY_LIST, businessType],
    queryFn: async () => await getShopCategoryList({ business_type: businessType }),
    select: res => {
      const data = res.data.map(c => ({ label: c.name, value: c.id }))

      data.push(defaultOtherValue)

      return { ...res, data }
    },
  })

  const onSubmit = (data: SchemaType) => {
    const values = { ...data, other_category: otherValue }

    if (otherValue) {
      delete values.business_category
    }
    if (values.country === defaultValue) {
      delete values.country
    }

    mutate(values)
  }

  return {
    user,
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    isVariantAdmin,
    isLoadingDetail,
    isFetchingDetail,
    countryList,
    categoryList,
    businessType,
    categoryLoading,
    countryLoading,
    otherValue,
  }
}
