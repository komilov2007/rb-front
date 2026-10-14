import MuiTabs from '@mui/material/Tabs'
import { styled } from '@mui/material/styles'

export const WrapInputs = styled('div')`
  width: 100%;
  display: flex;
  margin-top: 23px;
  margin-bottom: 19px;
  flex-direction: column;
  ${({ theme }) => ({
    gap: '25px',
    [theme.breakpoints.down('md')]: {
      gap: '15px',
    },
  })}
`

export const Tabs = styled(MuiTabs)`
  position: relative;
  ::after {
    left: 0;
    bottom: 0;
    height: 1px;
    content: '';
    width: 100%;
    position: absolute;
    background-color: ${({ theme }) => theme.palette.allColors.GRAY10};
  }
`
