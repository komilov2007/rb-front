import { styled } from '@mui/material/styles'

export const Container = styled('ul')`
  display: flex;
  margin-top: 12px;
  padding-top: 11px;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
`
