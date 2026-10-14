import { type HocProps } from '@/types/hoc'
import { useTranslation } from 'react-i18next'
import { Suspense } from '@/components/suspense'
import { Left, Right, Container } from './style'
import { type ParamProps } from '@/types/params'
import Typography from '@mui/material/Typography'
import { Outlet, useParams } from 'react-router-dom'

export const Hoc = ({ children }: HocProps) => {
  const { t } = useTranslation()
  const { chatId } = useParams<ParamProps>()

  if (chatId) {
    return (
      <Container>
        <Left
          sx={{
            display: { xs: 'none', md: 'unset' },
          }}
        >
          {children}
        </Left>
        <Right sx={{ display: 'flex' }}>
          <Suspense>
            <Outlet />
          </Suspense>
        </Right>
      </Container>
    )
  }

  return (
    <Container>
      <Left>{children}</Left>
      <Right
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <Typography variant='title30' component='h5'>
          {t('select_a_chat')}
        </Typography>
      </Right>
    </Container>
  )
}
