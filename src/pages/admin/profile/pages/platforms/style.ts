import { styled } from '@mui/material/styles'

export const Card = styled('li')`
  width: 100%;
  border-radius: 8px;
  padding: 18px 24px 24px;
  background: ${({ theme }) => theme.palette.allColors.GRAY};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY60};
`

export const Platforms = styled('ul')`
  gap: 16px;
  display: flex;
  margin-top: 13px;
  padding-top: 18px;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.palette.allColors.GRAY130};
`
