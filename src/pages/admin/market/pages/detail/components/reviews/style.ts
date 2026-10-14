import { styled } from '@mui/material/styles'

export const WrapRating = styled('div')`
  gap: 4px;
  display: flex;
  font-size: 14px;
  padding: 3px 6px;
  font-weight: 500;
  line-height: normal;
  align-items: center;
  border-radius: 100px;
  color: ${({ theme }) => theme.palette.allColors.WHITE};
  background: ${({ theme }) => theme.palette.allColors.PURPLE80};
  svg {
    width: 16px;
    height: 16px;
    path {
      fill-opacity: 1;
      fill: ${({ theme }) => theme.palette.allColors.WHITE};
    }
  }
`
