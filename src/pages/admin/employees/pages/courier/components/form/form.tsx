import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputPhone } from '@/components/inputs/input-phone'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { useFormCourier, type FormEmployeeProps } from './useFormCourier'
import { pastedPhone } from '@/utils/clipboard'

export const Form = (props: FormEmployeeProps) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading, handleOpen } = useFormCourier(props)

  return (
    <>
      {props.variant === 'add' ? (
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
            {t('add_courier')}
          </Button>
        </>
      ) : (
        <IconButton radius='8px' onClick={setTrue}>
          <IconEdit />
        </IconButton>
      )}
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
              <Typography variant='title30'>
                {t(props.variant === 'add' ? 'add_courier' : 'edit_courier')}
              </Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack gap='24px'>
                <Input
                  fullWidth
                  name='firstname'
                  label='first_name'
                  control={form.control}
                  placeholder='enter_first_name'
                />
                <InputPhone
                  fullWidth
                  name='phone'
                  label='phone_number'
                  control={form.control}
                  placeholder='enter_phone_number'
                  onPaste={async event => {
                    form.setValue('phone', await pastedPhone(event))
                  }}
                />
              </Stack>
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton type='submit' fullWidth variant='contained' loading={isLoading}>
                  {t(props.variant === 'add' ? 'add' : 'edit')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
