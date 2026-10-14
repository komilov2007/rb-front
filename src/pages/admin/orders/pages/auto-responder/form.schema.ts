import { object, string, type InferType } from 'yup'

const acceptSchema = object().shape({
  accept_uz: string().required('description_is_a_required_field').default(''),
  accept_ru: string().required('description_is_a_required_field').default(''),
  accept_en: string().required('description_is_a_required_field').default(''),
  accept_tr: string().required('description_is_a_required_field').default(''),
})

export type SchemaTypeAccept = keyof InferType<typeof acceptSchema>

const cancelSchema = object().shape({
  cancel_uz: string().required('description_is_a_required_field').default(''),
  cancel_ru: string().required('description_is_a_required_field').default(''),
  cancel_en: string().required('description_is_a_required_field').default(''),
  cancel_tr: string().required('description_is_a_required_field').default(''),
})

export type SchemaTypeCancel = keyof InferType<typeof cancelSchema>

const deliveredSchema = object().shape({
  delivered_uz: string().required('description_is_a_required_field').default(''),
  delivered_ru: string().required('description_is_a_required_field').default(''),
  delivered_en: string().required('description_is_a_required_field').default(''),
  delivered_tr: string().required('description_is_a_required_field').default(''),
})

export type SchemaTypeDelivered = keyof InferType<typeof deliveredSchema>

const onTheWaySchema = object().shape({
  on_th_way_uz: string().required('description_is_a_required_field').default(''),
  on_th_way_ru: string().required('description_is_a_required_field').default(''),
  on_th_way_en: string().required('description_is_a_required_field').default(''),
  on_th_way_tr: string().required('description_is_a_required_field').default(''),
})

export type SchemaTypeOnTheWay = keyof InferType<typeof onTheWaySchema>

const payedSchema = object().shape({
  payed_uz: string().required('description_is_a_required_field').default(''),
  payed_ru: string().required('description_is_a_required_field').default(''),
  payed_en: string().required('description_is_a_required_field').default(''),
  payed_tr: string().required('description_is_a_required_field').default(''),
})

export type SchemaTypePayed = keyof InferType<typeof payedSchema>

const progressSchema = object().shape({
  progress_uz: string().required('description_is_a_required_field').default(''),
  progress_ru: string().required('description_is_a_required_field').default(''),
  progress_en: string().required('description_is_a_required_field').default(''),
  progress_tr: string().required('description_is_a_required_field').default(''),
})

export type SchemaTypeProgress = keyof InferType<typeof progressSchema>

const readySchema = object().shape({
  ready_uz: string().required('description_is_a_required_field').default(''),
  ready_ru: string().required('description_is_a_required_field').default(''),
  ready_en: string().required('description_is_a_required_field').default(''),
  ready_tr: string().required('description_is_a_required_field').default(''),
})

export type SchemaTypeReady = keyof InferType<typeof readySchema>

export const schema = object()
  .concat(acceptSchema)
  .concat(cancelSchema)
  .concat(deliveredSchema)
  .concat(readySchema)
  .concat(progressSchema)
  .concat(onTheWaySchema)
  .concat(deliveredSchema)
  .concat(payedSchema)

export type SchemaType = InferType<typeof schema>
