import { styled } from '@mui/material/styles'

export const Container = styled('div')<{ borderColor: string }>`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY320};
  border-top: 3px solid ${({ borderColor }) => borderColor};
  background-color: ${({ theme }) => theme.palette.colors['L-WHITE-D-GRAY40']};
  box-shadow: 0px 0px 48px 0px ${({ theme }) => theme.palette.allColors.GRAY120};
`

export const Dot = styled('span')<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  flex-shrink: 0;
`
