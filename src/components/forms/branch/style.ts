import { styled } from '@mui/material/styles'

export const Card = styled('label')`
  width: 100%;
  padding: 5px;
  display: flex;
  cursor: pointer;
  max-height: 52px;
  user-select: none;
  border-radius: 9px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY60};
`
