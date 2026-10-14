import { schemaProductByCategoryBanner } from '@/utils/schema'
import { bool, mixed, object, type InferType } from 'yup'

export const schema = object()
  .shape({
    have_url: bool().required().default(false),
    mobile_photo: mixed().test('required', 'you_need_to_provide_a_file', file => {
      if (file) return true
      return false
    }),
    desktop_photo: mixed().test('required', 'you_need_to_provide_a_file', file => {
      if (file) return true
      return false
    }),
  })
  .concat(schemaProductByCategoryBanner)

export type SchemaType = InferType<typeof schema>
