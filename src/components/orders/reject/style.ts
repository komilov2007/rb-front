import { styled } from '@mui/material/styles'

export const Label = styled('label')`
  display: flex;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  border-radius: 58px;
  align-items: center;
  padding: 13px 0 13px 18px;
  background: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
`
