import Stack from '@mui/material/Stack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { yandexCourier } from '@/apis/admin/yandex'
import { object, string, type InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { type OrderDetailProps } from '@/types/order'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReactComponent as IconDeliverySolid } from '@/assets/icons/delivery-solid.svg'

export const schema = object().shape({
  code: string(),
})

export type SchemaType = InferType<typeof schema>

export const Yandex = (props: OrderDetailProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) =>
      await yandexCourier({
        order_id: props.order_details.id,
        ...data,
      }),
    onSuccess: res => {
      if (res.data?.is_valid) {
        void queryClient.invalidateQueries({
          predicate: query => {
            const q = query.queryKey[0] as string
            return q.startsWith(REACT_QUERY_KEYS.ORDER_STATUS_DETAIL)
          },
        })
      } else {
        form.setError('code', { message: 'invalid_code' })
      }
    },
  })

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return props.order_details.is_yandex_courier_verified ? (
    <>
      <Typography component='h4' variant='text110'>
        {t('yande_courier_verified')}
      </Typography>
      <Stack alignItems='center' justifyContent='center'>
        <IconDeliverySolid />
      </Stack>
    </>
  ) : (
    <Stack gap='10px' width='100%' component='form' onSubmit={form.handleSubmit(onSubmit)}>
      <Typography variant='title20' fontWeight='500'>
        {t('yandex_courier')}
      </Typography>
      <Stack gap='10px' width='100%'>
        <Input fullWidth name='code' label='code' control={form.control} placeholder='enter_code' />
        <Stack alignItems='flex-end'>
          <LoadingButton variant='contained' type='submit' loading={isLoading}>
            {t('confirm')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  )
}
