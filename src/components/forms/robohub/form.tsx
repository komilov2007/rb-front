import { Authorize } from './authorize'
import Button from '@mui/material/Button'
import { RobohubDialog } from './dialog'
import { Status, InfoCard, Step } from './style'
import LoadingButton from '@mui/lab/LoadingButton'
import { useFormRobohub } from './useFormRobohub'
import { type RoboMarketAppDetaiProps } from '@/types/robo-market'
import { ReactComponent as IconCheck } from '@/assets/icons/check-circle-primary.svg'

const ROBOHUB_INTEGRATION_URL = 'https://seller.robohub.uz/admin/integration'

const CONNECT_STEPS = [
  'open_the_integrations_page_in_robohub',
  'choose_robosell_and_confirm_access',
]

export const FormRobohub = (props: RoboMarketAppDetaiProps) => {
  const { t, modal, disconnect, handleClick } = useFormRobohub(props)
  const isConnected = !!props.is_connected

  return (
    <>
      <Button onClick={handleClick} variant='outlined-purple'>
        {t(isConnected ? 'connected' : 'connect')}
      </Button>
      <RobohubDialog
        icon={props.icon}
        title={props.name}
        open={modal.value}
        onClose={modal.setFalse}
        status={
          <Status active={isConnected}>{t(isConnected ? 'connected' : 'not_connected')}</Status>
        }
        description={t(
          isConnected
            ? 'your_store_is_connected_to_robohub_disconnecting_stops_syncing'
            : 'robohub_lets_you_manage_your_store_from_the_robohub_seller_panel',
        )}
        actions={
          <>
            {isConnected ? (
              <LoadingButton
                fullWidth
                size='small'
                variant='outlined-red'
                loading={disconnect.isLoading}
                onClick={() => {
                  disconnect.mutate()
                }}
              >
                {t('disconnect')}
              </LoadingButton>
            ) : (
              <Button
                fullWidth
                size='small'
                component='a'
                target='_blank'
                rel='noreferrer'
                variant='outlined-purple'
                href={ROBOHUB_INTEGRATION_URL}
              >
                {t('go_to_robohub')}
              </Button>
            )}
            <Button fullWidth size='small' variant='contained' onClick={modal.setFalse}>
              {t('close')}
            </Button>
          </>
        }
      >
        <InfoCard>
          {isConnected ? (
            <li>
              <IconCheck />
              {t('your_products_and_orders_stay_in_sync_with_robohub')}
            </li>
          ) : (
            CONNECT_STEPS.map((step, index) => (
              <li key={step}>
                <Step>{index + 1}</Step>
                {t(step)}
              </li>
            ))
          )}
        </InfoCard>
      </RobohubDialog>
      <Authorize {...props} />
    </>
  )
}
