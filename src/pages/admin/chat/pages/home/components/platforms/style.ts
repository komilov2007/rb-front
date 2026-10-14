import { styled } from '@mui/material/styles'

interface WrapButtonProps {
  open: boolean
}

export const WrapButton = styled('div')<WrapButtonProps>`
  button {
    padding: 0;
    width: 28px;
    height: 28px;
    transform: ${({ open }) => (open ? 'rotate(-180deg)' : 'rotate(0deg)')};
    background: ${({ theme }) => theme.palette.colors['L-PURPLE110-D-PURPLE20']};
    svg {
      width: 21px;
      height: 21px;
      path {
        stroke: ${({ theme }) => theme.palette.colors['L-BLUE10-D-WHITE']};
      }
    }
  }
`
