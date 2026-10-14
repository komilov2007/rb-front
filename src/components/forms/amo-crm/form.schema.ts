import { object, string, type InferType } from 'yup'

export const schemaAmoCRM = object().shape({
  token: string().required('token_is_a_required_field'),
  subdomain: string().required('sub_domain_is_a_required_field'),
})

export type SchemaTypeAmoCRM = InferType<typeof schemaAmoCRM>
