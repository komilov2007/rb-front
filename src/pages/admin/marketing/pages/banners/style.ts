import { styled } from '@mui/material/styles'

export const Cards = styled('ul')`
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ${({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  })}
`

export const Card = styled('li')`
  padding: 12px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY50};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY460};
  box-shadow: 0px 0px 35px 0px ${({ theme }) => theme.palette.allColors.GRAY320};
  img {
    object-fit: cover;
    object-position: center;
  }
`
