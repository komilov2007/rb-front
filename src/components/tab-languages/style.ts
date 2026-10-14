import MuiTabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'

export const TabList = styled(MuiTabList)`
  min-height: 44px;
  width: fit-content;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY60};
  ::after {
    display: none;
  }
  & .MuiTabs-indicator {
    display: none;
  }
  .MuiTabs-flexContainer {
    gap: 10px;
  }

  .MuiTab-root {
    opacity: 1;
    margin: 2px 3px;
    padding: 0 20px;
    min-height: 38px;
    text-transform: unset;
    .MuiTab-iconWrapper {
      margin-right: 4px;
    }
    ${({ theme }) => ({
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
      minWidth: 'fit-content',
      color: theme.palette.allColors.GRAY110,

      '&.Mui-selected': {
        fontWeight: '500',
        borderRadius: '7px',
        color: theme.palette.allColors.BLACK40,
        backgroundColor: theme.palette.allColors.WHITE,
        border: `1px solid ${theme.palette.allColors.GRAY80}`,
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 3px 8px 0px rgba(0, 0, 0, 0.07)',
      },

      [theme.breakpoints.down('md')]: {
        padding: '0 10px',
      },
    })}
  }
`
