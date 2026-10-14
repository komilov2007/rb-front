import { styled } from '@mui/material/styles'

export const Cards = styled('ul')`
  gap: 20px;
  display: grid;
  flex-wrap: wrap;
  max-width: 1090px;
  grid-template-columns: repeat(3, 1fr);
  ${({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [theme.breakpoints.down('md')]: {
      gap: '10px',
      maxWidth: '100%',
      gridTemplateColumns: '1fr',
    },
  })}
`
