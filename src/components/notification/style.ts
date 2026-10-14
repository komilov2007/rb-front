import { styled } from '@mui/material/styles'

export const Header = styled('header')`
  gap: 20px;
  width: 100%;
  display: flex;
  padding: 20px 22px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.allColors.GRAY60};
`

export const Cards = styled('ul')`
  height: 100%;
  overflow-y: auto;
  max-height: 360px;
  overflow-x: hidden;
  margin-bottom: 6px;
  li {
    ::after {
      bottom: 0;
      left: 20px;
      content: '';
      height: 1px;
      position: absolute;
      width: calc(100% - 40px);
      background-color: ${({ theme }) => theme.palette.allColors.GRAY60};
    }
  }
  li:last-of-type {
    ::after {
      display: none;
    }
  }
`

export const Card = styled('li')`
  gap: 10px;
  display: flex;
  cursor: pointer;
  min-height: 72px;
  position: relative;
  padding: 18px 22px;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.palette.allColors.PURPLE30};
  }
`
