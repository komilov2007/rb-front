import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { type SchemaTypeServiceTypes } from '@/utils/schema'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { InputCheckbox } from '@/components/inputs/input-checkbox'

export const OrderTypes = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeServiceTypes>()
  const { fields } = useFieldArray({
    name: 'service_type',
    control: form.control,
  })

  return (
    <Stack>
      <Typography variant='title10' fontWeight='400' component='h3'>
        {t('order_type')}
      </Typography>
      <Stack ml='-9px' component='ul'>
        {fields.map((f, index) => (
          <InputCheckbox
            key={f.id}
            component='li'
            label={f.title}
            control={form.control}
            id={`service_type.${index}.checked`}
            name={`service_type.${index}.checked`}
            error={!!form.formState.errors.service_type}
          />
        ))}
      </Stack>
    </Stack>
  )
}
