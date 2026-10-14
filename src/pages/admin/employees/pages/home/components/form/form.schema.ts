import { passwordSchema } from '@/utils/schema'
import { ref, object, number, string, type InferType } from 'yup'

export const schema = object().shape({
  variant: string().oneOf(['add', 'edit']).notRequired().default('edit'),
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
  password: string()
    .notRequired()
    .default('')
    .when('variant', (value, schema) => {
      if (value[0] === 'add') {
        return passwordSchema
      }
      return schema
    }),
  confirm_password: string()
    .notRequired()
    .default('')
    .when('variant', (value, schema) => {
      if (value[0] === 'add') {
        return string()
          .required('please_re_type_your_password')
          .oneOf([ref('password')], 'passwords_does_not_match')
          .default('')
      }
      return schema
    }),
  role: number().required('role_is_a_required_field').default(null),
})

export type SchemaType = InferType<typeof schema>
