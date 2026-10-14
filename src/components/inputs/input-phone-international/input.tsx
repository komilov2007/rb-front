import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { InputProps } from '@/types/components'
import { OPTION_COUNTRIES } from '@/constants/countires'
import InputAdornment from '@mui/material/InputAdornment'
import { Controller, type FieldValues } from 'react-hook-form'
import { FlagImage, type CountryIso2, parseCountry, usePhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

export const InputPhoneInternational = <T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  defaultValue,
  ...props
}: InputProps<T>) => {
  const { t } = useTranslation()
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    value: defaultValue,
    defaultCountry: 'uz',
    countries: OPTION_COUNTRIES,
  })

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onBlur, onChange, ...rest }, fieldState: { error, invalid } }) => {
        return (
          <TextField
            {...rest}
            type='tel'
            error={invalid}
            onBlur={onBlur}
            variant='outlined'
            value={inputValue}
            label={t(label as string)}
            InputLabelProps={{ shrink: true }}
            placeholder={t(placeholder as string)}
            helperText={t(error?.message as string)}
            onChange={e => {
              const val = e.target.value

              if (!val || val.trim() === '') {
                handlePhoneValueChange(e)
                onChange(e)
                return
              }

              const value = val?.replace('+', '')
              const phoneNumber = value?.split(' ') ?? []
              const [code, ...phone] = phoneNumber
              const findCountry = OPTION_COUNTRIES.find(c => c[2] === code)
              const count = findCountry ? findCountry[3]?.length : 0

              const phoneDigits = phone.join('').replace(/\s/g, '')
              const isValid = !findCountry || phoneDigits.length <= Number(count)

              if (isValid) {
                handlePhoneValueChange(e)
                onChange(e)
              }
            }}
            inputRef={inputRef}
            sx={{
              '.MuiOutlinedInput-root:has(.MuiInputAdornment-positionStart)': {
                paddingLeft: '3px !important',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Stack
                    sx={theme => ({
                      marginRight: '5px',
                      position: 'relative',
                      '::after': {
                        top: '7px',
                        right: '-5px',
                        width: '1px',
                        content: '""',
                        height: '22px',
                        position: 'absolute',
                        background: theme.palette.allColors.GRAY130,
                      },
                    })}
                  >
                    <Select
                      sx={theme => ({
                        height: '36px',
                        '& fieldset': {
                          borderColor: theme.palette.allColors.TRANSPARENT,
                        },
                      })}
                      value={country.iso2}
                      onChange={e => {
                        setCountry(e.target.value as CountryIso2)
                      }}
                      renderValue={value => <FlagImage iso2={value} style={{ display: 'flex' }} />}
                    >
                      {OPTION_COUNTRIES.map(c => {
                        const country = parseCountry(c)
                        return (
                          <MenuItem key={country.iso2} value={country.iso2}>
                            <FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />
                            <Typography marginRight='8px'>{country.name}</Typography>
                            <Typography color='gray'>+{country.dialCode}</Typography>
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </Stack>
                </InputAdornment>
              ),
            }}
            {...props}
          />
        )
      }}
    />
  )
}
