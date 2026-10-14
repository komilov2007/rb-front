import { styled } from '@mui/material/styles'

export const WrapProduct = styled('div')`
  width: 100%;
  padding: 4px;
  display: flex;
  min-height: 255px;
  border-radius: 14px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY430};
  border-bottom: 1px solid ${({ theme }) => theme.palette.allColors.GRAY10};
  box-shadow: 0px 2px 4px 0px ${({ theme }) => theme.palette.allColors.GRAY470};
`
