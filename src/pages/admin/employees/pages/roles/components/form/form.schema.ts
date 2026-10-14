import { bool, object, array, string, type InferType, number } from 'yup'

export const schema = object().shape({
  name: string().required('name_is_a_required_field').default(''),
  menu_permissions: array()
    .of(
      object().shape({
        menu: number().required(),
        name: string().required(),
        slug: string().required(),
        can_view: bool().required(),
        can_edit: bool().required(),
        can_delete: bool().required(),
      }),
    )
    .required()
    .default([]),
})

export type SchemaType = InferType<typeof schema>
