import { Hoc } from './hoc'
import { usePage } from './usePage'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { InputPassword } from '@/components/inputs/input-password'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'

const Page = () => {
  const { t } = useTranslation()
  const { form, onSubmit, isLoading } = usePage()

  return (
    <Hoc>
      <Box
        width='100%'
        component='form'
        onSubmit={form.handleSubmit(onSubmit)}
        display='flex'
        justifyContent='center'
      >
        <Box width='100%' maxWidth='478px'>
          <Typography mb='23px' variant='title' component='h1'>
            {t('reset_your_password')}
          </Typography>
          <Box mb='65px' gap='25px' display='flex' flexDirection='column'>
            <InputPassword
              fullWidth
              name='password'
              control={form.control}
              placeholder='password'
              label='create_new_password'
              onChange={e => {
                const cleaned = e.target.value.replace(/\s/g, '')
                form.setValue('password', cleaned, { shouldValidate: true })
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
          </Box>
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            loading={isLoading}
          >
            {t('submit')}
          </LoadingButton>
          <Box mt='10px' display='flex' justifyContent='center'>
            <Button
              size='small'
              to={ROUTER.AUTH}
              component={Link}
              variant='text-gray'
              startIcon={<IconArrowLeft />}
            >
              {t('back')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Hoc>
  )
}

export default Page
