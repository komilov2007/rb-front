import MaskedInput from 'react-text-mask'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import { type InputMaskProps } from '@/types/components'
import { useController, type FieldValues } from 'react-hook-form'

export const InputMask = <T extends FieldValues>({
  name,
  mask,
  pipe,
  guide,
  label,
  control,
  showMask,
  placeholder,
  placeholderChar,
  keepCharPositions,
  ...rest
}: InputMaskProps<T>) => {
  const { t } = useTranslation()

  const {
    field: { ref: fieldRef, ...fieldRest },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  })

  return (
    // @ts-ignore
    <MaskedInput
      {...fieldRest}
      pipe={pipe}
      mask={mask}
      guide={guide}
      showMask={showMask}
      placeholderChar={placeholderChar}
      keepCharPositions={keepCharPositions}
      render={(ref, props) => {
        return (
          <TextField
            {...rest}
            {...props}
            error={invalid}
            inputRef={el => {
              if (typeof ref === 'function') {
                ref(el)
              }
              fieldRef(el)
            }}
            variant='outlined'
            autoComplete='off'
            label={t(label as string)}
            InputLabelProps={{ shrink: true }}
            placeholder={t(placeholder as string)}
            helperText={t(error?.message as string)}
            onChange={e => {
              props.onChange(e)
              if (rest?.onChange) rest?.onChange(e)
            }}
          />
        )
      }}
    />
  )
}
