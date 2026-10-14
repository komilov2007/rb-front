import { Icon } from './style'
import Box from '@mui/material/Box'
import { type ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

interface RobohubDialogProps {
  open: boolean
  icon: string
  title: string
  actions: ReactNode
  onClose: () => void
  status?: ReactNode
  children?: ReactNode
  description?: string
}

export const RobohubDialog = ({
  open,
  icon,
  title,
  status,
  actions,
  onClose,
  children,
  description,
}: RobohubDialogProps) => (
  <Dialog
    open={open}
    scroll='body'
    onClose={onClose}
    PaperProps={{ sx: { width: '100%', maxWidth: { xs: 'calc(100% - 32px)', md: '440px' } } }}
  >
    <Stack p='7px 7px 0 0' alignItems='flex-end'>
      <IconButton onClick={onClose}>
        <IconRemove />
      </IconButton>
    </Stack>
    <Stack alignItems='center' p={{ xs: '0 20px 24px', md: '0 32px 32px' }}>
      <Icon src={icon} alt={title} />
      <Typography mt='16px' align='center' component='h3' variant='title70'>
        {title}
      </Typography>
      {status && <Stack mt='10px'>{status}</Stack>}
      {description && (
        <Typography mt='10px' align='center' component='p' variant='text70'>
          {description}
        </Typography>
      )}
      {children && (
        <Stack mt='20px' width='100%'>
          {children}
        </Stack>
      )}
      <Box
        mt='24px'
        gap='14px'
        width='100%'
        display='flex'
        alignItems='center'
        justifyContent='center'
        maxWidth={{ xs: 'unset', md: '316px' }}
      >
        {actions}
      </Box>
    </Stack>
  </Dialog>
)
