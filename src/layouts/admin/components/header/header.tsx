import { Container } from './style'
import { Sidebar } from '../sidebar'
import Stack from '@mui/material/Stack'
import { Help } from '@/components/help'
import { Breadcrumbs } from '../breadcrumbs'
import { Balance } from '@/components/balance'
import { Account } from '@/components/account'
import { useProfileStore } from '@/store/profile'
import { Notification } from '@/components/notification'
import { SelectI18nLanguage } from '@/components/selects/select-i18n-language'

export const Header = () => {
  const is_admin = useProfileStore(state => state.me?.is_admin)

  return (
    <Container>
      <Stack width='100%' direction='row' alignItems='center' justifyContent='space-between'>
        <Stack>
          <Stack
            gap='10px'
            direction='row'
            alignItems='center'
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <SelectI18nLanguage variant='header' />
          </Stack>
          <Sidebar variant='menu' />
        </Stack>
        <Stack gap={{ xs: '10px', sm: '20px' }} direction='row' alignItems='center'>
          {is_admin && <Balance variant='header' />}
          <Stack
            gap='20px'
            direction='row'
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <Help />
            <Notification />
          </Stack>
          <Account varaint='header' />
        </Stack>
      </Stack>
      <Stack>
        <Breadcrumbs />
      </Stack>
    </Container>
  )
}
