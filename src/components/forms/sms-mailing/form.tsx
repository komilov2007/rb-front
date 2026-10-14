import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useSmsMailing } from './useSmsMailing'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export const FormSmsMailing = () => {
  const { t, form, value, setTrue, setFalse, onSubmit, isLoading } = useSmsMailing()

  return (
    <>
      <Button
        onClick={setTrue}
        startIcon={<IconPlus />}
        sx={theme => ({
          svg: {
            path: {
              stroke: theme.palette.allColors.WHITE,
            },
          },
        })}
      >
        {t('create_sms')}
      </Button>
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
          <Box
            display='flex'
            p='7px 7px 0 32px'
            component='header'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='title30'>{t('add_new_template')}</Typography>
            <IconButton onClick={setFalse}>
              <IconRemove />
            </IconButton>
          </Box>
          <Box className='content'>
            <Stack gap='10px'>
              <Stack gap='5px'>
                <Typography variant='text210'>
                  {t('template_text_Enter_text_in_latin_alphabet')}
                </Typography>
                <Typography variant='text'>
                  {t('sms_messages_are_moderated_from_1_hour_to_1_business_day')}
                </Typography>
              </Stack>
              <Input
                fullWidth
                name='template_name'
                label='template_name'
                control={form.control}
                placeholder='enter_template_name'
              />
              <InputTextarea
                name='template_text'
                label='template_text'
                control={form.control}
                sx={{ height: '130px' }}
                placeholder='enter_template_text'
                labelMinimum={`${form.watch('template_text')?.length}/160`}
              />
            </Stack>
          </Box>
          <Box className='footer'>
            <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
              <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                {t('cancel')}
              </Button>
              <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                {t('save')}
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
