import { object, string, type InferType } from 'yup'

export const schemaDizgo = object().shape({
  username: string(),
  password: string(),
})

export type SchemaTypeDizgo = InferType<typeof schemaDizgo>
