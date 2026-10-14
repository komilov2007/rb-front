import { object, string, type InferType } from 'yup'

const startTextSchema = object().shape(
  {
    start_text_uz: string()
      .required('Start text is a required field')
      .default('')
      .when(['start_text_ru', 'start_text_en', 'start_text_tr'], (values, schema) => {
        const hasSomeValue = values.some(v => v && v.length > 0)
        if (hasSomeValue) {
          return schema.notRequired()
        }
        return schema
      }),
    start_text_ru: string()
      .required('Start text is a required field')
      .default('')
      .when(['start_text_uz', 'start_text_en', 'start_text_tr'], (values, schema) => {
        const hasSomeValue = values.some(v => v && v.length > 0)
        if (hasSomeValue) {
          return schema.notRequired()
        }
        return schema
      }),
    start_text_en: string()
      .required('Start text is a required field')
      .default('')
      .when(['start_text_uz', 'start_text_ru', 'start_text_tr'], (values, schema) => {
        const hasSomeValue = values.some(v => v && v.length > 0)
        if (hasSomeValue) {
          return schema.notRequired()
        }
        return schema
      }),
    start_text_tr: string()
      .required('Start text is a required field')
      .default('')
      .when(['start_text_uz', 'start_text_ru', 'start_text_en'], (values, schema) => {
        const hasSomeValue = values.some(v => v && v.length > 0)
        if (hasSomeValue) {
          return schema.notRequired()
        }
        return schema
      }),
  },
  [
    ['start_text_ru', 'start_text_en'],
    ['start_text_uz', 'start_text_en'],
    ['start_text_uz', 'start_text_ru'],
    ['start_text_tr', 'start_text_uz'],
    ['start_text_tr', 'start_text_ru'],
    ['start_text_tr', 'start_text_en'],
  ],
)

const extraInfoSchema = object().shape(
  {
    button_uz: string()
      .required('Button name is a required field')
      .default('')
      .when(['button_ru', 'button_en', 'button_tr'], (values, schema) => {
        const hasSomeValue = values.some(v => v && v.length > 0)
        if (hasSomeValue) {
          return schema.notRequired()
        }
        return schema
      }),
    button_ru: string()
      .required('Button name is a required field')
      .default('')
      .when(['button_uz', 'button_en', 'button_tr'], (values, schema) => {
        const hasSomeValue = values.some(v => v && v.length > 0)
        if (hasSomeValue) {
          return schema.notRequired()
        }
        return schema
      }),
    button_en: string()
      .required('Button name is a required field')
      .default('')
      .when(['button_uz', 'button_ru', 'button_tr'], (values, schema) => {
        const hasSomeValue = values.some(v => v && v.length > 0)
        if (hasSomeValue) {
          return schema.notRequired()
        }
        return schema
      }),
    button_tr: string()
      .required('Button name is a required field')
      .default('')
      .when(['button_uz', 'button_ru', 'button_en'], (values, schema) => {
        const hasSomeValue = values.some(v => v && v.length > 0)
        if (hasSomeValue) {
          return schema.notRequired()
        }
        return schema
      }),
  },
  [
    ['button_ru', 'button_en'],
    ['button_uz', 'button_en'],
    ['button_uz', 'button_ru'],
    ['button_tr', 'button_uz'],
    ['button_tr', 'button_ru'],
    ['button_tr', 'button_en'],
  ],
)

export const schema = object().concat(startTextSchema).concat(extraInfoSchema)

export type SchemaType = InferType<typeof schema>
