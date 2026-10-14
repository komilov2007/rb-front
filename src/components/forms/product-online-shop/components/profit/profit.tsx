import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/inputs/input'
import Typography from '@mui/material/Typography'
import { profitProduct } from '@/apis/admin/product'
import InputAdornment from '@mui/material/InputAdornment'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'
import { InputPriceFormat } from '@/components/inputs/input-price-format'

export const Profit = () => {
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  useQuery({
    enabled: Number(form.watch('base_price')) > 0 && Number(form.watch('body_price')) > 0,
    queryFn: async () =>
      await profitProduct({
        base_price: form.watch('base_price'),
        body_price: form.watch('body_price'),
      }),
    queryKey: [REACT_QUERY_KEYS.MEASURES, form.watch('base_price'), form.watch('body_price')],
    onSuccess: res => {
      form.setValue('profit', res.data.profit_amount)
      form.setValue('margin', Number(res.data.margin.toFixed(2)))
    },
  })

  return (
    <>
      <InputPriceFormat
        disabled
        name='profit'
        label='profit'
        placeholder='0.00'
        control={form.control}
      />
      <Input
        disabled
        fullWidth
        name='margin'
        label='marjin'
        control={form.control}
        placeholder='0.00'
        InputProps={{
          startAdornment: (
            <InputAdornment position='end'>
              <Typography variant='text' color={theme => theme.palette.allColors.PURPLE}>
                %
              </Typography>
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}
