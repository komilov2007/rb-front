import MuiTabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import MuiInputLabel from '@mui/material/InputLabel'

export const Section = styled('section')`
  gap: 10px;
  display: flex;
  flex-direction: column;
`

export const SectionLabel = styled(MuiInputLabel)`
  transform: none;
`

export const FlagIcon = styled('span')`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 19px;
    height: 18px;
  }
`

export const InfoIcon = styled('span')`
  width: 18px;
  height: 18px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;

    path {
      stroke: ${({ theme }) => theme.palette.allColors.BLUE20};
    }
  }
`

export const TabList = styled(MuiTabList)`
  height: 46px;
  min-height: 46px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY60};

  ::after,
  .MuiTabs-indicator {
    display: none;
  }

  .MuiTabs-flexContainer {
    gap: 6px;
    height: 100%;
    padding: 3px;
  }

  .MuiTab-root {
    flex: 1;
    opacity: 1;
    min-width: 0;
    min-height: 38px;
    padding: 0 12px;
    border-radius: 7px;
    text-transform: unset;
    ${({ theme }) => ({
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '20px',
      color: theme.palette.allColors.GRAY110,

      '&.Mui-selected': {
        fontWeight: '600',
        color: theme.palette.allColors.BLACK40,
        backgroundColor: theme.palette.allColors.WHITE,
        border: `1px solid ${theme.palette.allColors.GRAY80}`,
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 3px 8px 0px rgba(0, 0, 0, 0.07)',
      },
    })}
  }
`

export const InfoBox = styled('div')`
  gap: 10px;
  display: flex;
  padding: 14px 16px;
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.allColors.BLUE90};
  border: 1px solid ${({ theme }) => theme.palette.allColors.BLUE20};
`
