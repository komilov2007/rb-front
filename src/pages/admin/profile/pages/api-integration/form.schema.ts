import { object, string, type InferType } from 'yup'

export const schema = object().shape({
  name: string().required('this_field_is_required').default(''),
})

export type SchemaType = InferType<typeof schema>
