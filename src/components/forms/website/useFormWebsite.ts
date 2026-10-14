import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ROUTER } from '@/constants/router'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSignUpStore } from '@/store/sign-up'
import { object, string, type InferType } from 'yup'
import { getTitle } from '@/constants/domain-themes'
import { yupResolver } from '@hookform/resolvers/yup'
import { DOMAINS, type DomainsTypeProps } from './constants'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getWebsiteDetail, createOrUpdateWebsite } from '@/apis/admin/sign-up'
import { WEBSITE_DOMAIN_REGEX, WEBSITE_SUB_DOMAIN_REGEX } from '@/constants/regex'
import { useProfileStore } from '@/store/profile'

const schema = object().shape({
  is_sub: string().oneOf(Object.keys(DOMAINS)).required().default(DOMAINS.NO.value),
  domain: string()
    .default('')
    .when('is_sub', (value, schema) => {
      if (value[0] === DOMAINS.YES.value) {
        return schema
          .matches(WEBSITE_DOMAIN_REGEX, 'domain_is_invalid')
          .required('domain_is_a_required_field')
      }
      return schema
    }),
  sub_domain: string()
    .default('')
    .when('is_sub', (value, schema) => {
      if (value[0] === DOMAINS.NO.value) {
        return schema
          .matches(WEBSITE_SUB_DOMAIN_REGEX, 'sub_domain_is_invalid')
          .required('sub_domain_is_a_required_field')
      }
      return schema
    }),
})

type SchemaType = InferType<typeof schema>

export interface FormWebsiteProps {
  noDelete?: boolean
  variant: 'auth' | 'admin'
}

export const useFormWebsite = (props: FormWebsiteProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const isNewVersion = useProfileStore(state => state.me?.is_new_version)
  const SUB_DOMAIN = isNewVersion ? getTitle().new_sub_domain : getTitle().sub_domain
  const isVariantAdmin = props.variant === 'admin'
  const { step, setStep } = useSignUpStore(state => ({ step: state.step, setStep: state.setStep }))
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const handleNextStep = () => {
    const newStep = step > 2 ? step : step + 1
    setStep(newStep)
    navigate(ROUTER.CREATE_SETTINGS)
  }
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const domain = data.is_sub === 'YES' ? data.domain : data.sub_domain
      return await createOrUpdateWebsite({
        domain,
        is_sub: DOMAINS[data.is_sub as DomainsTypeProps].is_sub,
      })
    },
    onSuccess: () => {
      toast.success(t('website_added_successfully'))
      if (isVariantAdmin) {
        void queryClient.invalidateQueries([REACT_QUERY_KEYS.WEBSITE_DETAIL])
        navigate(`${ROUTER.ADMIN}/${ROUTER.PLATFORMS}/${ROUTER.WEBSITE}`)
      } else {
        handleNextStep()
      }
    },
  })

  const detail = useQuery({
    queryFn: getWebsiteDetail,
    queryKey: [REACT_QUERY_KEYS.WEBSITE_DETAIL],
    onSuccess: res => {
      const value = res.data as unknown as string
      if (value !== '') {
        const values = {
          domain: res.data.is_sub ? '' : res.data.domain,
          sub_domain: res.data.is_sub ? res.data.domain : '',
          is_sub: res.data.is_sub ? DOMAINS.NO.value : DOMAINS.YES.value,
        }
        form.reset(values)
      }
    },
  })

  const onSubmit = (data: SchemaType) => {
    if (
      (detail.data?.data.domain === data.domain &&
        !detail.data?.data.is_sub &&
        data.is_sub === 'YES') ||
      (detail.data?.data.domain === data.sub_domain &&
        detail.data?.data.is_sub &&
        data.is_sub === 'NO')
    ) {
      if (!isVariantAdmin) {
        handleNextStep()
      }
    } else {
      mutate(data)
    }
  }

  return { form, detail, onSubmit, isLoading, SUB_DOMAIN, isVariantAdmin }
}
