import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'

const Page = () => {
  const { t } = useTranslation()
  const { form, onSubmit, isLoading, handleCancel } = usePage()

  return (
    <Stack maxWidth='740px' component='form' onSubmit={form.handleSubmit(onSubmit)}>
      <Stack gap='20px'>
        <Input
          fullWidth
          name='google'
          control={form.control}
          label='google_analytics'
          placeholder='enter_google_analytics'
        />
        <Input
          fullWidth
          name='google_tag'
          control={form.control}
          label='google_tag_manager_id'
          placeholder='enter_google_tag_manager_id'
        />
        <Input
          fullWidth
          name='facebook'
          label='Facebook'
          control={form.control}
          placeholder='enter_facebook'
        />
        <Input
          fullWidth
          name='yandex'
          label='yandex'
          control={form.control}
          placeholder='enter_yandex'
        />
      </Stack>
      <Stack width='100%' alignItems='flex-end'>
        <Stack mt='50px' gap='14px' width='100%' direction='row' maxWidth='316px'>
          <Button fullWidth variant='outlined-transparent' onClick={handleCancel}>
            {t('cancel')}
          </Button>
          <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
            {t('submit')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Page
