import { bool, object, string, type InferType } from 'yup'
import { schemaCreditCardExpiry } from '@/utils/schema'
import { validateCreditCardNumber } from '@/utils/credit-card'

export const schema = object()
  .shape({
    card_number: string()
      .required('card_number_is_required')
      .test('is-valid-card', 'invalid_card_number', validateCreditCardNumber),
    policy: bool().oneOf([true], 'field_must_be_checked').required().default(false),
  })
  .concat(schemaCreditCardExpiry)

export type SchemaType = InferType<typeof schema>
