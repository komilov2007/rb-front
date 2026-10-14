import Checkbox from '@mui/material/Checkbox'
import { useTranslation } from 'react-i18next'
import type { ControlProps } from '@/types/components'
import { Controller, type FieldValues } from 'react-hook-form'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import MuiAutocomplete, {
  type AutocompleteProps as MuiAutocompleteProps,
} from '@mui/material/Autocomplete'

export type AutocompleteProps<T extends FieldValues> = ControlProps<T> &
  Omit<
    MuiAutocompleteProps<{ label: string; value: string | number }, boolean, boolean, boolean>,
    'name' | 'renderInput'
  > &
  Pick<TextFieldProps, 'size' | 'label' | 'placeholder'> & {
    checkbox?: boolean
  }

export const Autocomplete = <T extends FieldValues>({
  name,
  size,
  label,
  control,
  checkbox,
  placeholder,
  renderOption,
  ...props
}: AutocompleteProps<T>) => {
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onChange, value, ...field }, fieldState: { error, invalid } }) => (
        <MuiAutocomplete
          {...field}
          {...props}
          onChange={(_, newValue) => {
            onChange(newValue || '')
          }}
          value={value ?? (props.multiple ? [] : '')}
          renderOption={
            renderOption ||
            (checkbox
              ? (props, option, { selected }) => {
                  const { key, ...optionProps } = props
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox checked={selected} style={{ marginRight: 8 }} />
                      {option.label}
                    </li>
                  )
                }
              : undefined)
          }
          renderInput={params => (
            <TextField
              {...params}
              size={size}
              label={t(label as string)}
              error={invalid}
              placeholder={t(placeholder as string)}
              helperText={t(error?.message as string)}
            />
          )}
        />
      )}
    />
  )
}
