import { useState } from 'react'
import Popover from '@mui/material/Popover'
import IconButton from '@mui/material/IconButton'
import Picker, { type EmojiClickData } from 'emoji-picker-react'
import { ReactComponent as IconEmoji } from '@/assets/icons/emoji.svg'

interface EmojiProps {
  open: boolean
  toggle: () => void
  onChange: (emoji: EmojiClickData, event: globalThis.MouseEvent) => void
}

export const Emoji = ({ open, toggle, onChange }: EmojiProps) => {
  const id = open ? 'emoji-popover' : undefined
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggle()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    toggle()
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <IconEmoji />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ zIndex: 99999999 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Picker skinTonesDisabled onEmojiClick={onChange} />
      </Popover>
    </>
  )
}
