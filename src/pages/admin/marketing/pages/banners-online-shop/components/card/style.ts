import { styled } from '@mui/material/styles'

export const StyledCard = styled('li')`
  max-width: 242px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY50};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY10};
  box-shadow: 0px 0px 35px 0px ${({ theme }) => theme.palette.allColors.GRAY320};
  img {
    object-fit: cover !important;
  }
`
