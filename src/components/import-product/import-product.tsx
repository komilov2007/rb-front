import { Wrapper } from './style'
import Box from '@mui/material/Box'
import { Iiko } from '../forms/iiko'
import { Billz } from '../forms/billz'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconFileDownload } from '@/assets/icons/file-download.svg'
import { ProductsExcel } from '../forms/products-excel'

interface ImportPrdouctProps {
  handleUpdate: () => void
}

export const ImportPrdouct = (props: ImportPrdouctProps) => {
  const { t } = useTranslation()
  const { value, setTrue, setFalse } = useBoolean()

  const { setSubscriptionModal, is_free, is_expired, is_basic, is_new_version } = useProfileStore(
    state => ({
      setSubscriptionModal: state.setSubscriptionModal,
      is_free: state.me?.subscription.is_free,
      is_expired: state.me?.subscription.is_expired,
      is_basic: state.me?.subscription.is_basic,
      is_new_version: state.me?.is_new_version,
    }),
  )

  const hasAccess = (is_basic || is_expired) && !is_free

  const handleOpen = () => {
    const canOpen = !hasAccess

    canOpen ? setTrue() : setSubscriptionModal(true)
  }

  const handleUpdate = () => {
    setFalse()
    props.handleUpdate()
  }

  return (
    <>
      <Button fullWidth variant='outlined' onClick={handleOpen} startIcon={<IconFileDownload />}>
        {t('import')}
      </Button>
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
        <Box className='container'>
          <Box
            display='flex'
            p='7px 7px 0 32px'
            component='header'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='title30'>{t('import')}</Typography>
            <IconButton onClick={setFalse}>
              <IconRemove />
            </IconButton>
          </Box>
          <Box className='content'>
            <Stack gap='15px'>
              {is_new_version && (
                <Wrapper>
                  <ProductsExcel handleUpdate={handleUpdate} />
                </Wrapper>
              )}
              <Wrapper>
                <Billz handleUpdate={handleUpdate} />
              </Wrapper>
              <Wrapper>
                <Iiko handleUpdate={handleUpdate} />
              </Wrapper>
            </Stack>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
