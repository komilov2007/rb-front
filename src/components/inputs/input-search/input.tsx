import { TextField } from './style'
import { useTranslation } from 'react-i18next'
import { useRef, type ChangeEvent } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import { type InputSearchProps } from '@/types/components'
import { ReactComponent as IconSearch } from '@/assets/icons/search.svg'

export const InputSearch = (props: InputSearchProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    onChange,
    InputProps,
    variant = 'contained',
    placeholder = 'search',
    ...rest
  } = { type: 'search', ...props }
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) onChange(e.target.value)
  }

  return (
    <TextField
      fullWidth
      {...rest}
      customvariant={variant}
      onChange={handleChange}
      placeholder={t(placeholder)}
      InputProps={{
        inputRef,
        startAdornment: (
          <InputAdornment position='start'>
            <IconSearch />
          </InputAdornment>
        ),
        ...InputProps,
      }}
    />
  )
}
