import valid from 'card-validator'
import { MAP_CENTER } from '@/constants/map'
import { SOCIALS } from '@/constants/socials'
import { PAYMENT_TYPES } from '@/constants/payment'
import { DateObject } from 'react-multi-date-picker'
import { LANGUAGE_OPTIONS } from '@/constants/languages'
import { OPTION_COUNTRIES } from '@/constants/countires'
import { DATE_PERIOD_FILTER } from '@/constants/date-period'
import { AUTH_TABS, AUTH_TABS_LIST } from '@/constants/auth'
import { CATEGORY_TYPES, SCROLL_TYPES } from '@/constants/category'
import { DELIVERIES, DELIVERY_OPTIONS, DELIVERY_TYPES } from '@/constants/delivery'
import { ref, bool, mixed, array, object, string, number, type InferType } from 'yup'
import {
  ORDER_STATUS_FILTER,
  ORDER_SERVICE_OPTIONS,
  ORDER_DELIVERY_OPTIONS,
} from '@/constants/order'

export const schemaTelegramBotLanguages = object().shape({
  main_language: string().required(),
  languages: array()
    .of(
      object().shape({
        label: string().required(),
        checked: bool().required(),
        value: string().required(),
      }),
    )
    .required()
    .test('one-true', 'Field must be checked', val => {
      const isValid = val.some(v => v.checked)
      return isValid
    })
    .default(Object.values(LANGUAGE_OPTIONS).map(({ Icon, ...l }) => l)),
})

export type SchemaTypeTelegramBotLanguages = InferType<typeof schemaTelegramBotLanguages>

export const schemaSchedules = object().shape({
  schedules: array()
    .of(
      object().shape({
        day: number().required(),
        is_closed: bool().required(),
        hours: array().of(
          object().shape({
            open: string()
              .required('start_time_is_a_required_field')
              .when('is_closed', (value, schema) => {
                if (value[0]) {
                  return schema
                }
                return schema.notRequired()
              }),
            close: string()
              .required('end_time_is_a_required_field')
              .when('is_closed', (value, schema) => {
                if (value[0]) {
                  return schema
                }
                return schema.notRequired()
              }),
          }),
        ),
      }),
    )
    .required()
    .default([]),
})

export type SchemaTypeSchedules = InferType<typeof schemaSchedules>

export const validateEmail = (email: string) => {
  return string().email().isValidSync(email)
}

export const validatePhone = (phone: string, regex: RegExp) => {
  return string().matches(regex, 'phone_is_invalid').isValidSync(phone)
}

export const passwordSchema = string()
  .min(8, 'password_must_be_at_least_8_characters')
  .required()
  .default('')

export const currencySchema = object().shape({
  currency: number()
    .typeError('currency_is_a_required_field')
    .required('currency_is_a_required_field')
    .default(null),
})

export type SchemaTypeCurrency = InferType<typeof currencySchema>

export const mapSchema = object().shape({
  address: string().notRequired().default(''),
  latitude: number().required().default(MAP_CENTER.latitude),
  longitude: number().required().default(MAP_CENTER.longitude),
})

export type SchemaTypeMap = InferType<typeof mapSchema>

export const productImagesSchema = object().shape({
  images: array()
    .of(
      object().shape({
        image: mixed().test('required', 'you_need_to_provide_a_file', file => {
          if (file) return true
          return false
        }),
      }),
    )
    .min(1, 'images_field_must_have_at_least_one_items')
    .required(),
})

export type SchemaTypeProductImages = InferType<typeof productImagesSchema>

export const countryAndCitiesSchema = object().shape({
  country: number().notRequired().nullable().default(null),
  cities: array().of(number().notRequired().nullable().default(null)).default([]),
})

export type SchemaTypeCountryAndCities = InferType<typeof countryAndCitiesSchema>

export const categorySchema = object().shape({
  category: string().required().default(''),
})

export type SchemaTypeCategory = InferType<typeof categorySchema>

export const nameSchema = (message = 'name_is_a_required_field', required = true) =>
  object().shape(
    {
      name_uz: string()
        .default('')
        .when(['name_ru', 'name_en', 'name_tr'], (values, schema) => {
          if (!required) return schema.notRequired()
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue) {
            return schema.notRequired()
          }
          return schema.required(message)
        }),
      name_ru: string()
        .default('')
        .when(['name_uz', 'name_en', 'name_tr'], (values, schema) => {
          if (!required) return schema.notRequired()
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue) {
            return schema.notRequired()
          }
          return schema.required(message)
        }),
      name_en: string()
        .default('')
        .when(['name_uz', 'name_ru', 'name_tr'], (values, schema) => {
          if (!required) return schema.notRequired()
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue) {
            return schema.notRequired()
          }
          return schema.required(message)
        }),
      name_tr: string()
        .default('')
        .when(['name_uz', 'name_ru', 'name_en'], (values, schema) => {
          if (!required) return schema.notRequired()
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue) {
            return schema.notRequired()
          }
          return schema.required(message)
        }),
    },
    [
      ['name_ru', 'name_en'],
      ['name_uz', 'name_en'],
      ['name_uz', 'name_ru'],
      ['name_tr', 'name_ru'],
      ['name_tr', 'name_uz'],
      ['name_tr', 'name_en'],
    ],
  )

export const textSchema = (message = 'text_is_a_required_field') =>
  object().shape(
    {
      text_uz: string()
        .required(message)
        .default('')
        .when(['text_ru', 'text_en', 'text_tr'], (values, schema) => {
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue) {
            return schema.notRequired()
          }
          return schema
        }),
      text_ru: string()
        .required(message)
        .default('')
        .when(['text_uz', 'text_en', 'text_tr'], (values, schema) => {
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue) {
            return schema.notRequired()
          }
          return schema
        }),
      text_en: string()
        .required(message)
        .default('')
        .when(['text_uz', 'text_ru', 'text_tr'], (values, schema) => {
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue) {
            return schema.notRequired()
          }
          return schema
        }),
      text_tr: string()
        .required(message)
        .default('')
        .when(['text_uz', 'text_ru', 'text_en'], (values, schema) => {
          const hasSomeValue = values.some(v => v && v.length > 0)
          if (hasSomeValue) {
            return schema.notRequired()
          }
          return schema
        }),
    },
    [
      ['text_ru', 'text_en'],
      ['text_uz', 'text_en'],
      ['text_uz', 'text_ru'],
      ['text_tr', 'text_ru'],
      ['text_tr', 'text_uz'],
      ['text_tr', 'text_en'],
    ],
  )

export const priceSchema = object().shape({
  price: number()
    .required('price_is_a_required_field')
    .positive('price_must_be_a_positive_number')
    .nullable()
    .typeError('price_must_be_a_number_type')
    .test(
      'noEOrSign',
      'invalid_price',
      value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
    ),
})

export const additionalParameterPriceSchema = object().shape({
  price: number()
    .required('price_is_a_required_field')
    .nullable()
    .typeError('price_must_be_a_number_type')
    .test(
      'noEOrSign',
      'invalid_price',
      value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
    ),
})

export const branchesDeliverySchema = object().shape({
  branches: array()
    .of(
      object().shape({
        branchId: number().required(),
        name: string().nullable().default(''),
        address: string().nullable().default(''),
        checked: bool().required().default(false),
      }),
    )
    .when('delivery', (value, schema) => {
      if (value[0] === DELIVERIES.FLEXABLE.value) {
        return schema
          .test({
            name: 'one-true',
            test: val => val && val.filter(v => v?.checked)?.length > 0,
          })
          .required()
      }
      return schema.notRequired()
    })
    .default([]),
})

export type SchemaTypeDeliveryBranches = InferType<typeof branchesDeliverySchema>

export const branchesPickUpSchema = object().shape({
  shipping_time: bool().default(false),
  branches: array()
    .of(
      object().shape({
        branchId: number().required(),
        name: string().required().default(''),
        address: string().required().default(''),
        checked: bool().required().default(false),
      }),
    )
    .test({
      name: 'one-true',
      test: val => val && val.filter(v => v?.checked)?.length > 0,
    })
    .required()
    .default([]),
})

export type SchemaTypePickUpBranches = InferType<typeof branchesPickUpSchema>

export const serviceSchema = object().shape({
  service: array()
    .of(
      object().shape({
        type: string()
          .oneOf(DELIVERY_OPTIONS.map(o => o.type))
          .required(),
        title: string().required(),
        checked: bool().required().default(false),
      }),
    )
    .default(DELIVERY_OPTIONS)
    .test('one-true', 'Field must be checked', val => {
      const isValid = val.some(v => v.checked)
      return isValid
    })
    .required(),
})

export const categoriesSchema = object()
  .shape({
    parent: string(),
    photo: mixed().test('required', 'upload_category_image', file => {
      if (file) return true
      return false
    }),
    scroll_type: string().oneOf(Object.keys(SCROLL_TYPES)).default(SCROLL_TYPES.HORIZONTAL.value),
  })
  .concat(nameSchema('category_name_is_a_required_field'))

export type SchemaTypeCategories = InferType<typeof categoriesSchema>

export const descSchema = object().shape({
  desc_en: string().notRequired().nullable().default(''),
  desc_ru: string().notRequired().nullable().default(''),
  desc_uz: string().notRequired().nullable().default(''),
  desc_tr: string().notRequired().nullable().default(''),
})

export type SchemaTypeDesc = InferType<typeof descSchema>

export const productSchema = object()
  .shape({
    branches: array().of(number().notRequired().nullable().default(null)).default([]),
    unit: string().required('unit_is_a_required_field').default(''),
    measure: number()
      .nullable()
      .default(null)
      .transform((value, originalValue) =>
        originalValue === '' || originalValue == null ? null : value,
      )
      .when('$is_yandex_eats_integrated', {
        is: true,
        then: schema => schema.required('measure_is_a_required_field'),
      }),
    category: number().nullable().default(undefined),
    parameter: array()
      .of(
        object()
          .shape({
            skus: array()
              .of(
                object()
                  .shape({
                    unit_id: string().required('unit_is_a_required_field'),
                  })
                  .concat(nameSchema())
                  .concat(additionalParameterPriceSchema)
                  .required(),
              )
              .required(),
          })
          .concat(nameSchema()),
      )
      .required()
      .default([]),
    additional_parameter: array()
      .of(
        object()
          .shape({
            type: string().required(),
            skus: array()
              .of(
                object()
                  .shape({
                    unit_id: string().required('unit_is_a_required_field'),
                  })
                  .concat(nameSchema())
                  .concat(additionalParameterPriceSchema)
                  .required(),
              )
              .required(),
          })
          .concat(nameSchema()),
      )
      .required()
      .default([]),
  })
  .concat(descSchema)
  .concat(nameSchema('product_name_is_a_required_field'))
  .concat(priceSchema)
  .concat(productImagesSchema)

export type SchemaTypeProduct = InferType<typeof productSchema>

export const productOnlineShopSchema = object()
  .shape(
    {
      isBeforeCreateVaraint: bool(),
      is_wolt: bool().default(false),
      export_to_wolt: bool().default(false),
      mxik_code: string()
        .nullable()
        .default(null)
        .when('is_wolt', {
          is: true,
          then: schema => schema.required('ikpu_is_a_required_field'),
        }),
      package_code: string()
        .nullable()
        .default(null)
        .when('is_wolt', {
          is: true,
          then: schema => schema.required('packaging_code_is_a_required_field'),
        }),
      profit: number()
        .nullable()
        .transform((_, originalValue) => (originalValue === '' ? null : Number(originalValue))),
      margin: number()
        .nullable()
        .transform((_, originalValue) => (originalValue === '' ? null : Number(originalValue))),
      measure_id: number().required('measure_is_a_required_field'),
      base_price: number()
        .required('price_is_a_required_field')
        .positive('price_must_be_a_positive_number')
        .nullable()
        .typeError('price_must_be_a_number_type')
        .test(
          'noEOrSign',
          'invalid_price',
          value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
        )
        .when(['body_price', 'previous_price'], (values, schema, rest) => {
          let a = schema
          if (typeof rest.value === 'number') {
            if (typeof values[0] === 'number') {
              a = a.min(values[0] + 0.1, 'base_price_must_be_greater_than_body_price')
            }
            if (typeof values[1] === 'number') {
              a = a.max(values[1] - 0.1, 'base_price_must_be_smaller_than_old_price')
            }
            return a
          }

          return schema
        }),
      body_price: number()
        .nullable()
        .transform((_, originalValue) =>
          originalValue === '' || originalValue === null ? null : Number(originalValue),
        )
        .typeError('price_must_be_a_number_type')
        .when('base_price', (values, schema, rest) => {
          if (typeof values[0] === 'number' && typeof rest.value === 'number') {
            return schema.max(values[0] - 0.1, 'body_price_must_be_smaller_than_base_price')
          }
          return schema
        }),
      previous_price: number()
        .nullable()
        .transform((_, originalValue) =>
          originalValue === '' || originalValue === null ? null : Number(originalValue),
        )
        .typeError('price_must_be_a_number_type')
        .when('base_price', (values, schema, rest) => {
          if (typeof values[0] === 'number' && typeof rest.value === 'number') {
            return schema.min(values[0] + 0.1, 'old_price_must_be_greater_than_base_price')
          }
          return schema
        }),
      category_id: number().required('category_is_a_required_field'),
      category_name: string().nullable(),
      images: array()
        .of(
          object().shape({
            isDelete: bool(),
            image: string().required().default(''),
            url: string(),
          }),
        )
        .default([]),
      tags: array()
        .of(
          object().shape({
            tag: string().required().default(''),
          }),
        )
        .default([]),
      properties: array()
        .of(
          object()
            .shape({
              isEdit: bool().required().default(false),
            })
            .concat(nameSchema('characteristic_name_is_required'))
            .concat(textSchema('characteristic_value_is_required')),
        )
        .default([]),
      width: number()
        .nullable()
        .transform((_, originalValue) => (originalValue === '' ? null : Number(originalValue)))
        .typeError('must_be_a_number')
        .min(0, 'must_be_positive')
        .when('dimension_unit', {
          is: 'MM',
          then: schema => schema.max(1000, 'max_1000'),
        })
        .when('dimension_unit', {
          is: 'CM',
          then: schema => schema.max(100, 'max_100'),
        })
        .when('dimension_unit', {
          is: 'M',
          then: schema => schema.max(10, 'max_10'),
        }),
      height: number()
        .nullable()
        .transform((_, originalValue) => (originalValue === '' ? null : Number(originalValue)))
        .typeError('must_be_a_number')
        .min(0, 'must_be_positive')
        .when('dimension_unit', {
          is: 'MM',
          then: schema => schema.max(1000, 'max_1000'),
        })
        .when('dimension_unit', {
          is: 'CM',
          then: schema => schema.max(100, 'max_100'),
        })
        .when('dimension_unit', {
          is: 'M',
          then: schema => schema.max(10, 'max_10'),
        }),
      length: number()
        .nullable()
        .transform((_, originalValue) => (originalValue === '' ? null : Number(originalValue)))
        .typeError('must_be_a_number')
        .min(0, 'must_be_positive')
        .when('dimension_unit', {
          is: 'MM',
          then: schema => schema.max(1000, 'max_1000'),
        })
        .when('dimension_unit', {
          is: 'CM',
          then: schema => schema.max(100, 'max_100'),
        })
        .when('dimension_unit', {
          is: 'M',
          then: schema => schema.max(10, 'max_10'),
        }),
      weight: number()
        .nullable()
        .min(0, 'must_be_positive')
        .max(100, 'max_100')
        .transform((_, originalValue) => (originalValue === '' ? null : Number(originalValue)))
        .typeError('must_be_a_number'),
      dimension_unit: string().nullable().default(null).oneOf(['MM', 'CM', 'M']),
      variants: array()
        .of(
          object()
            .shape({
              isEdit: bool(),
              generateId: string(),
              parentId: string(),
              variantId: string(),
              options: array().of(
                object()
                  .shape({
                    parentId: string(),
                    variantId: string(),
                    generateId: string(),
                  })
                  .concat(nameSchema('variant_value_is_required')),
              ),
            })
            .concat(nameSchema('variant_name_is_required')),
        )
        .default([]),
      video: string().nullable().default(null),
    },
    [
      ['base_price', 'body_price'],
      ['base_price', 'previous_price'],
      ['body_price', 'previous_price'],
    ],
  )
  .concat(descSchema)
  .concat(nameSchema('product_name_is_a_required_field'))

export type SchemaTypeProductOnlineShop = InferType<typeof productOnlineShopSchema>

export const productsIdsSchema = object().shape({
  products: array()
    .min(1, 'products_field_must_have_at_least_1_items')
    .of(number().required())
    .required()
    .default([]),
})

export type SchemaTypeProductsIds = InferType<typeof productsIdsSchema>

export const productsIdsSchemaOnlineSHop = object().shape({
  product_ids: array()
    .min(1, 'products_field_must_have_at_least_1_items')
    .of(string().required())
    .required()
    .default([]),
})

export type SchemaTypeProductsIdsOnlineShop = InferType<typeof productsIdsSchemaOnlineSHop>

export const paymentTypesSchema = object().shape({
  payment_type: array()
    .of(
      object().shape({
        is_active: bool().required().default(false),
        state: string().oneOf(Object.keys(PAYMENT_TYPES)).required().default(''),
        checked: bool().required().default(false),
      }),
    )
    .default([]),
})

export type SchemaTypePaymentTypes = InferType<typeof paymentTypesSchema>

export const serviceTypesSchema = object().shape({
  service_type: array()
    .of(
      object().shape({
        title: string().required().default(''),
        checked: bool().required().default(false),
        type: string().oneOf(Object.keys(DELIVERY_TYPES)).required().default(''),
      }),
    )
    .default(Object.values(DELIVERY_TYPES)),
})

export type SchemaTypeServiceTypes = InferType<typeof serviceTypesSchema>

export const orderStatusSchema = object().shape({
  status: array()
    .of(
      object().shape({
        label: string().required(),
        checked: bool().required().default(false),
        status: string().oneOf(Object.values(ORDER_STATUS_FILTER).map(o => o.status)),
      }),
    )
    .default(Object.values(ORDER_STATUS_FILTER))
    .required(),
})

export type SchemaTypeOrderStatus = InferType<typeof orderStatusSchema>

export const datePeriodSchema = object().shape({
  date: string().oneOf(Object.keys(DATE_PERIOD_FILTER)).default(DATE_PERIOD_FILTER.ALL.value),
  period: array().nullable().default([new DateObject().toDate(), new DateObject().toDate()]),
})

export type SchemaTypeDatePeriod = InferType<typeof datePeriodSchema>

export const employeeSchema = object().shape({
  employee: object()
    .shape({
      id: string().required(),
      name: string().required(),
    })
    .nullable()
    .default(null),
})

export type SchemaTypeEmployee = InferType<typeof employeeSchema>

export const schemaOrderFilter = object()
  .shape({
    platform: string().default('ALL'),
    branch: string().nullable().default(null),
  })
  .concat(datePeriodSchema)
  .concat(orderStatusSchema)
  .concat(serviceTypesSchema)
  .concat(paymentTypesSchema)
  .concat(employeeSchema)

export type SchemaTypeOrderFilter = InferType<typeof schemaOrderFilter>

export const schemaSocials = object().shape({
  socials: array()
    .of(
      object().shape({
        url: string().url('link_should_be_a_valid_url').nullable(),
        type: string(),
        placeholder: string(),
        Icon: mixed(),
      }),
    )
    .default(SOCIALS),
})

export type SchemaTypeSocials = InferType<typeof schemaSocials>

export const schemaProductByCategoryBanner = object().shape({
  category: number()
    .nullable()
    .default(null)
    .when('have_url', (value, schema) => {
      if (value[0]) {
        return schema.required('category_is_a_required_field')
      }
      return schema
    }),
  product: number().nullable().default(null),
})

export type SchemaTypeProductByCategoryBanner = InferType<typeof schemaProductByCategoryBanner>

export const schemaCreateMailing = object().shape({
  text: string()
    .required('description_is_a_required_field')
    .max(1000, 'description_must_be_at_most_1000_characters')
    .default(''),
  title: string().required('mailing_name_is_a_required_field').default(''),
  file: mixed().test('required', 'you_need_to_provide_a_file', file => {
    if (file) return true
    return false
  }),
  buttons: array()
    .of(
      object().shape({
        name: string().required('button_name_is_a_required_field'),
        url: string().url('link_should_be_a_valid_url').required('button_url_is_a_required_field'),
      }),
    )
    .required()
    .default([]),
})

export type SchemaTypeCreateMailing = InferType<typeof schemaCreateMailing>

export const schemaCreateOrder = object().shape(
  {
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
    customer_name: string().required('customer_name_is_a_required_field').default(''),
    delivery_type: string()
      .oneOf(Object.keys(ORDER_DELIVERY_OPTIONS))
      .required()
      .default(ORDER_DELIVERY_OPTIONS.DELIVERY.value),
    promocode: string().nullable(),
    payment_type: string().required('payment_type_is_a_required_field'),
    entrance: number()
      .nullable()
      .transform((val, orig) => (orig === '' ? undefined : val)),
    floor: number()
      .nullable()
      .transform((val, orig) => (orig === '' ? undefined : val)),
    room: number()
      .nullable()
      .transform((val, orig) => (orig === '' ? undefined : val)),
    comment: string().notRequired(),
    location: string().when('delivery_type', (value, schema) => {
      if (value[0] === ORDER_DELIVERY_OPTIONS.DELIVERY.value) {
        return schema.required('location_is_a_required_field')
      }
      return schema
    }),
    branch: number().required('branch_is_a_required_field'),
    latitude: number().required().default(MAP_CENTER.latitude),
    longitude: number().required().default(MAP_CENTER.longitude),
    delivery: object().shape({
      delivery: mixed(),
      delivery_type: string(),
    }),
    shipping_date: string()
      .nullable()
      .default(null)
      .when('shipping_time', {
        is: (val: string) => val && val.length > 0,
        then: schema => schema.required('required_field'),
        otherwise: schema => schema,
      }),
    shipping_time: string()
      .nullable()
      .default(null)
      .when('shipping_date', {
        is: (val: string) => val && val.length > 0,
        then: schema => schema.required('required_field'),
        otherwise: schema => schema,
      }),
  },
  [['shipping_date', 'shipping_time']],
)

export type SchemaTypeCreateOrder = InferType<typeof schemaCreateOrder>

export const schemaChat = object().shape({
  cursor: number().required().default(0),
  message: string()
    .min(1)
    .required()
    .matches(/^(?!\s+$).*/, 'This field cannot contain only blankspaces')
    .default(''),
})

export type SchemaTypeChat = InferType<typeof schemaChat>

export const schemaAuth = object().shape({
  tab: string()
    .oneOf(AUTH_TABS_LIST.map(t => t.value))
    .required()
    .default(AUTH_TABS.phone.value),
  phone: string()
    .notRequired()
    .default('')
    .when('tab', (value, schema) => {
      if (value[0] === AUTH_TABS.phone.value) {
        return schema.required('phone_is_a_required_field').test({
          name: 'min length',
          message: 'phone_is_invalid',
          test: val => {
            return !val.includes('_')
          },
        })
      }
      return schema
    }),
  email: string()
    .required('email_is_a_required_field')
    .default('')
    .when('tab', (value, schema) => {
      if (value[0] === AUTH_TABS.phone.value) {
        return schema.notRequired()
      }
      return schema.test('email', 'email_is_invalid', value => {
        return validateEmail(value)
      })
    }),
})

export type SchemaTypeAuth = InferType<typeof schemaAuth>

export const schemaSignUp = object()
  .shape({
    firstname: string().required('your_name_is_a_required_field').default(''),
    password2: string()
      .required('please_re_type_your_password')
      .oneOf([ref('password')], 'passwords_does_not_match')
      .default(''),

    policy: bool().oneOf([true], 'field_must_be_checked').required().default(false),
    password: passwordSchema,
  })
  .concat(schemaAuth)

export type SchemaTypeSignUp = InferType<typeof schemaSignUp>

export const schemaCreditCardExpiry = object().shape({
  expiry: string()
    .min(5, 'expiry_date_must_be_filled')
    .test(
      'test-credit-card-expiration-date',
      'invalid_expiration_date_has_past',
      value => valid.expirationDate(value).isValid,
    )
    .required('expiry_is_a_required_field'),
})

export const schemaIiko = object().shape({
  api_login: string().required('api_login_is_a_required_field').nullable().default(''),
  branches: array()
    .of(
      object().shape({
        checked: bool().required(),
        spot_id: string().required(),
        spot_name: string().required(),
        latitude: number().required(),
        longitude: number().required(),
        terminal_id: string().required('terminal_id_is_a_required_field').nullable().default(''),
      }),
    )
    .required()
    .test('one-true', 'Field must be checked', val => {
      const isValid = val.some(v => v.checked)
      return isValid
    })
    .default([]),
})

export type SchemaTypeIiko = InferType<typeof schemaIiko>

export const schemaOrderDetail = object().shape({
  comment: string(),
  delivery_service: string().default(ORDER_SERVICE_OPTIONS.YOUR_DELIVERY.value),
  courier: number().nullable(),
})

export type SchemaTypeOrderDetail = InferType<typeof schemaOrderDetail>

export const schemaSmartUp = object().shape({
  login: string().required(),
  password: string().required(),
  fillial: string().required('organization_id_is_a_required_field'),
  warehouse: string().required(),
  robot: string().required(),
  price_type_code: string().required(),
  price_type_name: string().required(),
  price_type_currency_code: string().required(),
})

export type SchemaTypeSmartUp = InferType<typeof schemaSmartUp>

export const schemaPoster = object().shape({
  token: string().required(),
  source_id: string().nullable(),
  branches: array()
    .of(
      object().shape({
        checked: bool().required(),
        spot_id: number().required(),
        spot_name: string().required(),
        latitude: number().required(),
        longitude: number().required(),
      }),
    )
    .required()
    .test('one-true', 'Field must be checked', val => {
      const isValid = val.some(v => v.checked)
      return isValid
    })
    .default([]),
})

export type SchemaTypePoster = InferType<typeof schemaPoster>

export const schemaClopos = object().shape({
  client_secret: string().required('client_secret_required'),
  client_id: string().required('client_id_required'),
  brand: string().required('brand_required'),
  branches: array()
    .of(
      object().shape({
        checked: bool().required(),
        spot_id: string().required(),
        spot_name: string().required(),
        latitude: number().required(),
        longitude: number().required(),
      }),
    )
    .required()
    .test('one-true', 'Field must be checked', val => {
      const isValid = val.some(v => v.checked)
      return isValid
    })
    .default([]),
})

export type SchemaTypeClopos = InferType<typeof schemaClopos>

export const schemaAliPos = object().shape({
  client_secret: string().required('client_secret_required'),
  client_id: string().required('client_id_required'),
  branches: array()
    .of(
      object().shape({
        checked: bool().required(),
        spot_id: string().required(),
        spot_name: string().required(),
        latitude: number().required(),
        longitude: number().required(),
      }),
    )
    .required()
    .test('one-true', 'Field must be checked', val => {
      const isValid = val.some(v => v.checked)
      return isValid
    })
    .default([]),
})

export type SchemaTypeAliPos = InferType<typeof schemaAliPos>

export const schemaZoomrad = object().shape({
  client_id: string().trim().required('client_id_required').default(''),
  client_secret: string().trim().required('client_secret_required').default(''),
  key_client: string().trim().required('key_client_required').default(''),
  key_server: string().trim().required('key_server_required').default(''),
  redirect_uri: string()
    .trim()
    .url('link_should_be_a_valid_url')
    .required('redirect_uri_required')
    .default(''),
  service_type_code: string().trim().required('service_type_code_required').default(''),
})

export type SchemaTypeZoomrad = InferType<typeof schemaZoomrad>

export const schemaBts = object().shape({
  sender_address: string().required('address_is_a_required_field'),
  sender_city_id: number().required(),
  sender_region_id: number().required(),
  weight: number().required(),
  package_id: number().nullable().required(),
  post_type_id: number().nullable().required(),
})

export type SchemaTypeBts = InferType<typeof schemaBts>

export const schemaBannerPhoto = object().shape({
  banner_photo: string(),
  banner_photo_key: string().nullable(),
})

export type SchemaTypeBannerPhoto = InferType<typeof schemaBannerPhoto>

export const schemaCategoryOnlineShop = object()
  .shape({
    category_type: string().oneOf(Object.keys(CATEGORY_TYPES)).default(CATEGORY_TYPES.ADD.value),
    parent_id: string()
      .nullable()
      .when('category_type', (value, schema) => {
        if (value[0] === CATEGORY_TYPES.ASSIGN.value) {
          return schema.required('assign_to_category_is_a_required_field')
        }
        return schema
      }),
    parent: string(),
    photo_key: string().nullable(),
    banner_photo_key: string().nullable(),
    scroll_type: string().oneOf(Object.keys(SCROLL_TYPES)).default(SCROLL_TYPES.HORIZONTAL.value),
    photo: string()
      .nullable()
      .when('category_type', (value, schema) => {
        if (value[0] === CATEGORY_TYPES.ADD.value) {
          return mixed().test('required', 'upload_category_image', file => {
            if (file) return true
            return false
          })
        }
        return schema
      }),
    banner_photo: string().nullable(),
  })
  .concat(nameSchema('category_name_is_a_required_field'))

export type SchemaTypeCategoryOnlineShop = InferType<typeof schemaCategoryOnlineShop>

export const schemaSetting = object()
  .shape({
    name: string().required(),
    logo: string().nullable(),
    branch_name: string().required('branch_name_is_a_required_field').default(''),
    business_phone: string()
      .test({
        name: 'min length',
        message: 'contact_number_is_invalid',
        test: val => {
          const value = val?.replace('+', '')
          const phoneNumber = value?.split(' ') ?? []
          const [code, ...phone] = phoneNumber
          const findCountry = OPTION_COUNTRIES.find(c => c[2] === code)
          const isValid = findCountry && phone.join(' ').length === findCountry[3]?.length

          return (
            isValid || phoneNumber.length === 1 || (phoneNumber.length === 2 && phone[0] === '')
          )
        },
      })
      .default(''),
  })
  .concat(mapSchema)
  .concat(descSchema)
  .concat(schemaSocials)
  .concat(currencySchema)
  .concat(schemaSchedules)
  .concat(schemaTelegramBotLanguages)

export type SchemaTypeSetting = InferType<typeof schemaSetting>

export const schemaBonus = object().shape({
  cashback_enabled: bool(),
  cashback_amount: number()
    .nullable()
    .when('cashback_enabled', (value, schema) => {
      if (value[0]) {
        return schema
          .required()
          .typeError('amount_must_be_a_number_type')
          .min(1, 'amount_must_be_greater_than_or_equal_to_1')
          .test(
            'noEOrSign',
            'invalid_amount',
            value => typeof value === 'number' && !/[eE+-]/.test(String(value)),
          )
      }
      return schema
    }),
})

export type SchemaTypeBonus = InferType<typeof schemaBonus>

export const schemaCityMerchant = object().shape({
  cities: array().of(number().notRequired().nullable().default(null)).default([]),
})

export type SchemaTypeCityMerchant = InferType<typeof schemaCityMerchant>

export const schemaPaymentTypes = object().shape({
  payment_types: array().of(number().notRequired().nullable().default(null)).default([]),
})

export type SchemaTypePaymentTypesMerchant = InferType<typeof schemaPaymentTypes>

export const schemaYesPos = object().shape({
  api_key: string().required('token_is_a_required_field'),
  branch_id: string().required('branch_is_a_required_field'),
})

export type SchemaTypeYesPos = InferType<typeof schemaYesPos>

export const schemaTelegramPost = object().shape(
  {
    product_id: string(),
    content: string()
      .required('description_required')
      .max(1024, 'description_must_be_at_most_1024_characters')
      .when('photo', (value, schema) => {
        if (value[0]?.length > 0) {
          return string().max(1024, 'description_must_be_at_most_1024_characters').nullable()
        }
        return schema
      }),
    photo: string()
      .required('photo_required')
      .when('content', (value, schema) => {
        if (value[0]?.length > 0) {
          return string().nullable()
        }
        return schema
      }),
    button_title: string().when('product_id', (value, schema) => {
      if (value[0]?.length > 0) {
        return schema.required('button_name_is_required')
      }
      return schema
    }),
    chat: number().required('telegram_chat_required'),
  },
  [['content', 'photo']],
)

export type SchemaTypeTelegramPost = InferType<typeof schemaTelegramPost>

export const schemaRegos = object().shape({
  integration_id: string().required('integration_id_is_a_required_field'),
  price_type_id: number().required('price_type_is_a_required_field').nullable(),
  warehouse_id: number().required('warehouse_is_a_required_field').nullable(),
  only_with_photo: bool().default(true),
  only_in_stock: bool().default(false),
})

export type SchemaTypeRegos = InferType<typeof schemaRegos>
