import Stack from '@mui/material/Stack'
import { InputMask } from '../input-mask'
import { type ControlProps } from '@/types/components'
import InputAdornment from '@mui/material/InputAdornment'
import { type FieldValues, useController } from 'react-hook-form'
import { getCreditCardIcon, getCreditCardMask } from '@/utils/credit-card'

export const InputCreditCardNumber = <T extends FieldValues>({
  name,
  control,
}: ControlProps<T>) => {
  const controller = useController({
    name,
    control,
  })
  const mask = getCreditCardMask(controller.field.value)
  const IconCard = getCreditCardIcon(controller.field.value)
  return (
    <InputMask
      name={name}
      mask={mask}
      control={control}
      label='card_number'
      placeholder='enter_card'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Stack justifyContent='center' mr='5px'>
              <IconCard />
            </Stack>
          </InputAdornment>
        ),
      }}
    />
  )
}
