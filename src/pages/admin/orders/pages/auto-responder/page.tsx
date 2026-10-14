import { panels } from './constants'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAutoResponder } from './useAutoResponder'
import { TabLanguages } from '@/components/tab-languages'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { Wrapper } from './style'

const Page = () => {
  const { t } = useTranslation()
  const can_edit = useProfileStore(state => state.getPermission('orders', 'can_edit'))
  const { form, isLoading, onSubmit, updateIsLoading } = useAutoResponder()
  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <Stack pt='15px' gap='30px' width='100%'>
        <Wrapper>
          <Typography variant='title10' fontSize='16px' whiteSpace='nowrap'>
            {t('order_accepted')}
          </Typography>
          <InputTextarea
            label=''
            name={p.accept}
            control={form.control}
            sx={{ minHeight: '80px' }}
            placeholder='Enter accept description'
          />
        </Wrapper>
        <Wrapper>
          <Typography variant='title10' fontSize='16px' whiteSpace='nowrap'>
            {t('order_is_in_process')}
          </Typography>
          <InputTextarea
            label=''
            name={p.progress}
            control={form.control}
            sx={{ minHeight: '80px' }}
            placeholder='enter_description'
          />
        </Wrapper>
        <Wrapper>
          <Typography variant='title10' fontSize='16px' whiteSpace='nowrap'>
            {t('the_order_is_ready')}
          </Typography>
          <InputTextarea
            label=''
            name={p.ready}
            control={form.control}
            sx={{ minHeight: '80px' }}
            placeholder='enter_description'
          />
        </Wrapper>
        <Wrapper>
          <Typography variant='title10' fontSize='16px' whiteSpace='nowrap'>
            {t('the_order_is_on_delivery')}
          </Typography>
          <InputTextarea
            label=''
            name={p.on_th_way}
            control={form.control}
            sx={{ minHeight: '80px' }}
            placeholder='enter_description'
          />
        </Wrapper>
        <Wrapper>
          <Typography variant='title10' fontSize='16px' whiteSpace='nowrap'>
            {t('the_order_has_been_delivered')}
          </Typography>
          <InputTextarea
            label=''
            name={p.delivered}
            control={form.control}
            sx={{ minHeight: '80px' }}
            placeholder='enter_description'
          />
        </Wrapper>
        <Wrapper>
          <Typography variant='title10' fontSize='16px' whiteSpace='nowrap'>
            {t('the_order_has_been_accepted')}
          </Typography>
          <InputTextarea
            label=''
            name={p.payed}
            control={form.control}
            sx={{ minHeight: '80px' }}
            placeholder='enter_description'
          />
        </Wrapper>
        <Wrapper>
          <Typography variant='title10' fontSize='16px' whiteSpace='nowrap'>
            {t('order_cancelled')}
          </Typography>
          <InputTextarea
            label=''
            name={p.cancel}
            control={form.control}
            sx={{ minHeight: '80px' }}
            placeholder='enter_description'
          />
        </Wrapper>
      </Stack>
    ),
  }))

  return (
    <Stack
      p='20px'
      height='100%'
      overflow='auto'
      component='form'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {isLoading ? (
        <Spinner center />
      ) : (
        <>
          <Typography mb='20px' variant='title30'>
            {t('push_notifications')}
          </Typography>
          <TabLanguages panels={PANELS} />
          <Stack
            mt='36px'
            pt='15px'
            gap='10px'
            justifyContent='space-between'
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            sx={theme => ({
              borderTop: `1px solid ${theme.palette.colors['L-GRAY10-D-BLACK20']}`,
            })}
          >
            <Typography variant='title10' fontSize='16px' whiteSpace='nowrap'>
              *{t('order_id')} ={' '}
              <Typography
                component='span'
                variant='inherit'
                color={theme => theme.palette.allColors.PURPLE10}
              >
                {t('order_number')}
              </Typography>
            </Typography>
            <Stack
              gap='14px'
              width='100%'
              direction='row'
              justifyContent='flex-end'
              maxWidth={{ xs: '100%', md: '340px' }}
            >
              <Button
                fullWidth
                component={Link}
                sx={{ minWidth: '170px' }}
                variant='outlined-transparent'
                to={`${ROUTER.ADMIN}/${ROUTER.ORDERS}`}
              >
                {t('back')}
              </Button>
              {can_edit && (
                <LoadingButton
                  fullWidth
                  type='submit'
                  variant='contained'
                  loading={updateIsLoading}
                  sx={{ minWidth: '170px' }}
                >
                  {t('save_changes')}
                </LoadingButton>
              )}
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default Page
