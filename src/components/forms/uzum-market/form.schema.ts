import { object, string, type InferType } from 'yup'

export const schemaUzumMarket = object().shape({
  key: string().required('api_key_is_a_required_field'),
})

export type SchemaTypeUzumMarket = InferType<typeof schemaUzumMarket>
