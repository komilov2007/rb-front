import Box from '@mui/material/Box'
import { type ReactNode } from 'react'
import { Container, type ContainerProps } from './style'
import { ReactComponent as IconInformation } from '@/assets/icons/information.svg'
import { ReactComponent as IconClose } from '@/assets/icons/close.svg'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

interface AlertProps extends ContainerProps {
  children: ReactNode
  close?: boolean
  onClickClose?: () => void
}

export const Alert = ({
  variant = 'success',
  size = 'lg',
  close = false,
  onClickClose,
  center,
  children,
}: AlertProps) => {
  const theme = useTheme()

  return (
    <Container center={center} variant={variant} size={size}>
      <Box
        sx={{
          display: 'flex',
          alignItems: center ? 'center' : 'self-start',
          gap: 1,
          mx: center ? 'auto' : 'block',
        }}
      >
        <IconButton>
          <IconInformation />
        </IconButton>
        <Box>{children}</Box>
      </Box>

      {close && (
        <IconButton onClick={onClickClose}>
          <IconClose fill={theme.palette.allColors.GRAY760} width={20} height={20} />
        </IconButton>
      )}
    </Container>
  )
}
