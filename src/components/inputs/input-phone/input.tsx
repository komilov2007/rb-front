import Stack from '@mui/material/Stack'
import { InputMask } from '../input-mask'
import Typography from '@mui/material/Typography'
import { type FieldValues } from 'react-hook-form'
import { type InputPhoneProps } from '@/types/components'
import InputAdornment from '@mui/material/InputAdornment'
import { ReactComponent as IconFlagUz } from '@/assets/icons/flag-uz.svg'

export const InputPhone = <T extends FieldValues>(props: InputPhoneProps<T>) => {
  return (
    <InputMask
      {...props}
      type='tel'
      mask={[/\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Stack gap='10px' direction='row' alignItems='center'>
              <Stack
                alignItems='center'
                justifyContent='center'
                sx={{
                  svg: {
                    width: '26px',
                    height: '26px',
                  },
                }}
              >
                <IconFlagUz />
              </Stack>
              <Typography
                variant='text120'
                color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
              >
                +998
              </Typography>
            </Stack>
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
    />
  )
}
