import { useForm } from 'react-hook-form'
import { useFormStore } from '@/store/form'
import { useBoolean } from '@/hooks/useBoolean'
import type { ErrorProps } from '@/types/error'
import { useMerchant } from '@/hooks/useMerchant'
import { schemaCityMerchant, schemaPaymentTypes } from '@/utils/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { bool, number, object, string, type InferType } from 'yup'

const schema = object()
  .shape({
    pre_order_enabled: bool().default(false),
    token: string().required('token_is_a_required_field'),
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

export const useFormNoorDelivery = () => {
  const open = useBoolean()
  const modal = useBoolean()
  const setProductStockBoolean = useFormStore(state => state.setProductStockBoolean)
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { getMerchant, postMerchant, deleteMerchant } = useMerchant({
    service_type: 'NOOR_DELIVERY',
    getOnSuccess: data => {
      form.reset({
        cities: data.cities,
        min_price: data.min_price,
        token: data.credentials?.token,
        pre_order_enabled: data.pre_order_enabled,
        payment_types: data.payment_types ?? [],
      })
    },
  })
  const hasToken = !!getMerchant.data?.data?.credentials?.token

  const onSubmit = ({ token, ...data }: SchemaType) => {
    postMerchant.mutate(
      { ...data, credentials: { token } },
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

  const handleDelete = () => {
    deleteMerchant.mutate()
  }

  return {
    form,
    open,
    modal,
    hasToken,
    onSubmit,
    getMerchant,
    handleDelete,
    postMerchant,
    deleteMerchant,
  }
}
