import { number, object, type InferType } from 'yup'

export const SUM_MAX = 100000000
export const SUM_MIN_DISTANCE = 1000
export const ASTATKA_MAX = 500
export const ASTATKA_MIN_DISTANCE = 1
export const MARJA_MAX = 100
export const MARJA_MIN_DISTANCE = 1

export const schema = object().shape({
  base_price_from: number()
    .transform((val, orig) => (orig === '' ? null : val))
    .typeError('')
    .nullable()
    .required('base_price_is_a_required_field')
    .test('noEOrSign', 'invalid_price', value => {
      if (value == null) {
        return true
      }
      return typeof value === 'number' && !/[eE+-]/.test(String(value))
    })
    .default(0),
  base_price_to: number()
    .transform((val, orig) => (orig === '' ? null : val))
    .typeError('')
    .nullable()
    .required('base_price_is_a_required_field')
    .test('noEOrSign', 'invalid_price', value => {
      if (value == null) {
        return true
      }
      return typeof value === 'number' && !/[eE+-]/.test(String(value))
    })
    .default(SUM_MAX),
  stock_amount_from: number()
    .transform((val, orig) => (orig === '' ? null : val))
    .typeError('')
    .nullable()
    .required('stock_amount_is_a_required_field')
    .test('noEOrSign', 'invalid_stock_amount', value => {
      if (value == null) {
        return true
      }
      return typeof value === 'number' && !/[eE+-]/.test(String(value))
    })
    .default(0),
  stock_amount_to: number()
    .transform((val, orig) => (orig === '' ? null : val))
    .typeError('')
    .nullable()
    .required('stock_amount_is_a_required_field')
    .test('noEOrSign', 'invalid_stock_amount', value => {
      if (value == null) {
        return true
      }
      return typeof value === 'number' && !/[eE+-]/.test(String(value))
    })
    .default(ASTATKA_MAX),
  margin_from: number()
    .transform((val, orig) => (orig === '' ? null : val))
    .typeError('')
    .nullable()
    .required('margin_is_a_required_field')
    .test('noEOrSign', 'invalid_margin', value => {
      if (value == null) {
        return true
      }
      return typeof value === 'number' && !/[eE+-]/.test(String(value))
    })
    .default(0),
  margin_to: number()
    .transform((val, orig) => (orig === '' ? null : val))
    .typeError('')
    .nullable()
    .required('margin_is_a_required_field')
    .test('noEOrSign', 'invalid_margin', value => {
      if (value == null) {
        return true
      }
      return typeof value === 'number' && !/[eE+-]/.test(String(value))
    })
    .default(MARJA_MAX),
})

export type SchemaType = InferType<typeof schema>
