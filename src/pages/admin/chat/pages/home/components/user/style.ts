import { NavLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'

export const Link = styled(NavLink)`
  width: 100%;
  display: flex;
  height: fit-content;
  align-items: center;
`

export const Content = styled('div')`
  gap: 4px;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
`

export const Container = styled('div')`
  gap: 16px;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  max-height: 72px;
  min-height: 72px;
  padding: 12px 20px;
  align-items: center;
  white-space: nowrap;
  justify-content: space-between;

  &:hover {
    background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  }
`

export const Badge = styled('div')`
  height: 18px;
  font-size: 12px;
  max-width: 40px;
  min-width: 18px;
  font-weight: 400;
  overflow: hidden;
  line-height: 16px;
  padding: 1px 2px 0;
  text-align: center;
  white-space: nowrap;
  border-radius: 100px;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.palette.allColors.WHITE};
  background: ${({ theme }) => theme.palette.allColors.PURPLE80};
`
