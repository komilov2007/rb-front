import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { PLATFORMS_FORM } from '@/constants/busniness'
import { Controller, FormProvider } from 'react-hook-form'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { useFormPromoCode, type FormSourcerops } from './useFormSource'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export const FormSource = (props: FormSourcerops) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading, handleOpen } =
    useFormPromoCode(props)

  return (
    <>
      <>
        <Button
          onClick={handleOpen}
          startIcon={<IconPlus />}
          sx={theme => ({
            svg: {
              path: {
                stroke: theme.palette.allColors.WHITE,
              },
            },
          })}
        >
          {t('create_source')}
        </Button>
      </>
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
              <Typography variant='title30'>{t('add_source')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Controller
                name='platform'
                control={form.control}
                render={({ field, fieldState: { invalid } }) => (
                  <RadioGroup
                    {...field}
                    sx={theme => ({
                      mb: '37px',
                      svg: {
                        g: {
                          rect: {
                            stroke: invalid ? theme.palette.allColors.RED : undefined,
                          },
                        },
                      },
                    })}
                  >
                    {PLATFORMS_FORM.map(({ value, label }) => (
                      <FormControlLabel
                        key={value}
                        value={value}
                        label={t(label)}
                        control={<Radio />}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
              <Input
                fullWidth
                name='name'
                label='name'
                control={form.control}
                placeholder='enter_name'
              />
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton type='submit' fullWidth variant='contained' loading={isLoading}>
                  {t('add')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
