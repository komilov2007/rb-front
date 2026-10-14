import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { type InputProps, useInput } from './useInput'
import InputAdornment from '@mui/material/InputAdornment'

export const InputPackage = (props: InputProps) => {
  const { t } = useTranslation()
  const { data, option, loader, handleChange, handlClick } = useInput(props)

  return (
    <Box minWidth='150px' onClick={handlClick}>
      <Autocomplete
        fullWidth
        popupIcon=''
        disablePortal
        autoHighlight
        options={data}
        value={option}
        onChange={handleChange}
        loadingText={t('loading')}
        disabled={!props.mxik_code}
        loading={loader.value}
        filterOptions={options => options}
        renderInput={params => {
          return (
            <TextField
              {...params}
              placeholder={t('packaging_code')}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position='end'>
                    {loader.value ? (
                      <Spinner
                        center
                        sx={{
                          '.MuiCircularProgress-root': {
                            width: '20px !important',
                            height: '20px !important',
                          },
                        }}
                      />
                    ) : null}
                  </InputAdornment>
                ),
              }}
            />
          )
        }}
        sx={{
          '.MuiOutlinedInput-root input': {
            padding: '0 15px !important',
          },
        }}
      />
    </Box>
  )
}
