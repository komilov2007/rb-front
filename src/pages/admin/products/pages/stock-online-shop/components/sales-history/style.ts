import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  gap: 15px;
  padding: 10px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY820};
`
