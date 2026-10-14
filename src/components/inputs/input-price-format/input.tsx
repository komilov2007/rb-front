import { Input } from '../input'
import { forwardRef } from 'react'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { type FieldValues } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import { type InputPriceFormatProps } from '@/types/components'
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

export const InputPriceFormat = <T extends FieldValues>({
  name,
  label,
  control,
  InputProps,
  placeholder,
  ...rest
}: InputPriceFormatProps<T>) => {
  const currency = useProfileStore(state => state.me?.currency?.code)

  return (
    <Input
      type='tel'
      fullWidth
      name={name}
      label={label}
      control={control}
      placeholder={placeholder}
      {...rest}
      InputProps={{
        startAdornment: (
          <InputAdornment position='end'>
            <Typography variant='text' color={theme => theme.palette.allColors.PURPLE}>
              {currency}
            </Typography>
          </InputAdornment>
        ),
        ...InputProps,
        //  @ts-ignore
        inputComponent: NumericFormatCustom,
      }}
    />
  )
}
