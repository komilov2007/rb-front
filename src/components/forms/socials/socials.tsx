import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import { type SchemaTypeSocials } from '@/utils/schema'
import InputAdornment from '@mui/material/InputAdornment'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const Socials = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeSocials>()
  const { fields } = useFieldArray({
    name: 'socials',
    control: form.control,
  })

  return (
    <Stack>
      <Typography variant='title10'>{t('link_to_social_networks')}</Typography>
      <Stack gap='12px' m='7px 0 46px' display='grid' gridTemplateColumns='1fr 1fr'>
        {fields.map(({ Icon, ...s }, i: number) => (
          <Input
            key={s.id}
            type='url'
            control={form.control}
            name={`socials.${i}.url`}
            placeholder={s.placeholder}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon />
                </InputAdornment>
              ),
            }}
          />
        ))}
      </Stack>
    </Stack>
  )
}
