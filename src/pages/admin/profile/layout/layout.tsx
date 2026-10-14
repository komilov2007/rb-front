import { Wrapper } from './style'
import Stack from '@mui/material/Stack'
import { Outlet } from 'react-router-dom'
import { Account } from '@/components/account'
import { Spinner } from '@/components/spinner'
import { Suspense } from '@/components/suspense'
import { useProfileStore } from '@/store/profile'
import { PolicyGeneral } from '@/components/policy-general'

export const Layout = () => {
  const isLoading = useProfileStore(state => state.isLoading)

  return (
    <Stack
      gap='18px'
      width='100%'
      flexGrow={1}
      direction='row'
      className='transparent'
      sx={{ height: '100%', overflow: 'hidden' }}
    >
      {isLoading ? (
        <Spinner center />
      ) : (
        <>
          <Wrapper
            sx={{
              p: '23px 20px',
              maxWidth: '304px',
              justifyContent: 'space-between',
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <Stack>
              <Account varaint='sidebar' />
            </Stack>
            <PolicyGeneral />
          </Wrapper>
          <Wrapper sx={{ overflowY: 'auto' }}>
            <Suspense>
              <Outlet />
            </Suspense>
          </Wrapper>
        </>
      )}
    </Stack>
  )
}
