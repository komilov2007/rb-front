import { styled } from '@mui/material/styles'

export const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  border-radius: 12px;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY320};
  background-color: ${({ theme }) => theme.palette.colors['L-WHITE-D-GRAY40']};
  box-shadow: 0px 0px 48px 0px ${({ theme }) => theme.palette.allColors.GRAY120};
`
