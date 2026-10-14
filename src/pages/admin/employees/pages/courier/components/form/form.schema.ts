import { object, string, type InferType } from 'yup'

export const schema = object().shape({
  firstname: string().required('first_name_is_a_required_field').default(''),
  phone: string()
    .required('phone_is_a_required_field')
    .test({
      name: 'min length',
      message: 'phone_is_invalid',
      test: val => {
        return !val.includes('_')
      },
    })
    .default(''),
})

export type SchemaType = InferType<typeof schema>
