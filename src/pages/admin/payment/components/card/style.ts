import { styled } from '@mui/material/styles'

export const Container = styled('li')`
  width: 100%;
  padding: 10px 0;
  padding-left: 18px;
  padding-right: 3px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY240-D-WHITE40']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      gap: '10px',
      paddingLeft: '15px',
      paddingRight: '3px',
    },
  })}
`
