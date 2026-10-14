import { styled } from '@mui/material/styles'

export const Container = styled('header')`
  gap: 10px;
  height: 60px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
`
