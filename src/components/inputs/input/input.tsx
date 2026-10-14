import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import { type InputProps } from '@/types/components'
import { type FieldValues, useController } from 'react-hook-form'

export const Input = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  ...props
}: InputProps<T>) => {
  const { t } = useTranslation()
  const {
    field: { ref, disabled, onChange, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  return (
    <TextField
      {...props}
      {...inputProps}
      id={name}
      error={invalid}
      variant='outlined'
      label={t(label as string)}
      value={inputProps?.value ?? ''}
      inputRef={props.inputRef ?? ref}
      InputLabelProps={{ shrink: true }}
      placeholder={t(placeholder as string)}
      helperText={t(error?.message as string)}
      onChange={e => {
        onChange(e)
        if (props.onChange) {
          props.onChange(e)
        }
      }}
    />
  )
}
