import { styled } from '@mui/material/styles'

export const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  padding: 14px 18px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY220-D-GRAY40']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      gap: '15px',
      alignItems: 'unset',
      flexDirection: 'column',
    },
  })}
`
