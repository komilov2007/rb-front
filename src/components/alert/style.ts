import { styled } from '@mui/material/styles'

export interface ContainerProps {
  center?: boolean
  variant?: 'info' | 'success'
  size?: 'sm' | 'lg'
}

export const Container = styled('div')<ContainerProps>`
  gap: 9px;
  display: flex;
  border-radius: 8px;
  ${({ theme, center, variant, size }) => ({
    padding: size === 'sm' ? '6px' : '14px',
    alignItems: center ? 'center' : undefined,
    justifyContent: center ? 'center' : undefined,
    border: variant === 'info' ? 'none' : `1px solid ${theme.palette.allColors.GREEN30}`,
    background:
      variant === 'info'
        ? `radial-gradient(circle,${theme.palette.allColors.WHITE}, ${theme.palette.allColors.WHITE}, ${theme.palette.allColors.PURPLE40}  60%)`
        : theme.palette.allColors.GREEN20,
    svg: {
      circle: {
        fill: variant === 'info' ? theme.palette.allColors.PURPLE : undefined,
      },
      path: {
        stroke: variant === 'info' ? theme.palette.allColors.PURPLE : undefined,
      },
    },
  })};
`
