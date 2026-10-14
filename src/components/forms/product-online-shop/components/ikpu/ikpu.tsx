import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import TextField from '@mui/material/TextField'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { useBoolean } from '@/hooks/useBoolean'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { useState, type SyntheticEvent } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import { getIkpuTax, getPackage } from '@/apis/admin/ikpu'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import type { SchemaTypeProductOnlineShop } from '@/utils/schema'

interface OptionProps {
  label: string
  value: string
  unit?: number
}

export const Ikpu = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeProductOnlineShop>()

  const mxikCode = form.watch('mxik_code')
  const packageCode = form.watch('package_code')

  const mxikError = form.formState.errors.mxik_code?.message
  const packageError = form.formState.errors.package_code?.message

  const [ikpuSearch, setIkpuSearch] = useState('')
  const [ikpuOptions, setIkpuOptions] = useState<OptionProps[]>(
    mxikCode ? [{ label: mxikCode, value: mxikCode }] : [],
  )
  const ikpuOption = mxikCode ? { label: mxikCode, value: mxikCode } : null

  const loader = useBoolean()
  const [packageOptions, setPackageOptions] = useState<OptionProps[]>([])
  const packageOption = packageCode ? { label: packageCode, value: packageCode } : null

  useQuery({
    queryKey: [REACT_QUERY_KEYS.IKPU_TAX_LIST, 'form', ikpuSearch],
    queryFn: async () => await getIkpuTax({ search: ikpuSearch, lang: 'uz' }),
    enabled: ikpuSearch.length > 0,
    select: res => ({
      ...res,
      data: res.data.map(item => ({
        label: `${item.mxikCode} , ${item.subPositionName}`,
        value: item.mxikCode,
      })),
    }),
    onSuccess: res => {
      setIkpuOptions(res.data)
    },
  })

  const { refetch: refetchPackages } = useQuery({
    enabled: false,
    queryKey: [REACT_QUERY_KEYS.IKPU_PACKAGE_LIST, 'form', mxikCode],
    queryFn: async () => await getPackage(mxikCode),
    select: res => ({
      ...res,
      data: res.data.map(item => ({
        label: item.name ?? '',
        unit: item.unit_code ?? undefined,
        value: item.package_code ?? '',
      })),
    }),
    onSuccess: res => {
      loader.setFalse()
      setPackageOptions(res.data)
    },
  })

  const handleIkpuInputChange = (_: SyntheticEvent, search: string) => {
    setIkpuSearch(search)
  }

  const handleIkpuChange = (_: SyntheticEvent, option: OptionProps | null) => {
    if (option) {
      form.setValue('mxik_code', option.value, { shouldValidate: true })
      setIkpuOptions([{ label: option.value, value: option.value }])
    } else {
      form.setValue('mxik_code', null, { shouldValidate: true })
      form.setValue('package_code', null, { shouldValidate: true })
      setPackageOptions([])
    }
    setIkpuSearch('')
  }

  const handlePackageClick = () => {
    if (mxikCode) {
      void refetchPackages()
      loader.setTrue()
    }
  }

  const handlePackageChange = (_: SyntheticEvent, option: OptionProps | null) => {
    if (option) {
      form.setValue('package_code', option.value, { shouldValidate: true })
    } else {
      form.setValue('package_code', null, { shouldValidate: true })
    }
  }

  return (
    <Stack gap='16px'>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap='16px'>
        <Box flex={1} minWidth='200px'>
          <Autocomplete
            fullWidth
            disablePortal
            autoHighlight
            value={ikpuOption}
            options={ikpuOptions}
            onChange={handleIkpuChange}
            onInputChange={handleIkpuInputChange}
            filterOptions={options => options}
            loadingText={ikpuSearch === '' ? t('type_anthing') : t('loading')}
            loading={ikpuSearch.length > 0}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={params => (
              <TextField
                {...params}
                label={t('IKPU')}
                placeholder={t('search')}
                error={Boolean(mxikError)}
                helperText={mxikError ? t(mxikError) : undefined}
              />
            )}
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
                      <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                      </span>
                    ))}
                  </div>
                </li>
              )
            }}
          />
        </Box>
        <Box flex={1} minWidth='150px' onClick={handlePackageClick}>
          <Autocomplete
            fullWidth
            popupIcon=''
            disablePortal
            autoHighlight
            value={packageOption}
            options={packageOptions}
            onChange={handlePackageChange}
            disabled={!mxikCode}
            loading={loader.value}
            loadingText={t('loading')}
            filterOptions={options => options}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={params => (
              <TextField
                {...params}
                placeholder={t('enter')}
                label={t('packaging_code')}
                error={Boolean(packageError)}
                helperText={packageError ? t(packageError) : undefined}
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
            )}
            sx={{
              '.MuiOutlinedInput-root input': {
                padding: '0 15px !important',
              },
            }}
          />
        </Box>
      </Stack>
    </Stack>
  )
}
