import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import Autocomplete from '@mui/material/Autocomplete'
import { type InputProps, useInput } from './useInput'

export const InputIkpu = (props: InputProps) => {
  const { t } = useTranslation()
  const { data, option, search, isLoading, handleChange, handleInputChange } = useInput(props)

  return (
    <Box minWidth='200px'>
      <Autocomplete
        fullWidth
        popupIcon=''
        disablePortal
        autoHighlight
        options={data}
        value={option}
        loading={isLoading}
        onChange={handleChange}
        loadingText={search === '' ? t('type_anthing') : t('loading')}
        onInputChange={handleInputChange}
        filterOptions={options => options}
        renderInput={params => {
          return <TextField {...params} placeholder={t('search')} />
        }}
        sx={{
          '.MuiOutlinedInput-root input': {
            padding: '0 15px !important',
          },
        }}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.label, inputValue, { insideWords: true })
          const parts = parse(option.label, matches)

          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          )
        }}
      />
    </Box>
  )
}
