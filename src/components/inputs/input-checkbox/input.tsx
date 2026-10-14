import { type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import MuiCheckbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { type InputCheckboxProps } from '@/types/components'
import FormControlLabel from '@mui/material/FormControlLabel'
import { type FieldValues, useController } from 'react-hook-form'

export const InputCheckbox = <T extends FieldValues>({
  sx,
  name,
  label,
  control,
  onChange,
  disabled,
  labelPlacement,
  ...props
}: InputCheckboxProps<T>) => {
  const { t } = useTranslation()
  const {
    fieldState: { error, invalid },
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  })

  const errorForm = invalid || props.error
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target

    if (onChange) {
      onChange(event, checked)
    }

    const defaultOnChange = inputProps.onChange as (e: boolean) => void
    defaultOnChange(checked)
  }

  return (
    <FormControl
      error={errorForm}
      component='fieldset'
      sx={theme => ({
        svg: {
          g: {
            rect: {
              stroke: errorForm ? theme.palette.allColors.RED : undefined,
            },
          },
        },
      })}
    >
      <FormControlLabel
        sx={sx}
        disabled={disabled}
        labelPlacement={labelPlacement}
        label={typeof label === 'string' ? t(label) : label}
        control={
          <MuiCheckbox
            {...props}
            name={name}
            inputRef={ref}
            onChange={handleChange}
            value={inputProps.value}
            checked={inputProps.value}
          />
        }
      />
      <FormHelperText>{t(error?.message as string)}</FormHelperText>
    </FormControl>
  )
}
