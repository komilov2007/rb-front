import { styled } from '@mui/material/styles'

export const Footer = styled('footer')`
  display: flex;
  padding: 13px;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 13px 13px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY810};
`
