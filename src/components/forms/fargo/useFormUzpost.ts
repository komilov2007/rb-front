import { useForm } from 'react-hook-form'
import { useFormStore } from '@/store/form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import type { ErrorProps } from '@/types/error'
import { useProfileStore } from '@/store/profile'
import { useMerchant } from '@/hooks/useMerchant'
import { schemaCityMerchant, schemaPaymentTypes } from '@/utils/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { number, object, string, type InferType } from 'yup'

const schema = object()
  .shape({
    username: string().required('username_is_required_field'),
    password: string().required('password_is_required_field'),
    min_price: number()
      .transform((val, orig) => (orig === '' ? null : val))
      .nullable()
      .typeError('price_must_be_a_number_type')
      .test('noEOrSign', 'invalid_price', value => {
        if (value == null) {
          return true
        }
        return typeof value === 'number' && !/[eE+-]/.test(String(value))
      })
      .default(null),
  })
  .concat(schemaCityMerchant)
  .concat(schemaPaymentTypes)

type SchemaType = InferType<typeof schema>

export const useFormUzpost = () => {
  const open = useBoolean()
  const modal = useBoolean()
  const { t } = useTranslation()
  const setProductStockBoolean = useFormStore(state => state.setProductStockBoolean)
  const { is_free, is_expired, is_basic, setSubscriptionModal } = useProfileStore(state => ({
    is_free: state.me?.subscription.is_free,
    is_basic: state.me?.subscription.is_basic,
    is_expired: state.me?.subscription.is_expired,
    setSubscriptionModal: state.setSubscriptionModal,
  }))

  const hasAccess = (is_basic || is_expired) && !is_free

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { getMerchant, postMerchant, deleteMerchant } = useMerchant({
    service_type: 'FARGO_DELIVERY',
    getOnSuccess: data => {
      form.reset({
        cities: data.cities,
        min_price: data?.min_price,
        username: data?.credentials?.username,
        password: data?.credentials?.password,
        payment_types: data.payment_types ?? [],
      })
    },
  })
  const hasToken = typeof getMerchant.data?.data?.min_price === 'number'

  const onSubmit = ({ username, password, ...data }: SchemaType) => {
    postMerchant.mutate(
      { ...data, credentials: { username, password } },
      {
        onSuccess: () => {
          modal.setFalse()
          open.setFalse()
        },
        onError: err => {
          const error = err as unknown as ErrorProps
          if (error?.response?.data?.code === '010') {
            setProductStockBoolean(true)()
          }
        },
      },
    )
  }

  const handleOpen = () => {
    const canOpen = !hasAccess

    if (canOpen) {
      modal.setTrue()
    } else {
      setSubscriptionModal(true, {
        title: 'This_integration_is_available_only_on_Basic_and_Pro_plans',
        value: 'FARGO',
        description:
          'please_upgrade_to_Basic_or_Pro_and_unlock_full_access_to_platform_features_that_boost_your_business_efficiency',
      })
    }
  }

  const handleDelete = () => {
    deleteMerchant.mutate()
  }

  return {
    t,
    open,
    form,
    modal,
    hasToken,
    onSubmit,
    handleOpen,
    getMerchant,
    handleDelete,
    postMerchant,
    deleteMerchant,
  }
}
