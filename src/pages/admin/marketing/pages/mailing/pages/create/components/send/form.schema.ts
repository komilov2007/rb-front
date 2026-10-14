import { SEND_TIME_OPTIONS } from './constants'
import { object, string, type InferType } from 'yup'

export const schema = object().shape({
  type: string()
    .oneOf(Object.keys(SEND_TIME_OPTIONS))
    .required()
    .default(SEND_TIME_OPTIONS.NOW.value),
  date: string()
    .default('')
    .when('type', (value, schema) => {
      if (value[0] === SEND_TIME_OPTIONS.CUSTOM.value) {
        return schema.required('End date is a required field')
      }
      return schema
    }),
  time: string()
    .default('')
    .when('type', (value, schema) => {
      if (value[0] === SEND_TIME_OPTIONS.CUSTOM.value) {
        return schema.required('End time is a required field')
      }
      return schema
    }),
})

export type SchemaType = InferType<typeof schema>
