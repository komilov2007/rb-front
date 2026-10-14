import { InfoCard } from './style'
import Button from '@mui/material/Button'
import { RobohubDialog } from './dialog'
import { useAuthorize } from './useAuthorize'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { ReactComponent as IconCheck } from '@/assets/icons/check-circle-primary.svg'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'

const SCOPES = [
  'view_your_store_details_products_and_orders',
  'create_and_update_orders_on_your_behalf',
  'you_can_revoke_this_access_at_any_time_from_robo_market',
]

export const Authorize = (props: RoboMarketAppDetaiProps) => {
  const { t } = useTranslation()
  const { modal, authorize, handleAllow, isEnabled, host } = useAuthorize(props)

  if (!isEnabled) return null

  return (
    <RobohubDialog
      icon={props.icon}
      open={modal.value}
      onClose={modal.setFalse}
      title={t('name_requests_access_to_your_robosell_account', { name: props.name })}
      description={t('review_what_the_application_will_be_able_to_do_before_you_continue')}
      actions={
        <>
          <LoadingButton
            fullWidth
            size='small'
            onClick={handleAllow}
            variant='outlined-purple'
            loading={authorize.isLoading}
          >
            {t('allow')}
          </LoadingButton>
          <Button fullWidth size='small' variant='contained' onClick={modal.setFalse}>
            {t('cancel')}
          </Button>
        </>
      }
    >
      <InfoCard>
        {SCOPES.map(scope => (
          <li key={scope}>
            <IconCheck />
            {t(scope)}
          </li>
        ))}
      </InfoCard>
      <Typography mt='12px' align='center' component='p' variant='text60'>
        {t('you_will_be_redirected_to')} {host}
      </Typography>
    </RobohubDialog>
  )
}
