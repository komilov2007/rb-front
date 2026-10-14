import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { type SchemaTypeOrderStatus } from '@/utils/schema'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { InputCheckbox } from '@/components/inputs/input-checkbox'

export const OrderStatus = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeOrderStatus>()
  const { fields } = useFieldArray({
    name: 'status',
    control: form.control,
  })

  return (
    <Stack>
      <Typography variant='title10' fontWeight='400' component='h3'>
        {t('status')}
      </Typography>
      <Stack ml='-9px' component='ul'>
        {fields.map((f, index) => (
          <InputCheckbox
            key={f.id}
            component='li'
            label={t(f.label)}
            control={form.control}
            id={`status.${index}.checked`}
            name={`status.${index}.checked`}
            error={!!form.formState.errors.status}
          />
        ))}
      </Stack>
    </Stack>
  )
}
