import { object, string, boolean, type InferType } from 'yup'

export const schemaBito = object().shape({
  token: string().required('api_key_is_a_required_field'),
  price_type: string().required('price_type_is_required'),
  organization_id: string().required('organization_is_required'),
  employee_id: string().required('responsible_person_is_required'),
  is_debt: boolean(),
})

export type SchemaTypeBito = InferType<typeof schemaBito>
