import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        thousandSeparator
        valueIsNumericString
      />
    )
  },
)

export const InputPrice = ({ name, label, InputProps, placeholder, ...rest }: TextFieldProps) => {
  const { t } = useTranslation()

  return (
    <TextField
      type='tel'
      {...rest}
      id={name}
      variant='outlined'
      label={t(label as string)}
      InputLabelProps={{ shrink: true }}
      placeholder={t(placeholder as string)}
      InputProps={{
        ...InputProps,
        //  @ts-ignore
        inputComponent: NumericFormatCustom,
      }}
    />
  )
}
