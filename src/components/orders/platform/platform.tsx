import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import RadioGroup from '@mui/material/RadioGroup'
import { PLATFORMS } from '@/constants/busniness'
import Typography from '@mui/material/Typography'
import { type SchemaTypeOrderFilter } from '@/utils/schema'
import { Controller, useFormContext } from 'react-hook-form'
import FormControlLabel from '@mui/material/FormControlLabel'

const OPTIONS = {
  ALL: {
    value: 'ALL',
    label: 'all',
  },
  ...PLATFORMS,
}

export const Platform = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeOrderFilter>()

  return (
    <Stack>
      <Typography variant='title10' fontWeight='400' component='h3'>
        {t('platform')}
      </Typography>
      <Controller
        name='platform'
        control={form.control}
        render={({ field }) => {
          return (
            <RadioGroup {...field} sx={{ ml: '-9px' }}>
              {Object.values(OPTIONS).map(({ value, label }) => (
                <FormControlLabel key={value} value={value} label={t(label)} control={<Radio />} />
              ))}
            </RadioGroup>
          )
        }}
      />
    </Stack>
  )
}
