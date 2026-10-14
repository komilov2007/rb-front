import { useForm } from 'react-hook-form'
import { useFormStore } from '@/store/form'
import { useBoolean } from '@/hooks/useBoolean'
import { type ErrorProps } from '@/types/error'
import { useMerchant } from '@/hooks/useMerchant'
import { schemaCityMerchant, schemaPaymentTypes } from '@/utils/schema'
import { object, number, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = object()
  .shape({
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

export const useRoboPochta = () => {
  const open = useBoolean()
  const modal = useBoolean()
  const setProductStockBoolean = useFormStore(state => state.setProductStockBoolean)
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { getMerchant, postMerchant, deleteMerchant } = useMerchant({
    service_type: 'TEZBOR_DELIVERY',
    getOnSuccess: data => {
      form.reset({
        cities: data.cities,
        min_price: data.min_price,
        payment_types: data.payment_types ?? [],
      })
    },
  })
  const hasToken = typeof getMerchant.data?.data?.min_price === 'number'

  const onSubmit = (data: SchemaType) => {
    postMerchant.mutate(data, {
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
    })
  }

  const handleDelete = () => {
    deleteMerchant.mutate()
  }

  return {
    open,
    form,
    modal,
    hasToken,
    onSubmit,
    getMerchant,
    postMerchant,
    handleDelete,
    deleteMerchant,
  }
}
