import { useForm } from 'react-hook-form'
import { useFormStore } from '@/store/form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import type { ErrorProps } from '@/types/error'
import { useMerchant } from '@/hooks/useMerchant'
import { schemaCityMerchant, schemaPaymentTypes } from '@/utils/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string, number, type InferType } from 'yup'

const schema = object()
  .shape({
    login: string().required('username_is_a_required_field'),
    password: string().required('password_is_a_required_field'),
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

export const useFormBts = () => {
  const open = useBoolean()
  const modal = useBoolean()
  const { t } = useTranslation()
  const setProductStockBoolean = useFormStore(state => state.setProductStockBoolean)
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: false }),
  })

  const { getMerchant, postMerchant, deleteMerchant } = useMerchant({
    service_type: 'BTS_DELIVERY',
    getOnSuccess: data => {
      form.reset({
        cities: data.cities,
        min_price: data.min_price,
        login: data.credentials?.login,
        password: data.credentials?.password,
        payment_types: data.payment_types ?? [],
      })
    },
  })

  const onSubmit = ({ login, password, ...data }: SchemaType) => {
    postMerchant.mutate(
      { ...data, credentials: { login, password } },
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
    t,
    open,
    form,
    modal,
    onSubmit,
    getMerchant,
    handleDelete,
    postMerchant,
    deleteMerchant,
  }
}
