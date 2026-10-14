import { OtpInput } from './style'
import { type InputOtpProps } from '@/types/components'
import { type FieldValues, useController } from 'react-hook-form'

export const InputOtp = <T extends FieldValues>({
  name,
  control,
  length = 4,
  ...props
}: InputOtpProps<T>) => {
  const {
    field,
    fieldState: { invalid },
  } = useController({
    name,
    control,
  })

  return (
    <OtpInput
      {...props}
      {...field}
      length={length}
      TextFieldsProps={{
        error: invalid,
        type: 'tel',
      }}
      validateChar={value => !isNaN(Number(value))}
    />
  )
}
