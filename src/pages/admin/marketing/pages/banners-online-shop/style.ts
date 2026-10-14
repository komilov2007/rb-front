import { styled } from '@mui/material/styles'

export const Cards = styled('ul')`
  gap: 16px;
  display: flex;
  flex-wrap: wrap;
`

export const StyledChip = styled('div')`
  width: 24px;
  height: 24px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  fontsize: 14px;
  fontweight: 500;
  background-color: ${({ theme }) => theme.palette.allColors.GREEN30};
  color: ${({ theme }) => theme.palette.allColors.GREEN};
`
