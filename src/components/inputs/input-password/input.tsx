import { Input } from '../input'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import { type FieldValues } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import { type InputPasswordProps } from '@/types/components'
import { ReactComponent as IconEyeOpen } from '@/assets/icons/eye-open.svg'
import { ReactComponent as IconEyeClose } from '@/assets/icons/eye-close.svg'

export const InputPassword = <T extends FieldValues>(props: InputPasswordProps<T>) => {
  const { value, toggle } = useBoolean()

  return (
    <Input
      {...props}
      autoComplete='current-password'
      type={value ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              onClick={toggle}
              aria-label='Password visibility toggle'
              title='Password visibility toggle'
            >
              {value ? <IconEyeOpen /> : <IconEyeClose />}
            </IconButton>
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
    />
  )
}
