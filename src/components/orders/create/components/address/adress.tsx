import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import { Map } from '@/components/forms/map'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import { useProfileStore } from '@/store/profile'
import { useMutation } from '@tanstack/react-query'
import { Select } from '@/components/selects/select'
import { getDeliveryPrice } from '@/apis/admin/order'
import { RadioGroup, FormControlLabel } from './style'
import InputAdornment from '@mui/material/InputAdornment'
import { ORDER_DELIVERY_OPTIONS } from '@/constants/order'
import { InputDate } from '@/components/inputs/input-date'
import { type SchemaTypeCreateOrder } from '@/utils/schema'
import { Controller, useFormContext } from 'react-hook-form'
import { type SelectChangeEvent } from '@mui/material/Select'
import { getCurrentDomainMeta } from '@/constants/domain-themes'
import { SelectBranch } from '@/components/selects/select-branch'
import { InputTimePicker } from '@/components/inputs/input-timepicker'
import type { OrderServiceProps, OrderUserAddress } from '@/types/order'
import { ReactComponent as IconChatSolid } from '@/assets/icons/chat-solid.svg'

interface AddressProps {
  addresses: OrderUserAddress[]
  services?: OrderServiceProps[]
}

export const Address = ({ services, addresses }: AddressProps) => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeCreateOrder>()
  const CUSTOM = { label: t('custom'), value: 'custom' }
  const business_type = useProfileStore(state => state.me?.business_type)
  const deliveryPrice = useMutation({
    mutationFn: async (params: Pick<SchemaTypeCreateOrder, 'latitude' | 'longitude'>) =>
      await getDeliveryPrice(params),
    onSuccess: res => {
      form.setValue('delivery', res.data)
    },
  })

  const handleChangeAddress = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value !== 'custom') {
      const findAddress = addresses.find(a => a.id === event.target.value)
      form.setValue('latitude', Number(findAddress?.latitude))
      form.setValue('longitude', Number(findAddress?.longitude))
      form.setValue('entrance', findAddress?.entrance)
      form.setValue('floor', findAddress?.floor)
      form.setValue('room', findAddress?.room)
      form.setValue('comment', findAddress?.comment)
      deliveryPrice.mutate({
        latitude: Number(findAddress?.latitude),
        longitude: Number(findAddress?.longitude),
      })
    }
  }

  return (
    <>
      <Stack gap='14px'>
        <Typography variant='title90' fontWeight={500}>
          {t('order_type')}
        </Typography>
        <Controller
          name='delivery_type'
          control={form.control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              value={field.value ?? ''}
              sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}
            >
              {Object.values(ORDER_DELIVERY_OPTIONS)
                .filter(({ value }) => services?.find(({ type }) => type === value))
                .map(({ value, label, desc }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    active={field.value === value}
                    control={<Radio />}
                    label={
                      <Stack gap='4px'>
                        <Typography
                          variant='title20'
                          fontWeight={500}
                          color={theme => theme.palette.allColors.BLACK}
                        >
                          {t(label)}
                        </Typography>
                        <Typography variant='text'>
                          {t(desc, { appName: getCurrentDomainMeta().appName })}
                        </Typography>
                      </Stack>
                    }
                  />
                ))}
            </RadioGroup>
          )}
        />
      </Stack>
      <Stack>
        <Typography mb='10px' variant='title90' fontWeight={500}>
          {t(
            form.watch('delivery_type') === ORDER_DELIVERY_OPTIONS.DELIVERY.value
              ? 'delivery_address'
              : 'branch',
          )}
        </Typography>
        <Stack gap='16px'>
          {form.watch('delivery_type') === ORDER_DELIVERY_OPTIONS.DELIVERY.value && (
            <>
              <Select
                name='location'
                label='addresses'
                control={form.control}
                placeholder='select_address'
                onChange={handleChangeAddress}
                options={[...addresses.map(a => ({ label: a.address, value: a.id })), CUSTOM]}
              />
              {form.watch('location') === CUSTOM.value && <Map />}
            </>
          )}
          <SelectBranch name='branch' control={form.control} />

          {form.watch('delivery_type') === ORDER_DELIVERY_OPTIONS.DELIVERY.value && (
            <>
              <Stack gap='18px' direction='row'>
                <Input
                  name='entrance'
                  type='tel'
                  label='entrance'
                  placeholder='enter'
                  control={form.control}
                />
                <Input
                  name='floor'
                  type='tel'
                  label='floor'
                  placeholder='enter'
                  control={form.control}
                />
                <Input
                  name='room'
                  type='tel'
                  label='apartment'
                  placeholder='enter'
                  control={form.control}
                />
              </Stack>
            </>
          )}
          {business_type === 'RESTAURANT' && (
            <Input
              name='comment'
              control={form.control}
              placeholder={
                form.watch('delivery_type') === ORDER_DELIVERY_OPTIONS.DELIVERY.value
                  ? 'comment_for_the_courier_intercom_code'
                  : 'comment'
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Stack alignItems='center' justifyContent='center'>
                      <IconChatSolid />
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
          )}
          <Stack gap='10px'>
            <Typography variant='title90' fontWeight={500}>
              {t('shipment_time')}
            </Typography>
            <Stack gap='18px' direction='row'>
              <InputDate
                disablePast
                name='shipping_date'
                format='DD.MM.YYYY'
                control={form.control}
                views={['year', 'month', 'day']}
              />
              <InputTimePicker name='shipping_time' control={form.control} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
