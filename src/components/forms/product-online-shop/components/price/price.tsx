import { Profit } from '../profit'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { useFormContext } from 'react-hook-form'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import { SelectMeasures } from '@/components/selects/select-measures/select'

interface PriceProps {
  isCreate: boolean
}

export const Price = (props: PriceProps) => {
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  return (
    <Stack gap='24px'>
      <Stack gap='24px'>
        <Stack gap='10px' direction='row'>
          <InputPriceFormat
            name='base_price'
            label='price'
            control={form.control}
            placeholder='enter_price'
            onChange={async () => await form.trigger(['previous_price', 'body_price'])}
          />
          <SelectMeasures name='measure_id' control={form.control} />
        </Stack>
        <Stack gap='10px' direction='row'>
          <InputPriceFormat
            name='previous_price'
            label='old_price'
            control={form.control}
            placeholder='enter_old_price'
            onChange={async () => await form.trigger(['base_price', 'body_price'])}
          />
          <div style={{ width: '100%' }} />
        </Stack>
      </Stack>
      {!props.isCreate && (
        <>
          <Divider />
          <Stack gap='10px' direction='row'>
            <InputPriceFormat
              name='body_price'
              label='cost_price'
              control={form.control}
              placeholder='0.00'
              onChange={async () => await form.trigger(['previous_price', 'base_price'])}
            />
            <Profit />
          </Stack>
        </>
      )}
    </Stack>
  )
}
