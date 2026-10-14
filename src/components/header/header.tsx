import { Help } from '../help'
import { Logo } from '../logo'
import { Account } from '../account'
import Stack from '@mui/material/Stack'
import { type HocProps } from '@/types/hoc'
import { Notification } from '../notification'

export const Header = ({ children }: HocProps) => {
  return (
    <Stack
      direction='row'
      component='header'
      alignItems='center'
      justifyContent='space-between'
      sx={theme => ({
        padding: '2px 20px 2px 28px',
        backgroundColor: theme.palette.allColors.WHITE,
        borderBottom: `1px solid ${theme.palette.allColors.GRAY510}`,
        boxShadow: `0px 1px 4px 0px ${theme.palette.allColors.GRAY470}`,
      })}
    >
      <Logo variant='admin' />
      <Stack gap='12px' direction='row' alignItems='center'>
        {children}
      </Stack>
      <Stack gap='20px' direction='row' alignItems='center'>
        <Stack
          gap='20px'
          direction='row'
          height='fit-content'
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
  )
}
