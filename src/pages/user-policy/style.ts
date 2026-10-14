import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  height: 100%;
  display: flex;
  padding: 60px 0;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
export const Header = styled('header')`
  top: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  padding: 7px 0;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.allColors.WHITE};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY400};
  box-shadow: 0px 2px 24px 0px ${({ theme }) => theme.palette.allColors.GRAY580};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      padding: '3px 16px',
    },
  })}
`

export const Footer = styled('footer')`
  bottom: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  padding: 7px 0;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.allColors.WHITE};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY400};
  box-shadow: 0px 2px 24px 0px ${({ theme }) => theme.palette.allColors.GRAY580};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      padding: '5px 16px',
    },
  })}
`
