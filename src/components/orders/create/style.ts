import MuiTab from '@mui/material/Tab'
import MuiTabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'

export const TabList = styled(MuiTabList)`
  padding: 0 32px;
  min-height: fit-content;
  &.MuiTabs-root::after {
    display: none;
  }
  .MuiTabs-flexContainer {
    gap: 10px;
  }
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      padding: '0 20px',
    },
  })}
`

export const Tab = styled(MuiTab)`
  font-size: 14px;
  font-weight: 400;
  border-radius: 58px;
  line-height: normal;
  color: ${({ theme }) => theme.palette.colors['L-BLACK30-D-WHITE']};
  background-color: ${({ theme }) => theme.palette.allColors.GRAY};
  &.Mui-selected {
    color: ${({ theme }) => theme.palette.allColors.WHITE};
    background-color: ${({ theme }) => theme.palette.allColors.PURPLE};
  }
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
      padding: '0 16px',
      minHeight: '36px',
      borderRadius: '38px',
    },
  })}
`
