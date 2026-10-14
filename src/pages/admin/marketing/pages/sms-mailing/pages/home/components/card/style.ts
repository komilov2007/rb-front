import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'

export const Header = styled('header')`
  padding: 10px;
  display: flex;
  margin: 18px 0;
  border-radius: 6px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      gap: '10px',
      alignItems: 'flex-end',
      flexDirection: 'column',
    },
  })}
`

export const Card = styled(Link)`
  gap: 15px;
  width: 100%;
  padding: 20px;
  display: flex;
  border-radius: 18px;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.allColors.WHITE};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY70};
  box-shadow: 0px 0px 85px 0px ${({ theme }) => theme.palette.allColors.GRAY320};
`

export const CardContent = styled('div')`
  gap: 5px;
  display: flex;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.allColors.GRAY710};
`
