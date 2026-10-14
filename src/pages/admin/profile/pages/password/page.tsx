import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { InputPassword } from '@/components/inputs/input-password'

const Page = () => {
  const { t } = useTranslation()
  const { form, onSubmit, isLoading, handleCancel } = usePage()

  return (
    <Stack p='24px 32px' maxWidth='478px' component='form' onSubmit={form.handleSubmit(onSubmit)}>
      <Typography mb='25px' variant='title10' component='h3'>
        {t('change_password')}
      </Typography>
      <Stack gap='28px'>
        <InputPassword
          fullWidth
          control={form.control}
          placeholder='password'
          name='current_password'
          label='enter_current_password'
          onChange={e => {
            const cleaned = e.target.value.replace(/\s/g, '')
            form.setValue('current_password', cleaned, { shouldValidate: true })
          }}
        />
        <InputPassword
          fullWidth
          name='new_password'
          control={form.control}
          placeholder='password'
          label='create_new_password'
          onChange={e => {
            const cleaned = e.target.value.replace(/\s/g, '')
            form.setValue('new_password', cleaned, { shouldValidate: true })
          }}
        />
        <InputPassword
          fullWidth
          name='confirm_password'
          placeholder='password'
          control={form.control}
          label='repeat_new_password'
          onChange={e => {
            const cleaned = e.target.value.replace(/\s/g, '')
            form.setValue('confirm_password', cleaned, { shouldValidate: true })
          }}
        />
      </Stack>
      <Stack alignItems='flex-end'>
        <Stack mt='48px' gap='14px' width='100%' direction='row' maxWidth='360px'>
          <Button fullWidth size='small' variant='outlined-transparent' onClick={handleCancel}>
            {t('cancel')}
          </Button>
          <LoadingButton
            fullWidth
            size='small'
            type='submit'
            variant='contained'
            loading={isLoading}
          >
            {t('save_changes')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Page
