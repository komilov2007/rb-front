import { string, array, object, number, type InferType, bool } from 'yup'

export const schema = object().shape({
  hasParameter: bool(),
  parameter: number().when('hasParameter', (value, schema) => {
    if (value[0]) {
      return schema.required()
    }
    return schema
  }),
  single: array().of(
    object().shape({
      name: string(),
      value: string().required(),
      skus: array(
        object().shape({
          id: number(),
          name: string(),
          price: string().required(),
        }),
      ).required(),
    }),
  ),
  multiple: array(
    object().shape({
      name: string(),
      skus: array(
        object().shape({
          id: number(),
          check: bool(),
          name: string(),
          price: string().required(),
        }),
      ).required(),
    }),
  ),
})

export type SchemaType = InferType<typeof schema>
