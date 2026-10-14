import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import { useFilter } from './useFilter'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { numberFormat } from '@/utils/number-format'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconFilter } from '@/assets/icons/filter.svg'
import { InputPriceFormat } from '@/components/inputs/input-price-format'
import {
  SUM_MAX,
  MARJA_MAX,
  ASTATKA_MAX,
  SUM_MIN_DISTANCE,
  MARJA_MIN_DISTANCE,
  ASTATKA_MIN_DISTANCE,
} from './form.schema'

export const Filter = () => {
  const { t } = useTranslation()
  const {
    form,
    value,
    setTrue,
    currency,
    setFalse,
    onSubmit,
    onReset,
    handleChange,
    activeFilterCount,
  } = useFilter()

  return (
    <>
      <Badge badgeContent={activeFilterCount} color='primary'>
        <IconButton color='outline' onClick={setTrue}>
          <IconFilter />
        </IconButton>
      </Badge>
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <FormProvider {...form}>
          <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <Box
              display='flex'
              p='7px 7px 0 32px'
              component='header'
              alignItems='center'
              justifyContent='space-between'
            >
              <div />
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack gap='25px'>
                <Stack gap='15px'>
                  <Typography variant='title30'>{t('price')}</Typography>
                  <Stack>
                    <Stack direction='row' justifyContent='space-between'>
                      <Typography variant='title20' fontSize='12px'>
                        0 {currency}
                      </Typography>
                      <Typography variant='title20' fontSize='12px'>
                        {numberFormat(SUM_MAX)} {currency}
                      </Typography>
                    </Stack>
                    <Slider
                      disableSwap
                      max={SUM_MAX}
                      onChange={handleChange('base_price', SUM_MIN_DISTANCE)}
                      value={[form.watch('base_price_from') ?? 0, form.watch('base_price_to') ?? 0]}
                    />
                  </Stack>
                  <Stack gap='15px' direction='row'>
                    <InputPriceFormat
                      label='from'
                      name='base_price_from'
                      control={form.control}
                      placeholder='enter_price'
                      InputProps={{ startAdornment: undefined }}
                    />
                    <InputPriceFormat
                      label='to'
                      name='base_price_to'
                      control={form.control}
                      placeholder='enter_price'
                      InputProps={{ startAdornment: undefined }}
                    />
                  </Stack>
                  <Divider />
                </Stack>
                <Stack gap='15px'>
                  <Typography variant='title30'>Astatka</Typography>
                  <Stack>
                    <Stack direction='row' justifyContent='space-between'>
                      <Typography variant='title20' fontSize='12px'>
                        {t('count_pcs', { count: 0 })}
                      </Typography>
                      <Typography variant='title20' fontSize='12px'>
                        {t('count_pcs', { count: ASTATKA_MAX })}
                      </Typography>
                    </Stack>
                    <Slider
                      disableSwap
                      max={ASTATKA_MAX}
                      onChange={handleChange('stock_amount', ASTATKA_MIN_DISTANCE)}
                      value={[
                        form.watch('stock_amount_from') ?? 0,
                        form.watch('stock_amount_to') ?? 0,
                      ]}
                    />
                  </Stack>
                  <Stack gap='15px' direction='row'>
                    <InputPriceFormat
                      label='from'
                      control={form.control}
                      name='stock_amount_from'
                      placeholder='enter_price'
                      InputProps={{ startAdornment: undefined }}
                    />
                    <InputPriceFormat
                      label='to'
                      name='stock_amount_to'
                      control={form.control}
                      placeholder='enter_price'
                      InputProps={{ startAdornment: undefined }}
                    />
                  </Stack>
                  <Divider />
                </Stack>
                <Stack gap='15px'>
                  <Typography variant='title30'>{t('marja')}</Typography>
                  <Stack>
                    <Stack direction='row' justifyContent='space-between'>
                      <Typography variant='title20' fontSize='12px'>
                        0 %
                      </Typography>
                      <Typography variant='title20' fontSize='12px'>
                        {MARJA_MAX} %
                      </Typography>
                    </Stack>
                    <Slider
                      disableSwap
                      max={MARJA_MAX}
                      onChange={handleChange('margin', MARJA_MIN_DISTANCE)}
                      value={[form.watch('margin_from') ?? 0, form.watch('margin_to') ?? 0]}
                    />
                  </Stack>
                  <Stack gap='15px' direction='row'>
                    <InputPriceFormat
                      label='from'
                      name='margin_from'
                      control={form.control}
                      placeholder='enter_price'
                      InputProps={{ startAdornment: undefined }}
                    />
                    <InputPriceFormat
                      label='to'
                      name='margin_to'
                      control={form.control}
                      placeholder='enter_price'
                      InputProps={{ startAdornment: undefined }}
                    />
                  </Stack>
                  <Divider />
                </Stack>
              </Stack>
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button
                  fullWidth
                  variant='outlined-transparent'
                  onClick={activeFilterCount > 0 ? onReset : setFalse}
                >
                  {t(activeFilterCount > 0 ? 'reset' : 'cancel')}
                </Button>
                <LoadingButton fullWidth type='submit' variant='contained'>
                  {t('show_results')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
