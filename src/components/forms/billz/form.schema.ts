import { BILLZ_VERSIONS } from '@/constants/billz'
import { bool, object, string, type InferType } from 'yup'

export const schema = object().shape({
  have_photo: bool().default(true),
  version: string().required().default(BILLZ_VERSIONS.v2.value),
  username: string()
    .nullable()
    .when('version', (value, schema) => {
      if (value[0] === BILLZ_VERSIONS.v1.value) {
        return schema.required('username_is_a_required_field')
      }
      return schema
    }),
  secret_token: string().required('secret_token_is_a_required_field').nullable().default(''),
  price_type: string().required('price_type_is_a_required_field'),
})

export type SchemaType = InferType<typeof schema>
