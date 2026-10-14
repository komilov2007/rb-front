import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { Platform } from '@/components/platform'
import { Input } from '@/components/inputs/input'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { UploadLogo } from '@/components/uploads/upload-logo'
import { InputTextarea } from '@/components/inputs/input-textarea'

const Page = () => {
  const { t } = useTranslation()
  const { form, values, onSubmit, isLoading, handleCancel } = usePage()

  return (
    <Stack gap='20px' maxWidth='740px' component='form' onSubmit={form.handleSubmit(onSubmit)}>
      <Stack>
        <Typography htmlFor='favicon' component='label'>
          {t('add_favicon_website_icon')}
        </Typography>
        <UploadLogo name='favicon' control={form.control} />
      </Stack>
      <Stack gap='10px' direction='row' alignItems='center'>
        <Input
          fullWidth
          name='title'
          label='site_name'
          control={form.control}
          placeholder='enter_site_name'
        />
        <Stack
          mt='23px'
          width='30px'
          target='_blank'
          component={Link}
          to={`https://${values.is_sub ? `${values.domain}.${values.origin}` : values.domain}`}
        >
          <Platform platform='WEBSITE' />
        </Stack>
      </Stack>
      <InputTextarea
        name='description'
        label='description'
        control={form.control}
        sx={{ height: '150px' }}
        placeholder='type_description_about_your_site'
      />
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
