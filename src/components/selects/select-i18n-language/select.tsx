import Box from '@mui/material/Box'
import { getUser } from '@/utils/user'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { updateLanguage } from '@/apis/common'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { type LanguageTypes } from '@/types/language'
import { LANGUAGE_OPTIONS } from '@/constants/languages'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

interface SelectI18nLanguageProps {
  variant: 'radio' | 'select' | 'header'
}

export const SelectI18nLanguage = ({ variant }: SelectI18nLanguageProps) => {
  const user = getUser()
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const update = useMutation({
    mutationFn: updateLanguage,
  })

  const handleChange = (e: SelectChangeEvent<LanguageTypes>) => {
    localStorage.setItem('i18nextLng', e.target.value)
    void i18n.changeLanguage(e.target.value)
    void queryClient.refetchQueries({ type: 'active' })
    if (user?.access) {
      update.mutate()
    }
  }

  if (variant === 'radio') {
    return (
      <FormControl>
        <FormLabel id='language'>
          <Typography mb='19px' variant='title10' component='h3'>
            {t('language')}
          </Typography>
        </FormLabel>
        <RadioGroup
          sx={{ ml: '-9px' }}
          name='radio-languages'
          onChange={handleChange}
          aria-labelledby='language'
          value={(i18n.language as LanguageTypes) || String(localStorage.getItem('i18nextLng'))}
        >
          {Object.values(LANGUAGE_OPTIONS).map(({ Icon, label, value }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={
                <Stack gap='4px' direction='row' alignItems='center'>
                  <Stack justifyContent='center' sx={{ svg: { width: '19px', height: '18px' } }}>
                    <Icon />
                  </Stack>
                  {label}
                </Stack>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    )
  }
  return (
    <Select
      sx={{
        height: '32px',
        borderRadius: '6px',
      }}
      MenuProps={{
        sx: {
          zIndex: 2000002,
        },
      }}
      onChange={handleChange}
      inputProps={{
        'aria-label': 'Select language',
      }}
      renderValue={(selected: LanguageTypes) => {
        const option = LANGUAGE_OPTIONS[selected]
        const Icon = option.Icon
        const label = variant === 'header' ? option.shortLabel : option.label
        return (
          <Box gap='6px' display='flex' alignItems='center' justifyContent='center'>
            <Stack justifyContent='center' sx={{ svg: { width: '19px', height: '18px' } }}>
              <Icon />
            </Stack>
            {label}
          </Box>
        )
      }}
      value={(i18n.language as LanguageTypes) || String(localStorage.getItem('i18nextLng'))}
    >
      {Object.values(LANGUAGE_OPTIONS).map(({ Icon, label, value }, i) => (
        <MenuItem key={i} value={value} sx={{ gap: '6px' }}>
          <Stack justifyContent='center' sx={{ svg: { width: '19px', height: '18px' } }}>
            <Icon />
          </Stack>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
