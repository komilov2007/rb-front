import { InputMask } from '../input-mask'
import { type FieldValues } from 'react-hook-form'
import { type ControlProps } from '@/types/components'
import { CREDIT_CARD_EXPIRY_MASK } from '@/constants/credit-card'

export const InputCreditCardExpiry = <T extends FieldValues>({
  name,
  control,
}: ControlProps<T>) => {
  return (
    <InputMask
      fullWidth
      name={name}
      control={control}
      label='expire_date'
      placeholder='MM / YY'
      mask={CREDIT_CARD_EXPIRY_MASK}
    />
  )
}
