import { styled } from '@mui/material/styles'

export const Header = styled('header')`
  padding: 10px;
  display: flex;
  margin: 18px 0;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
`
