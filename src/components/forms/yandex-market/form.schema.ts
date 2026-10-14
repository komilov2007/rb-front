import { object, string, type InferType } from 'yup'

export const schemaYandexMarket = object().shape({
  api_key: string().required('api_key_is_a_required_field'),
})

export type SchemaTypeYandexMarket = InferType<typeof schemaYandexMarket>
