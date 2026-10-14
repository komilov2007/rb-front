import { styled } from '@mui/material/styles'

export const Card = styled('li')`
  padding: 5px;
  display: flex;
  max-height: 52px;
  border-radius: 9px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY60};
`
