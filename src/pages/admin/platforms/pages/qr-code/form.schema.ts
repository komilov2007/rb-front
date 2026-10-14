import { mixed, number, object, string, type InferType } from 'yup'

export const schema = object().shape({
  logo: mixed()
    .nullable()
    .test('required', 'upload_category_image', file => {
      if (file) return true
      return false
    }),
  banner_size: string().required().default('A5'),
  background: string().required(),
  backgroundCustom: string()
    .default('#746FFA')
    .when('background', (value, schema) => {
      if (value[0] === 'custom') {
        return schema.required()
      }
      return schema
    }),
  qr: string().required(),
  qrCustom: string()
    .default('#1B2149')
    .when('qr', (value, schema) => {
      if (value[0] === 'custom') {
        return schema.required()
      }
      return schema
    }),
  primary_text: string()
    .max(16, 'primary_text_must_be_at_most_16_characters')
    .required('primary_text_is_a_required_field'),
  primary_text_size: number()
    .required()
    .typeError('must_be_a_number')
    .default(24)
    .test('number', 'max_size_is_24', val => {
      return val <= 24
    }),
  primary_text_color: string().required().default('#FFFFFF'),
  secondary_text: string()
    .max(50, 'secondary_text_must_be_at_most_16_characters')
    .required('secondary_text_is_a_required_field'),
  secondary_text_size: number()
    .typeError('must_be_a_number')
    .required()
    .default(8)
    .test('number', 'max_size_is_8', val => {
      return val <= 8
    }),
  secondary_text_color: string().required().default('#F0F0F0'),
  shop: string(),
})

export type SchemaType = InferType<typeof schema>
