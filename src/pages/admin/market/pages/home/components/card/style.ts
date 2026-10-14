import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

export const Container = styled(Link)`
  min-width: 273px;
  padding: 15px 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY60-D-WHITE40']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  })}
`
