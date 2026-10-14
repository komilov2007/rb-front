import { PROMO_CODE_OPTIONS } from '@/constants/promo-code'
import { bool, object, string, number, type InferType } from 'yup'

export const schema = object().shape({
  type: string()
    .oneOf(Object.keys(PROMO_CODE_OPTIONS))
    .required()
    .default(PROMO_CODE_OPTIONS.PERCENT.value),
  code: string().required('code_is_a_required_field').default(''),
  first_order: bool().required().default(false),
  limit: number()
    .min(0)
    .default(null)
    .nullable()
    .typeError('limit_must_be_a_number_type')
    .transform((val, orig) => {
      return orig === '' ? 0 : val
    })
    .test('noEOrSign', 'invalid_limit', value => {
      if (typeof value === 'object') {
        return true
      }
      return typeof value === 'number' && !/[eE+-]/.test(String(value))
    }),
  percent: number()
    .nullable()
    .transform((val, orig) => (orig === '' ? undefined : val))
    .when(['type'], (value, schema) => {
      if (value[0] === PROMO_CODE_OPTIONS.PERCENT.value) {
        return schema
          .min(0)
          .max(100)
          .required('percent_is_a_required_field')
          .default(null)
          .typeError('percent_must_be_a_number_type')
          .test(
            'noEOrSign',
            'invalid_percent',
            value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
          )
      }
      return schema
    }),
  amount: number()
    .nullable()
    .transform((val, orig) => (orig === '' ? undefined : val))
    .when(['type'], (value, schema) => {
      if (value[0] === PROMO_CODE_OPTIONS.AMOUNT.value) {
        return schema
          .min(0)
          .required()
          .default(null)
          .typeError('amount_must_be_a_number_type')
          .test(
            'noEOrSign',
            'invalid_amount',
            value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
          )
      }
      return schema
    }),
  min_amount: number()
    .min(0)
    .default(null)
    .nullable()
    .typeError('min_amount_must_be_a_number_type')
    .transform((val, orig) => {
      return orig === '' ? 0 : val
    })
    .test('noEOrSign', 'invalid_min_amount', value => {
      if (typeof value === 'object') {
        return true
      }
      return typeof value === 'number' && !/[eE+-]/.test(String(value))
    }),
  end_date: string().required('end_date_is_a_required_field').default(''),
  end_time: string().required('end_time_is_a_required_field').default(''),
})

export type SchemaType = InferType<typeof schema>
