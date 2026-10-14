import Box from '@mui/material/Box'
import { Container } from './style'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'

export const Breadcrumbs = () => {
  const { t } = useTranslation()
  const { breadcrumbs } = useBreadcrumbs()

  if (breadcrumbs.length < 2) {
    return null
  }

  return (
    <Container>
      {breadcrumbs.map(({ text, href }, i) => {
        return (
          <Box key={href} component='li' display='flex' alignItems='center'>
            {i === breadcrumbs.length - 1 ? (
              <Typography
                variant='text90'
                fontWeight='500'
                color={theme => theme.palette.colors['L-BLUE10-D-PURPLE10']}
              >
                {t(text as string)}
              </Typography>
            ) : (
              <>
                <Typography to={href} variant='text90' component={Link}>
                  {t(text as string)}
                </Typography>
                <Typography variant='text90' mx='13px' component='span'>
                  /
                </Typography>
              </>
            )}
          </Box>
        )
      })}
    </Container>
  )
}
