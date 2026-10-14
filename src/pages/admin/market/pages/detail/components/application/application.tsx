import { useApplication } from './useApplication'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { getIntegrationConfig } from './constants'
import { FormPartnerApp } from '@/components/forms/partner-app'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'

export const Application = (props: RoboMarketAppDetaiProps) => {
  const { t } = useTranslation()
  const { modal, application, handleClick } = useApplication(props)
  const config = getIntegrationConfig({
    props,
    onClose: modal.setFalse,
  })

  if (props.partner_slug) {
    return <FormPartnerApp {...props} />
  }

  if (!config.content) {
    return (
      <LoadingButton
        onClick={handleClick}
        variant='outlined-purple'
        loading={application.isLoading}
      >
        {t(config.actionType)}
      </LoadingButton>
    )
  }

  return (
    <>
      {config.hasDrawer ? (
        <>
          <LoadingButton
            onClick={handleClick}
            variant='outlined-purple'
            loading={application.isLoading}
          >
            {t(config.actionType)}
          </LoadingButton>
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
            {config.content}
          </SwipeableDrawer>
        </>
      ) : (
        config.content
      )}
    </>
  )
}
