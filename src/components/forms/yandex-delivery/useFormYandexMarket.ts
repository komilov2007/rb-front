import { useForm } from 'react-hook-form'
import { useFormStore } from '@/store/form'
import { useBoolean } from '@/hooks/useBoolean'
import type { ErrorProps } from '@/types/error'
import { useMerchant } from '@/hooks/useMerchant'
import { schemaCityMerchant, schemaPaymentTypes } from '@/utils/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { boolean, number, object, string, type InferType } from 'yup'

const schema = object()
  .shape({
    taxi_class: string().required('taxi_class_is_a_required_field'),
    token: string().required('token_is_a_required_field'),
    door_to_door: boolean().default(false),
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

export const useFormYandexDelivery = () => {
  const open = useBoolean()
  const modal = useBoolean()
  const setProductStockBoolean = useFormStore(state => state.setProductStockBoolean)
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { getMerchant, postMerchant, deleteMerchant } = useMerchant({
    service_type: 'YANDEX_DELIVERY',
    getOnSuccess: data => {
      form.reset({
        cities: data.cities,
        min_price: data.min_price,
        token: data.credentials?.token,
        taxi_class: data.credentials?.taxi_class,
        door_to_door: data.credentials?.door_to_door ?? false,
        payment_types: data.payment_types ?? [],
      })
    },
  })

  const onSubmit = ({ token, taxi_class, door_to_door, ...data }: SchemaType) => {
    postMerchant.mutate(
      { ...data, credentials: { token, taxi_class, door_to_door } },
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
    onSubmit,
    getMerchant,
    handleDelete,
    postMerchant,
    deleteMerchant,
  }
}
