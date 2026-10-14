import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { productsIdsSchemaOnlineSHop } from '@/utils/schema'
import { DISCOUNT_OPTIONS_ONLINE_SHOP } from '@/constants/discount'
import { object, string, number, type InferType } from 'yup'

dayjs.extend(isToday)

export const schema = object()
  .shape({
    min_order_value: number()
      .nullable()
      .transform((val, orig) => (orig === '' ? undefined : val)),
    discount_type: string()
      .oneOf(Object.keys(DISCOUNT_OPTIONS_ONLINE_SHOP))
      .required()
      .default(DISCOUNT_OPTIONS_ONLINE_SHOP.PERCENT.value),
    name: string().required('name_is_a_required_field').default(''),
    percent: number()
      .nullable()
      .transform((val, orig) => (orig === '' ? undefined : val))
      .when(['discount_type'], (value, schema) => {
        if (value[0] === DISCOUNT_OPTIONS_ONLINE_SHOP.PERCENT.value) {
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
      .when(['discount_type'], (value, schema) => {
        if (value[0] === DISCOUNT_OPTIONS_ONLINE_SHOP.FIXED.value) {
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
  .concat(productsIdsSchemaOnlineSHop)

export type SchemaType = InferType<typeof schema>
