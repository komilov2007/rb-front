import { Wrapper } from './style'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { ReactComponent as IconRedo } from '@/assets/icons/redo.svg'
import { DeleteTelegramBot } from '@/components/deletes/telegram-bot'
import { ReactComponent as IconPause } from '@/assets/icons/pause.svg'

const Page = () => {
  const { t } = useTranslation()
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('telegram_bot', 'can_edit'),
      can_delete: state.getPermission('telegram_bot', 'can_delete'),
    }
  })
  const {
    form,
    onSubmit,
    handleStop,
    handleUpdate,
    handleRestart,
    defaultValues,
    isLoadingStop,
    isLoadingToken,
    isLoadingRestart,
  } = usePage()

  return (
    <Stack gap='26px' maxWidth='776px'>
      <Stack
        gap='31px'
        component='form'
        onSubmit={form.handleSubmit(onSubmit)}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'unset' }}
      >
        <Input fullWidth name='token' control={form.control} placeholder='enter_token' />
        {can_edit && (
          <div>
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isLoadingToken}
              sx={{
                minWidth: '146px',
                maxWidth: { xs: '146px', md: '100%' },
              }}
            >
              {t('save')}
            </LoadingButton>
          </div>
        )}
      </Stack>
      <Stack gap={{ xs: '12px', md: '22px' }}>
        <Wrapper>
          <Stack gap='5px'>
            <Typography variant='title10' fontSize='16px'>
              {t('restart_the_bot')}
            </Typography>
            <Typography variant='text80' maxWidth='329px'>
              {t('in_this_section_you_can_restart_the_bot_without_affecting_any_data')}
            </Typography>
          </Stack>
          <Stack alignItems='flex-end'>
            <LoadingButton
              fullWidth
              size='large'
              onClick={handleRestart}
              startIcon={<IconRedo />}
              variant='contained-green'
              loading={isLoadingRestart}
              sx={theme => ({
                maxWidth: '177px',
                svg: {
                  path: {
                    stroke: theme.palette.colors['L-WHITE-D-GRAY40'],
                  },
                },
              })}
            >
              {t('reload')}
            </LoadingButton>
          </Stack>
        </Wrapper>
        {defaultValues.is_active && can_edit && (
          <Wrapper>
            <Stack gap='5px'>
              <Typography variant='title10' fontSize='16px'>
                {t('stop_the_bot')}
              </Typography>
              <Typography variant='text80' maxWidth='329px'>
                {t('in_this_section_you_can_stop_the_bot_without_affecting_any_data')}
              </Typography>
            </Stack>
            <Stack alignItems='flex-end'>
              <LoadingButton
                fullWidth
                size='large'
                onClick={handleStop}
                loading={isLoadingStop}
                startIcon={<IconPause />}
                variant='contained-green'
                sx={theme => ({
                  maxWidth: '148px',
                  background: theme.palette.allColors.GRAY30,
                  svg: {
                    path: {
                      fill: theme.palette.colors['L-WHITE-D-GRAY40'],
                    },
                  },
                  ':hover': {
                    background: theme.palette.allColors.GRAY30,
                  },
                })}
              >
                {t('stop')}
              </LoadingButton>
            </Stack>
          </Wrapper>
        )}
        {can_delete && (
          <Wrapper>
            <Stack gap='5px'>
              <Typography variant='title10' fontSize='16px'>
                {t('delete_the_bot')}
              </Typography>
              <Typography variant='text80' maxWidth='382px'>
                {t(
                  'note_that_if_you_delete_the_bot_all_data_categories_products_users_etc_will_be_deleted',
                )}
              </Typography>
            </Stack>
            <Stack alignItems='flex-end'>
              <DeleteTelegramBot variant='telegram-bot' handleUpdate={handleUpdate} />
            </Stack>
          </Wrapper>
        )}
      </Stack>
    </Stack>
  )
}

export default Page
