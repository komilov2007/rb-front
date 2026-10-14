import { Link } from './style'
import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'
import { useTranslation } from 'react-i18next'
import { useState, type MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { getTitle } from '@/constants/domain-themes'
import { ReactComponent as IconHelp } from '@/assets/icons/help.svg'
import { ReactComponent as IconSupport } from '@/assets/icons/support.svg'
import { ReactComponent as IconTelegramSolid } from '@/assets/icons/telegram-solid.svg'

export const Help = () => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-haspopup='true'
        onClick={handlePopoverOpen}
        aria-owns={open ? 'help-popover' : undefined}
      >
        <IconHelp />
      </IconButton>
      <Popover
        open={open}
        id='help-popover'
        onClick={handleClose}
        anchorEl={anchorEl}
        disableRestoreFocus
        sx={{
          pointerEvents: 'auto',
          zIndex: 200000,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: theme => ({
              mt: '13px',
              p: '20px 22px',
              minWidth: '290px',
              overflow: 'visible',
              borderRadius: '12px',
              background: theme.palette.colors['L-WHITE-D-GRAY40'],
              border: `1px solid ${theme.palette.allColors.GRAY70}`,
              boxShadow: `0px 2px 30px 0px ${theme.palette.allColors.GRAY80}`,
              '&:before': {
                top: 0,
                right: 10,
                width: 15,
                height: 15,
                content: '""',
                display: 'block',
                position: 'absolute',
                backgroundColor: 'inherit',
                transform: 'translateY(-50%) rotate(45deg)',
                borderTop: `1px solid ${theme.palette.allColors.GRAY70}`,
                borderLeft: `1px solid ${theme.palette.allColors.GRAY70}`,
                boxShadow: `0px 2px 30px 0px ${theme.palette.allColors.GRAY80}`,
              },
            }),
          },
        }}
      >
        <Stack gap='15px'>
          <Typography variant='title10'>{t('support')}</Typography>
          <Stack gap='10px'>
            <Link href={`tel:${getTitle().linkPhone}`}>
              <Stack justifyContent='center'>
                <IconSupport />
              </Stack>
              <Typography component='p' fontWeight='500'>
                {getTitle().phone}
              </Typography>
            </Link>
            <Link target='_blank' href={`https://t.me/${getTitle().telegram}`}>
              <Stack justifyContent='center'>
                <IconTelegramSolid />
              </Stack>
              <Typography fontWeight='500' component='p'>
                {t('contact_via_telegram')}
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Popover>
    </>
  )
}
