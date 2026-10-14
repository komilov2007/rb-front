import { styled } from '@mui/material/styles'

export const Wrapper = styled('div')`
  gap: 70px;
  width: 100%;
  display: grid;
  grid-template-columns: 241px auto;

  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      gap: '10px',
      gridTemplateColumns: 'auto',
    },
  })}
`
