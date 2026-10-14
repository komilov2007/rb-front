import { object, number, type InferType } from 'yup'

export const schema = object().shape({
  vat_percent: number()
    .required('nds_percentage_is_a_required_field')
    .nullable()
    .min(0, 'nds_percentage_must_be_greater_than_or_equal_to_0')
    .max(99, 'nds_percentage_must_be_less_than_or_equal_to_99')
    .typeError('nds_percentage_must_be_a_number_type')
    .test(
      'noEOrSign',
      'invalid_nds_percentage',
      value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
    ),
  mxik_code: number()
    .required('mxik_code_is_a_required_field')
    .nullable()
    .typeError('mxik_code_must_be_a_number_type')
    .test(
      'noEOrSign',
      'invalid_mxik_code',
      value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
    ),
  package_code: number()
    .required('package_code_is_a_required_field')
    .nullable()
    .typeError('package_code_must_be_a_number_type')
    .test(
      'noEOrSign',
      'invalid_package_code',
      value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
    ),
  unit_code: number()
    .required('unit_code_is_a_required_field')
    .nullable()
    .typeError('unit_code_must_be_a_number_type')
    .test(
      'noEOrSign',
      'invalid_unit_code',
      value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
    ),
})

export type SchemaType = InferType<typeof schema>
