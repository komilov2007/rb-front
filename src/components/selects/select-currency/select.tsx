import { Select } from '../select'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { useCurrency } from '@/hooks/useCurrency'
import Typography from '@mui/material/Typography'
import { type SchemaTypeCurrency } from '@/utils/schema'

export const SelectCurrency = () => {
  const { t } = useTranslation()
  const { options, isLoading } = useCurrency()
  const form = useFormContext<SchemaTypeCurrency>()

  return (
    <Stack mb='46px' gap='8px' maxWidth='295px'>
      <Typography variant='title10'>{t('currency')}</Typography>
      <Select
        name='currency'
        options={options}
        loading={isLoading}
        control={form.control}
        placeholder='select_currency'
      />
    </Stack>
  )
}
