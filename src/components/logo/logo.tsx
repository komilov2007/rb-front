import Box from '@mui/material/Box'
import { getUser } from '@/utils/user'
import { Link } from 'react-router-dom'
import { ROUTER } from '@/constants/router'
import { useMenuStore } from '@/store/menu'
import { useProfileStore } from '@/store/profile'
import { getDomainLogo } from '@/constants/domain-themes'

export interface ILogo {
  to?: string
  variant: 'auth' | 'admin'
}

export const Logo = ({ to, variant }: ILogo) => {
  const user = getUser()
  const { IconLogo, IconLogoSolid } = getDomainLogo()
  const isMenuOpen = useMenuStore(state => state.isMenuOpen)
  const isMultibank = useProfileStore(state => state.isMultibank)
  const isAuth = variant === 'auth'
  const url =
    (to ?? isAuth)
      ? user?.access && user?.shop
        ? `${ROUTER.ADMIN}/${ROUTER.DASHBOARD}`
        : ROUTER.AUTH
      : `${ROUTER.ADMIN}/${ROUTER.DASHBOARD}`

  return (
    <Box
      sx={theme => ({
        '&,a': {
          display: 'flex',
          width: 'fit-content',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          justifyContent: 'center',
        },
        svg: {
          path: {
            fill:
              isMultibank && isMenuOpen
                ? theme.palette.allColors.GREEN80
                : isAuth
                  ? theme.palette.allColors.WHITE
                  : null,
          },
        },
      })}
    >
      <Link to={url} aria-label='Go to Home' title='Go to Home'>
        {isMenuOpen || isAuth ? (
          <Box display='flex' alignItems='center'>
            <Box display={{ md: 'flex', xs: 'flex' }} alignItems='center' alignContent='center'>
              <IconLogo />
            </Box>
          </Box>
        ) : (
          <IconLogoSolid />
        )}
      </Link>
    </Box>
  )
}
