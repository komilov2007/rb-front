import { usePage } from './usePage'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { AUTH_TABS, AUTH_TABS_LIST } from '@/constants/auth'
import { InputPhone } from '@/components/inputs/input-phone'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { pastedPhone } from '@/utils/clipboard'

const Page = () => {
  const { t } = useTranslation()
  const { form, onSubmit, isLoading, onChangeTab } = usePage()

  return (
    <Box
      width='100%'
      display='flex'
      component='form'
      justifyContent='center'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Box width='100%' maxWidth='478px'>
        <Typography mb='5px' variant='title' component='h1'>
          {t('recover_password')}
        </Typography>
        <Tabs
          sx={{ mb: '23px' }}
          variant='fullWidth'
          aria-label='sign-up'
          onChange={onChangeTab}
          value={form.watch('tab')}
        >
          {AUTH_TABS_LIST.map(({ value, label }) => (
            <Tab key={value} value={value} label={t(label)} />
          ))}
        </Tabs>
        {form.watch('tab') === AUTH_TABS.phone.value && (
          <InputPhone
            fullWidth
            name='phone'
            label='phone_number'
            control={form.control}
            autoComplete='username'
            placeholder='enter_phone_number'
            onPaste={async event => {
              form.setValue('phone', await pastedPhone(event))
            }}
          />
        )}
        {form.watch('tab') === AUTH_TABS.email.value && (
          <Input
            fullWidth
            name='email'
            label='email_address'
            control={form.control}
            autoComplete='username'
            placeholder='enter_email'
          />
        )}
        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isLoading}
          sx={{ mt: { xs: '50px', md: '77px' } }}
        >
          {t('submit')}
        </LoadingButton>
        <Box mt='10px' display='flex' justifyContent='center'>
          <Button
            size='small'
            component={Link}
            to={ROUTER.AUTH}
            variant='text-gray'
            startIcon={<IconArrowLeft />}
          >
            {t('back')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Page
