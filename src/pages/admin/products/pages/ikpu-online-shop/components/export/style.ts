import { styled } from '@mui/material/styles'

export const Conatiner = styled('div')`
  display: flex;
  padding: 22px 24px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY220-D-GRAY40']};
`
