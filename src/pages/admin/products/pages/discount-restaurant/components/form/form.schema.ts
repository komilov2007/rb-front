import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { productsIdsSchema } from '@/utils/schema'
import { DISCOUNT_OPTIONS } from '@/constants/discount'
import { array, object, string, number, type InferType } from 'yup'

dayjs.extend(isToday)

export const schema = object()
  .shape({
    branches: array().of(number().notRequired().nullable().default(null)).default([]),
    type: string()
      .oneOf(Object.keys(DISCOUNT_OPTIONS))
      .required()
      .default(DISCOUNT_OPTIONS.PERCENT.value),
    name: string().required('name_is_a_required_field').default(''),
    percent: number()
      .nullable()
      .transform((val, orig) => (orig === '' ? undefined : val))
      .when(['type'], (value, schema) => {
        if (value[0] === DISCOUNT_OPTIONS.PERCENT.value) {
          return schema
            .min(1)
            .max(99, 'percent_must_be_less_than_or_equal_to_99')
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
        if (value[0] === DISCOUNT_OPTIONS.AMOUNT.value) {
          return schema
            .min(0, 'amount_must_be_greater_than_or_equal_to_0')
            .required('amount_is_a_required_field')
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
    date: string()
      .required('end_date_is_a_required_field')
      .test('is-greater', 'invalid_date', value => {
        return dayjs(value).isAfter(dayjs()) || dayjs(value).isToday()
      })
      .default(''),
    time: string().required('end_time_is_a_required_field').default(''),
  })
  .concat(productsIdsSchema)

export type SchemaType = InferType<typeof schema>
