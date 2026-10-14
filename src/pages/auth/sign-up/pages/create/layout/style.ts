import { styled } from '@mui/material/styles'

export const Header = styled('header')`
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  padding: 18px 0;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY700};
  box-shadow: 0px 2px 24px 0px ${({ theme }) => theme.palette.allColors.GRAY580};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      padding: '10px 0',
    },
  })}
`

export const WrapHeader = styled('div')`
  gap: 8px;
  width: 100%;
  display: flex;
  max-width: 1160px;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      padding: '0 16px',
    },
  })}
`

export const Conatiner = styled('div')`
  width: 100%;
  margin: auto;
  margin-top: 10px;
  max-width: 968px;
  border-radius: 14px;
  padding: 38px 0 36px;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.allColors.WHITE};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY70};
  box-shadow: 0px 4px 200px 0px ${({ theme }) => theme.palette.allColors.GRAY80};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      padding: '15px',
      borderRadius: 0,
    },
  })}
`
