import { styled } from '@mui/material/styles'

export const Footer = styled('footer')`
  gap: 10px;
  width: 100%;
  display: flex;
  margin-top: 48px;
  max-width: 654px;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      marginTop: '20px',
      alignItems: 'flex-end',
      flexDirection: 'column-reverse',
    },
  })};
`
