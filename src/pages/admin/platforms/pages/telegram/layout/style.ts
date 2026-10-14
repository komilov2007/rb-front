import { styled } from '@mui/material/styles'

export const Header = styled('header')`
  gap: 15px;
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY240-D-WHITE40']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  })}
`

export const WrapIcon = styled('div')`
  width: 32px;
  height: 32px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.colors['L-PURPLE30-D-BLACK70']};
`

export const Wrapper = styled('div')`
  gap: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  ${({ theme }) => ({
    paddingLeft: '15px',
    borderLeft: `1px solid ${theme.palette.colors['L-GRAY250-D-BLACK60']}`,
    [theme.breakpoints.down('md')]: {
      gap: '20px',
      display: 'grid',
      paddingLeft: '0',
      borderLeft: 'none',
      paddingTop: '10px',
      gridTemplateColumns: '1fr 1fr',
      borderTop: `1px solid ${theme.palette.colors['L-GRAY250-D-BLACK60']}`,
    },
  })}
`
