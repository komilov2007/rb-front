import { styled } from '@mui/material/styles'

export const Header = styled('header')`
  gap: 10px;
  padding: 10px;
  display: flex;
  margin: 18px 0;
  border-radius: 6px;
  align-items: center;
  justify-content: end;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      gap: '10px',
      flexDirection: 'column',
    },
  })}
`
