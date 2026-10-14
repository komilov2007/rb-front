import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

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

export const Card = styled(Stack)`
  gap: 14px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  border-radius: 12px;
  align-items: flex-start;
  background: ${({ theme }) => theme.palette.allColors.WHITE};
  box-shadow: 0 1px 4px ${({ theme }) => theme.palette.allColors.GRAY320};
`

export const WrapWarning = styled('div')`
  gap: 5px;
  display: flex;
  font-size: 13px;
  font-weight: 600;
  margin-top: 10px;
  padding: 6px 12px;
  border-radius: 8px;
  align-items: center;
  color: ${({ theme }) => theme.palette.allColors.BROWN};
  background: ${({ theme }) => theme.palette.allColors.YELLOW50};
  &.disable {
    color: ${({ theme }) => theme.palette.allColors.GRAY20};
    background: ${({ theme }) => theme.palette.allColors.GRAY10};
  }
`

export const WrapTag = styled(Link)`
  margin-top: 8px;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  display: inline-block;
  color: ${({ theme }) => theme.palette.allColors.BLUE100};
  background: ${({ theme }) => theme.palette.allColors.BLUE110};
  &.disable {
    color: ${({ theme }) => theme.palette.allColors.GRAY20};
    background: ${({ theme }) => theme.palette.allColors.GRAY10};
  }
`

export const WrapIcon = styled('div')`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`
