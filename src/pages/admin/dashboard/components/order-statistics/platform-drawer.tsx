import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

interface Props {
  children: React.ReactNode
  buttonLabel: string
  appName: string
}

export const PlatformApplicationDrawer = ({ children, buttonLabel, appName }: Props) => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    setSubscriptionModal: state.setSubscriptionModal,
    subscription: state.me?.subscription,
  }))
  const { tariff } = subscription || {}

  const handleClick = () => {
    if (tariff === 'START' && appName !== 'Click') {
      setSubscriptionModal(true, {
        title: 'This_integration_is_available_only_on_Basic_and_Pro_plans',
        value: appName,
        description:
          'please_upgrade_to_Basic_or_Pro_and_unlock_full_access_to_platform_features_that_boost_your_business_efficiency',
      })
    } else {
      modal.setTrue()
    }
  }

  return (
    <>
      <Button size='extraSmall' onClick={handleClick}>
        {t(buttonLabel)}
      </Button>
      <SwipeableDrawer
        anchor='right'
        open={modal.value}
        onOpen={modal.setTrue}
        onClose={modal.setFalse}
      >
        <Box
          display='flex'
          p='7px 7px 0 32px'
          component='header'
          alignItems='center'
          justifyContent='flex-end'
        >
          <IconButton onClick={modal.setFalse}>
            <IconRemove />
          </IconButton>
        </Box>
        {children}
      </SwipeableDrawer>
    </>
  )
}
