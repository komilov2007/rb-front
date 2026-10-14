import { styled } from '@mui/material/styles'

export const Header = styled('header')`
  gap: 12px;
  padding: 10px;
  display: flex;
  margin: 18px 0;
  border-radius: 6px;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
`

export const WrapSelectedUsers = styled('div')`
  display: flex;
  padding: 9px 20px;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.allColors.PURPLE10};
`
