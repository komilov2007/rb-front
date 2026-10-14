import { WrapButton } from './style'
import Menu from '@mui/material/Menu'
import Stack from '@mui/material/Stack'
import { useChatStore } from '@/store/chat'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { useState, type MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { CHAT_PLATFORMS } from '@/constants/chat'
import { type ChatPlatformProps } from '@/types/chat'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

export const Platforms = () => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { platform, setPlatform } = useChatStore(state => ({
    platform: state.platform,
    setPlatform: state.setPlatform,
  }))
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleMenu = (p: ChatPlatformProps) => () => {
    setPlatform(p)
    handleClose()
  }

  return (
    <>
      <Stack gap='8px' direction='row' alignItems='center'>
        <Typography variant='title30' component='h5'>
          {t(CHAT_PLATFORMS[platform].title)}
        </Typography>
        <WrapButton open={open}>
          <IconButton
            id='platform-button'
            aria-haspopup='true'
            onClick={handleClick}
            aria-expanded={open ? 'true' : undefined}
            aria-controls={open ? 'platform-menu' : undefined}
          >
            <IconDirectionDown />
          </IconButton>
        </WrapButton>
      </Stack>
      <Menu
        open={open}
        id='platform-menu'
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'platform-button',
        }}
      >
        {Object.values(CHAT_PLATFORMS).map(p => (
          <MenuItem key={p.value} selected={p.value === platform} onClick={handleMenu(p.value)}>
            {t(p.label)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
