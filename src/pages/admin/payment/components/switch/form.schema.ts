import { object, string, type InferType, bool, number } from 'yup'
const markupSchema = number()
  .typeError('percent_is_a_required_field')
  .min(0, 'markup_must_be_between_0_and_100')
  .max(100, 'markup_must_be_between_0_and_100')
  .notRequired()
export const schema = object().shape({
  slug: string().notRequired(),
  is_active: bool().notRequired(),

  login: string()
    .trim()
    .notRequired()
    .when('slug', ([slug], schema) =>
      slug === 'variant' ? schema.required('phone_is_a_required_field') : schema,
    ),

  password: string()
    .notRequired()
    .when('slug', ([slug], schema) =>
      slug === 'variant' ? schema.required('required_field') : schema,
    ),

  minimal_amount: string()
    .notRequired()
    .when('slug', ([slug], schema) =>
      slug === 'variant' ? schema.required('amount_is_a_required_field') : schema,
    ),

  markup_3_months: markupSchema.when('slug', ([slug], schema) =>
    slug === 'variant' ? schema.required('markup_is_a_required_field') : schema,
  ),

  markup_6_months: markupSchema.when('slug', ([slug], schema) =>
    slug === 'variant' ? schema.required('markup_is_a_required_field') : schema,
  ),

  markup_9_months: markupSchema.when('slug', ([slug], schema) =>
    slug === 'variant' ? schema.required('markup_is_a_required_field') : schema,
  ),

  markup_12_months: markupSchema.when('slug', ([slug], schema) =>
    slug === 'variant' ? schema.required('markup_is_a_required_field') : schema,
  ),

  key: string()
    .notRequired()
    .when('slug', (value, schema) => {
      if (value[0] === 'payme') {
        return schema.required('key_is_a_required_field')
      }
      return schema
    }),

  token: string()
    .notRequired()
    .when('slug', (value, schema) => {
      if (value[0] === 'unversal' || value[0] === 'uzum-nasiya') {
        return schema.required('token_is_a_required_field')
      }
      return schema
    }),

  service_id: string()
    .notRequired()
    .when('slug', (value, schema) => {
      if (value[0] === 'click') {
        return schema.required('service_id_is_a_required_field')
      }
      return schema
    }),

  merchant_id: string()
    .notRequired()
    .when('slug', (value, schema) => {
      if (value[0] === 'payme' || value[0] === 'click') {
        return schema.required('merchant_id_is_a_required_field')
      }
      return schema
    }),

  merchant_user_id: string()
    .notRequired()
    .when('slug', (value, schema) => {
      if (value[0] === 'click_api' || value[0] === 'click_superapp') {
        return schema.required('merchant_user_id_is_a_required_field')
      }
      return schema
    }),

  secret_key: string()
    .notRequired()
    .when('slug', (value, schema) => {
      if (value[0] === 'click_api' || value[0] === 'click_superapp' || value[0] === 'stripe') {
        return schema.required('secret_key_required')
      }
      return schema
    }),

  self_fiscalization: bool(),
  natural: string(),
  tin_or_pinfl: string(),

  store_id: string()
    .notRequired()
    .when('slug', (value, schema) => {
      if (value[0] === 'robo_pay') {
        return schema.required('store_id_is_a_required_field')
      }
      return schema
    }),
})

export type SchemaType = InferType<typeof schema>
