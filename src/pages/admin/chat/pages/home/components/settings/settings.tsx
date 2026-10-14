import { Card } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { SETTINGS, useSettings } from './useSettings'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputSwitch } from '@/components/inputs/input-switch'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconSettingsFill } from '@/assets/icons/settings-fill.svg'

export const Settings = () => {
  const { t } = useTranslation()
  const can_edit = useProfileStore(state => state.getPermission('chat', 'can_edit'))
  const { form, value, setTrue, settings, setFalse, onSubmit, isLoading, handleOpen } =
    useSettings()

  return (
    <>
      <IconButton sx={{ p: 0 }} onClick={handleOpen}>
        <IconSettingsFill />
      </IconButton>
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
          <Box
            display='flex'
            p='7px 7px 0 32px'
            component='header'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='title30'>{t('chat_settings')}</Typography>
            <IconButton onClick={setFalse}>
              <IconRemove />
            </IconButton>
          </Box>
          <Box className='content'>
            {settings.isLoading || settings.isFetching ? (
              <Spinner center />
            ) : (
              <Stack gap='30px'>
                <Stack gap='12px' component='ul'>
                  {SETTINGS.map(s => (
                    <Card key={s.name}>
                      <InputSwitch
                        name={s.name}
                        label={s.label}
                        control={form.control}
                        labelPlacement='start'
                        sx={{
                          width: '100%',
                          justifyContent: 'space-between',
                          '.MuiTypography-root': {
                            fontWeight: 400,
                          },
                        }}
                      />
                    </Card>
                  ))}
                </Stack>
                {form.watch('auto_answer') && (
                  <InputTextarea
                    name='answer'
                    control={form.control}
                    label='chat_auto_answer'
                    sx={{ height: '155px' }}
                    placeholder='enter_auto_answer'
                  />
                )}
                <InputTextarea
                  name='answer_instagram'
                  control={form.control}
                  sx={{ height: '155px' }}
                  label='auto_answer_instagram'
                  placeholder='enter_auto_answer'
                />
              </Stack>
            )}
          </Box>
          {can_edit && (
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
          )}
        </Box>
      </SwipeableDrawer>
    </>
  )
}
