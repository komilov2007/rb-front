import { styled } from '@mui/material/styles'

export const Header = styled('header')`
  padding: 10px;
  display: flex;
  border-radius: 6px;
  align-items: center;
  margin: 18px 20px 20px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      margin: '18px 20px',
    },
  })}
`

export const Cards = styled('ul')`
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
`
