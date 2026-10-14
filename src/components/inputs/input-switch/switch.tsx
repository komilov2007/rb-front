import { type ChangeEvent } from 'react'
import Switch from '@mui/material/Switch'
import { useTranslation } from 'react-i18next'
import { type InputSwicthProps } from '@/types/components'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useController, type FieldValues } from 'react-hook-form'

export const InputSwitch = <T extends FieldValues>({
  sx,
  name,
  label,
  control,
  disabled,
  labelPlacement,
  ...props
}: InputSwicthProps<T>) => {
  const { t } = useTranslation()
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const defaultOnChange = inputProps.onChange as (e: boolean) => void
    defaultOnChange(checked)
  }

  return (
    <FormControlLabel
      sx={sx}
      disabled={disabled}
      label={typeof label === 'string' ? t(label) : label}
      labelPlacement={labelPlacement}
      control={
        <Switch
          {...props}
          name={name}
          inputRef={ref}
          onChange={handleChange}
          value={inputProps.value}
          checked={inputProps.value}
        />
      }
    />
  )
}
