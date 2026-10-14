import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

export const BalanceButton = styled(Button)`
  gap: 23px;
  height: 46px;

  display: flex;
  border-width: 1px;
  border-style: solid;
  align-items: center;
  border-radius: 29px !important;
  border-color: ${({ theme }) => theme.palette.allColors.TRANSPARENT};
  background: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  :hover {
    border-color: ${({ theme }) => theme.palette.allColors.PURPLE10};
    background: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  }
  ${({ theme }) => ({
    padding: '5px',
    [theme.breakpoints.down('md')]: {
      padding: '5px 10px 5px 5px',
    },
  })}
`

export const WrapIconPlus = styled('div')`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.allColors.GREEN};
  svg {
    path {
      stroke: ${({ theme }) => theme.palette.colors['L-WHITE-D-GRAY40']};
    }
  }
  ${({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  })}
`

export const WrapIconWallet = styled('div')`
  width: 36px;
  height: 36px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.colors['L-PURPLE30-D-WHITE10']};
`

export const WrapImage = styled('div')`
  height: 266px;
  position: relative;
  background: linear-gradient(180deg, #faf1e5 0%, rgba(250, 241, 229, 0) 100%);
  img {
    width: 100%;
    ${({ theme }) => ({
      height: '142px',
      [theme.breakpoints.down('md')]: {
        height: '100px',
      },
    })}
  }
  button {
    top: 28px;
    right: 28px;
    position: absolute;
    background-color: ${({ theme }) => theme.palette.allColors.WHITE};
    :hover {
      background-color: ${({ theme }) => theme.palette.allColors.WHITE};
    }
    svg path {
      stroke: ${({ theme }) => theme.palette.allColors.BLACK140};
    }
  }
`
