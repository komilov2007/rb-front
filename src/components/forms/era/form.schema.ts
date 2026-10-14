import { object, string, type InferType } from 'yup'

export const schemaERA = object().shape({
  username: string().required(''),
  password: string().required(''),
  store_id: string().required(''),
})

export type SchemaTypeERA = InferType<typeof schemaERA>
