import { styled } from '@mui/material/styles'

export const List = styled('ul')`
  width: 100%;
  display: flex;
  border-radius: 10px;
  margin: 16px 0 28px;
  flex-direction: column;
  padding: 17px 67px 17px 20px;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY220-D-GRAY40']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-TRANSPARENT-D-WHITE40']};
`

export const WrapIcon = styled('div')`
  display: flex;
  align-items: center;
  svg {
    circle {
      fill: ${({ theme }) => theme.palette.colors['L-GRAY230-D-GRAY20']};
    }
    path {
      stroke: ${({ theme }) => theme.palette.colors['L-GRAY230-D-GRAY20']};
    }
  }
`
