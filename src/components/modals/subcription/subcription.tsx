import Stack from '@mui/material/Stack'
import { Link, useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { ReactComponent as IconLimit } from '@/assets/icons/limit.svg'

interface SubcriptionProps {
  variant: 'dialog' | 'drawer'
  title?: string
  text?: string
  value?: string
  description?: string
}

export const Subcription = (props: SubcriptionProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { subscription, subscriptionModal, setSubscriptionModal, textObj } = useProfileStore(
    state => ({
      subscription: state.me?.subscription,
      subscriptionModal: state.subscriptionModal,
      setSubscriptionModal: state.setSubscriptionModal,
      textObj: state.textObj,
    }),
  )

  const handleClose = () => {
    setSubscriptionModal(false)
  }

  const handleLearnMoreClick = () => {
    handleClose()
    navigate(`${ROUTER.ADMIN}/${ROUTER.PRICING_PLAN}`)
  }

  if (props.variant === 'drawer') {
    return (
      <Stack height='100%' p='30px' alignItems='center' justifyContent='center'>
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{
            svg: {
              width: { xs: '50%', md: '100%' },
              height: { xs: '50%', md: '100%' },
            },
          }}
        >
          <IconLimit />
        </Stack>
        <Typography align='center' m='50px 0 10px' width={'60%'} variant='title70' fontSize='20px'>
          {props.title ? t(props.title) : t('expand_your_possibilities')}
        </Typography>
        {props.text && (
          <Typography
            align='center'
            variant='text30'
            maxWidth='600px'
            mb={{ xs: '2px', md: '4px' }}
          >
            {t(props.text)}
          </Typography>
        )}
        <Typography
          align='center'
          variant='text30'
          maxWidth='600px'
          mb={{ xs: '15px', md: '35px' }}
        >
          {props.description
            ? t(props.description, { value: props.value })
            : subscription?.tariff === 'START'
              ? t(
                  'gain_access_to_advanced_features_and_tools_for_your_business_choose_the_professional_or_enterprise_plans_to_enjoy_all_the_benefits',
                )
              : t('pro_plans_to_enjoy_all_the_benefits')}
        </Typography>
        <Button
          component={Link}
          size='mediumSmall'
          sx={{ minWidth: '147px' }}
          to={`${ROUTER.ADMIN}/${ROUTER.PRICING_PLAN}`}
        >
          {t('learn_more')}
        </Button>
      </Stack>
    )
  }

  return (
    <Dialog scroll='body' open={subscriptionModal} onClose={handleClose}>
      <Stack height='100%' p='30px' alignItems='center' justifyContent='center'>
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{
            svg: {
              width: { xs: '50%', md: '100%' },
              height: { xs: '50%', md: '100%' },
            },
          }}
        >
          <IconLimit />
        </Stack>
        <Typography align='center' m='50px 0 10px' variant='title70' fontSize='20px'>
          {textObj?.title ? t(textObj.title) : t('expand_your_possibilities')}
        </Typography>
        {textObj?.text && (
          <Typography
            align='center'
            variant='text30'
            maxWidth='600px'
            mb={{ xs: '2px', md: '4px' }}
          >
            {t(textObj.text)}
          </Typography>
        )}
        <Typography
          align='center'
          variant='text30'
          maxWidth='600px'
          mb={{ xs: '15px', md: '35px' }}
        >
          {textObj?.description
            ? t(textObj.description, { value: textObj?.value })
            : subscription?.tariff === 'START'
              ? t(
                  'gain_access_to_advanced_features_and_tools_for_your_business_choose_the_professional_or_enterprise_plans_to_enjoy_all_the_benefits',
                )
              : t('pro_plans_to_enjoy_all_the_benefits')}
        </Typography>
        <Button size='mediumSmall' sx={{ minWidth: '147px' }} onClick={handleLearnMoreClick}>
          {t('learn_more')}
        </Button>
      </Stack>
    </Dialog>
  )
}
