import { styled } from '@mui/material/styles'

export const Card = styled('li')`
  width: 100%;
  display: flex;
  border-radius: 8px;
  padding: 18px 24px;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.allColors.GRAY};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY60};
`
