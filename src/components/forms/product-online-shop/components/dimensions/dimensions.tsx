import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import { Select } from '@/components/selects/select'
import { useFormContext } from 'react-hook-form'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'

const DIMENSION_UNITS = [
  { value: 'MM', label: 'millimeter' },
  { value: 'CM', label: 'centimeter' },
  { value: 'M', label: 'meter' },
]

export const Dimensions = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeProductOnlineShop>()

  return (
    <Stack p='18px' direction='column' gap='24px'>
      <Stack direction='row' gap='10px'>
        <Input
          fullWidth
          type='number'
          control={form.control}
          name='width'
          label={t('width')}
          placeholder={t('width')}
        />
        <Input
          fullWidth
          type='number'
          control={form.control}
          name='height'
          label={t('height')}
          placeholder={t('height')}
        />
        <Input
          fullWidth
          type='number'
          control={form.control}
          name='length'
          label={t('length')}
          placeholder={t('length')}
        />
        <Select
          name='dimension_unit'
          control={form.control}
          options={DIMENSION_UNITS}
          label='dimension_unit'
          placeholder='select_dimension_unit'
        />
      </Stack>
      <Input
        fullWidth
        type='number'
        control={form.control}
        name='weight'
        label={t('weight')}
        placeholder={t('weight')}
      />
    </Stack>
  )
}
