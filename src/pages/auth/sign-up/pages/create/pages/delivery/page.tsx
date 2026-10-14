import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { previewNext } from '@/apis/admin/shop'
import { useSignUpStore } from '@/store/sign-up'
import LoadingButton from '@mui/lab/LoadingButton'
import { PickUp } from '@/components/forms/pick-up'
import { useMutation } from '@tanstack/react-query'
import { useCategories } from '@/hooks/useCategories'
import { Delivery } from '@/components/forms/delivery'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'

const Page = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { hasCategory } = useCategories()
  const { pathname } = useLocation()
  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP
  const { step, setStep } = useSignUpStore(state => ({ step: state.step, setStep: state.setStep }))

  const { mutate, isLoading } = useMutation({
    mutationFn: previewNext,
    onSuccess: () => {
      const newStep = step + 1
      setStep(newStep)
      navigate(`${PATH}/${ROUTER.CREATE_PREVIEW}`)
      toast.success(t('delivery_type_saved'))
    },
  })

  const handleSubmit = () => {
    mutate()
  }

  return (
    <Box>
      <Stack gap='20px' component='ul'>
        <Stack width='100%' component='li' alignItems='center'>
          <PickUp />
        </Stack>
        <Stack width='100%' component='li' alignItems='center'>
          <Delivery />
        </Stack>
      </Stack>
      <Box
        pr='50px'
        gap='20px'
        width='100%'
        display='flex'
        alignItems='center'
        justifyContent='flex-end'
        sx={theme => ({
          mt: '115px',
          [theme.breakpoints.down('md')]: {
            pr: '0',
            mt: '20px',
          },
        })}
      >
        <Button
          size='large'
          component={Link}
          variant='text-gray'
          startIcon={<IconArrowLeft />}
          to={
            hasCategory ? `${PATH}/${ROUTER.CREATE_PRODUCT}` : `${PATH}/${ROUTER.CREATE_CATEGORY}`
          }
        >
          {t('back')}
        </Button>
        <LoadingButton
          fullWidth
          size='large'
          variant='contained'
          loading={isLoading}
          onClick={handleSubmit}
          sx={{ maxWidth: '190px' }}
        >
          {t('next')}
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default Page
