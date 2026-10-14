import { nameSchema } from '@/utils/schema'
import { BANNER_TYPE, LINK_TYPE } from '@/constants/banner'
import { number, object, string, type InferType } from 'yup'

export const schema = object()
  .shape({
    mobile_photo: string().required('you_need_to_provide_a_file'),
    desktop_photo: string()
      .nullable()
      .when('banner_type', (value, schema) => {
        if (value[0] === BANNER_TYPE.MAIN.value) {
          return schema.required('you_need_to_provide_a_file')
        }
        return schema
      }),
    banner_type: string().oneOf(Object.keys(BANNER_TYPE)),
    link_type: string().nullable().oneOf(Object.keys(LINK_TYPE)),
    category_id: number()
      .nullable()
      .when('link_type', (value, schema) => {
        if (value[0] === LINK_TYPE.CATEGORY.value) {
          return schema.required('category_is_a_required_field')
        }
        return schema
      }),
    product_id: string()
      .nullable()
      .when('link_type', (value, schema) => {
        if (value[0] === LINK_TYPE.PRODUCT.value) {
          return schema.required('product_is_a_required_field')
        }
        return schema
      }),
    button_name: object().nullable(),
    category_name: string().nullable(),
    product_name: string().nullable(),
  })
  .concat(nameSchema('button_name_is_a_required_field', false))

export type SchemaType = InferType<typeof schema>
