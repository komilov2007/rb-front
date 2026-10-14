import { DELIVERIES } from '@/constants/delivery'
import { bool, object, string, number, type InferType } from 'yup'
import { branchesDeliverySchema, countryAndCitiesSchema, schemaPaymentTypes } from '@/utils/schema'

export const schema = object()
  .shape(
    {
      shipping_time: bool().default(false),
      delivery: string().oneOf(Object.keys(DELIVERIES)).required().default(''),
      is_free_threshold: bool().default(false),
      max_price: number()
        .transform((val, orig) => (orig === '' ? undefined : val))
        .nullable()
        .default(null)
        .when('is_free_threshold', (value, schema) => {
          if (value[0]) {
            return schema
              .typeError('price_must_be_a_number_type')
              .test(
                'noEOrSign',
                'invalid_price',
                value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
              )
              .required('price_is_a_required_field')
          }
          return schema
        }),
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
      price: number()
        .transform((val, orig) => (orig === '' ? undefined : val))
        .nullable()
        .default(null)
        .when('delivery', (value, schema) => {
          if (value[0] === DELIVERIES.FIXED.value) {
            return schema
              .typeError('price_must_be_a_number_type')
              .test(
                'noEOrSign',
                'invalid_price',
                value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
              )
              .required('price_is_a_required_field')
          }
          return schema
        }),
      inital_km_price: number()
        .nullable()
        .default(null)
        .transform((val, orig) => (orig === '' ? undefined : val))
        .when('delivery', (value, schema) => {
          if (value[0] === DELIVERIES.FLEXABLE.value) {
            return schema
              .typeError('')
              .test(
                'noEOrSign',
                'invalid_price',
                value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
              )
              .required('required_field')
          }
          return schema
        }),
      inital_km: number()
        .nullable()
        .default(null)
        .transform((val, orig) => (orig === '' ? undefined : val))
        .when('delivery', (value, schema) => {
          if (value[0] === DELIVERIES.FLEXABLE.value) {
            return schema
              .typeError('`number` type')
              .test(
                'noEOrSign',
                'invalid_km',
                value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
              )
              .required('required_field')
          }
          return schema.notRequired()
        }),
      every_km_price: number()
        .nullable()
        .default(null)
        .transform((val, orig) => (orig === '' ? undefined : val))
        .when('delivery', (value, schema) => {
          if (value[0] === DELIVERIES.FLEXABLE.value) {
            return schema
              .typeError('')
              .test(
                'noEOrSign',
                'invalid_every_km',
                value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
              )
              .required('required_field')
          }
          return schema.notRequired()
        }),
      text_uz: string()
        .required('text_is_a_required_field')
        .default('')
        .when(['text_ru', 'text_en', 'text_tr', 'delivery'], (values, schema) => {
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue || values[0] !== DELIVERIES.CUSTOM.value) {
            return schema.notRequired()
          }
          return schema
        }),
      text_ru: string()
        .required('text_is_a_required_field')
        .default('')
        .when(['text_uz', 'text_en', 'text_tr', 'delivery'], (values, schema) => {
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue || values[0] !== DELIVERIES.CUSTOM.value) {
            return schema.notRequired()
          }
          return schema
        }),
      text_en: string()
        .required('text_is_a_required_field')
        .default('')
        .when(['text_uz', 'text_ru', 'text_tr', 'delivery'], (values, schema) => {
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue || values[0] !== DELIVERIES.CUSTOM.value) {
            return schema.notRequired()
          }
          return schema
        }),
      text_tr: string()
        .required('text_is_a_required_field')
        .default('')
        .when(['text_uz', 'text_ru', 'text_en', 'delivery'], (values, schema) => {
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue || values[0] !== DELIVERIES.CUSTOM.value) {
            return schema.notRequired()
          }
          return schema
        }),
    },
    [
      ['text_ru', 'text_en'],
      ['text_uz', 'text_en'],
      ['text_uz', 'text_ru'],
      ['text_tr', 'text_ru'],
      ['text_tr', 'text_uz'],
      ['text_tr', 'text_en'],
    ],
  )
  .concat(branchesDeliverySchema)
  .concat(countryAndCitiesSchema)
  .concat(schemaPaymentTypes)

export type SchemaType = InferType<typeof schema>
