import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { List, WrapIcon } from './style'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { Trans, useTranslation } from 'react-i18next'
import { TabLanguages } from '@/components/tab-languages'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { ReactComponent as IconInformation } from '@/assets/icons/information.svg'
import { Input } from '@/components/inputs/input'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

const Page = () => {
  const { t } = useTranslation()
  const { copy } = useCopyToClipboard()
  const can_edit = useProfileStore(state => state.getPermission('telegram_bot', 'can_edit'))
  const { form, panels, onSubmit, isLoading, group_token, handleCancel } = usePage()
  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <Stack gap='23px'>
        <Stack>
          <InputTextarea
            name={p.start_text}
            control={form.control}
            sx={{ height: '150px' }}
            label='initial_text'
            placeholder='enter_text'
            labelMinimum={100}
          />
          <Stack gap='4px' mt='12px' direction='row' alignItems='center'>
            <WrapIcon>
              <IconInformation />
            </WrapIcon>
            <Typography variant='text60' fontSize='13px'>
              {t('this_text_appears_when_you_press_the_start_button_for_the_first_time')}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <Input
            name={p.button}
            control={form.control}
            placeholder='enter_text'
            label='button_name'
          />
          <Stack gap='4px' mt='12px' direction='row' alignItems='center'>
            <WrapIcon>
              <IconInformation />
            </WrapIcon>
            <Typography variant='text60' fontSize='13px'>
              text
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    ),
  }))

  return (
    <Stack component='form' onSubmit={form.handleSubmit(onSubmit)} maxWidth='740px'>
      <Typography mb='9px' variant='title10' component='h2'>
        {t('forwarding_orders_to_the_telegram_group')}
      </Typography>
      <Typography variant='text70' maxWidth='500px'>
        {t(
          'if_you_want_notifications_about_new_orders_from_your_store_to_be_sent_to_a_specific_telegram_group_follow_these_steps',
        )}
      </Typography>
      <List>
        <Typography
          variant='text'
          lineHeight='27px'
          color={theme => theme.palette.colors['L-BLACK50-D-WHITE20']}
        >
          1.{t('add_your_bot_to_the_required_group_and_grant_admin_rights')}
        </Typography>
        <Typography
          variant='text'
          lineHeight='27px'
          color={theme => theme.palette.colors['L-BLACK50-D-WHITE20']}
        >
          2.
          <Trans
            i18nKey='copy_this_token_and_send_it_to_the_group'
            values={{ value: group_token }}
            components={{
              linkTag: (
                <Typography
                  mx='3px'
                  variant='inherit'
                  component='span'
                  onClick={copy(group_token)}
                  color={theme => theme.palette.allColors.PURPLE10}
                  sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                />
              ),
            }}
          />
        </Typography>
        <Typography
          variant='text'
          lineHeight='27px'
          color={theme => theme.palette.colors['L-BLACK50-D-WHITE20']}
        >
          3.{t('the_bot_understands_that_you_want_to_set_notifications_and_responds')}
        </Typography>
      </List>
      <Typography mb='12px' variant='title10'>
        {t('additional_settings')}
      </Typography>
      <TabLanguages panels={PANELS} />
      <Stack alignItems='flex-end' mt='115px'>
        <Stack gap='14px' width='100%' direction='row' justifyContent='flex-end'>
          <div>
            <Button
              fullWidth
              variant='outlined-transparent'
              onClick={handleCancel}
              sx={{ minWidth: '170px' }}
            >
              {t('cancel')}
            </Button>
          </div>
          {can_edit && (
            <div>
              <LoadingButton
                fullWidth
                type='submit'
                loading={isLoading}
                variant='contained'
                sx={{ minWidth: '170px' }}
              >
                {t('save_changes')}
              </LoadingButton>
            </div>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Page
