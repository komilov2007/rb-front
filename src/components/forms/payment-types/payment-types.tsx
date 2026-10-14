import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { PAYMENT_TYPES } from '@/constants/payment'
import { getPaymentTypes } from '@/apis/admin/payment'
import { type PaymentTypeProps } from '@/types/payment'
import { type SchemaTypePaymentTypes } from '@/utils/schema'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { InputCheckbox } from '@/components/inputs/input-checkbox'

export const PaymentTypes = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypePaymentTypes>()
  const { fields } = useFieldArray({
    name: 'payment_type',
    control: form.control,
  })
  const { isLoading, isFetching } = useQuery({
    queryFn: getPaymentTypes,
    queryKey: [REACT_QUERY_KEYS.PAYMENT_TYPE_LIST],
    onSuccess: res => {
      const payments = res.data.map(p => {
        const payment = form.getValues('payment_type')?.find(v => v.state === p.state)
        return { ...p, checked: !!payment?.checked }
      })
      form.setValue('payment_type', payments)
    },
  })

  return (
    <Stack>
      {isLoading || isFetching ? (
        <Stack>
          <Skeleton variant='rounded' sx={{ width: '160px', height: '18px' }} />
          <Stack mt='10px' gap='10px'>
            {Array.from({ length: 3 }, (_, i: number) => (
              <Stack key={i} gap='10px' direction='row'>
                <Skeleton variant='rounded' sx={{ width: '24px', height: '24px' }} />
                <Skeleton sx={{ width: '100%', maxWidth: '100px' }} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      ) : (
        fields.length > 0 && (
          <Stack>
            <Typography variant='title10' fontWeight='400' component='h3'>
              {t('payment_type')}
            </Typography>
            <Stack ml='-9px' component='ul'>
              {fields.map((f, index) => (
                <InputCheckbox
                  key={f.id}
                  component='li'
                  control={form.control}
                  id={`payment_type.${index}.checked`}
                  name={`payment_type.${index}.checked`}
                  error={!!form.formState.errors.payment_type}
                  label={t(PAYMENT_TYPES[f.state as PaymentTypeProps]?.label)}
                />
              ))}
            </Stack>
          </Stack>
        )
      )}
    </Stack>
  )
}
