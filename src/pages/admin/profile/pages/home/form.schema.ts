import { validateEmail } from '@/utils/schema'
import { bool, mixed, object, string, type InferType } from 'yup'

export const schema = object().shape({
  firstname: string().required('username_is_a_required_field'),
  phone: string()
    .test({
      name: 'min length',
      test: val => {
        if (val && val.length > 0) {
          return !val.includes('_')
        }

        return true
      },
    })
    .default(''),
  email: string().test('email', 'email_is_invalid', value => {
    if (value && value?.length > 0) {
      return validateEmail(value)
    }
    return true
  }),
  isVerify: bool().default(false),
  code: string()
    .notRequired()
    .default('')
    .when('isVerify', (value, schema) => {
      if (value[0]) {
        return schema.min(4).required()
      }
      return schema
    }),
  photo: mixed().nullable(),
})

export type SchemaType = InferType<typeof schema>
