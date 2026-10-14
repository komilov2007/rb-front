import { styled } from '@mui/material/styles'

export const Wrapper = styled('li')`
  gap: 20px;
  width: 100%;
  padding: 20px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY600};
`
