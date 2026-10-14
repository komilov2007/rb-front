import MuiTabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'

export const TabList = styled(MuiTabList)`
  min-height: 44px;
  width: fit-content;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY730};

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
    min-width: 138px;
    text-transform: unset;
    .MuiTab-iconWrapper {
      margin-right: 4px;
    }

    ${({ theme }) => ({
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '20px',
      color: theme.palette.allColors.BLACK30,
      '&.Mui-selected': {
        borderRadius: '7px',
        color: theme.palette.allColors.BLACK30,
        backgroundColor: theme.palette.allColors.WHITE,
        border: `1px solid ${theme.palette.allColors.GRAY80}`,
        boxShadow: '0px 1px 6px 0px #00000026',
      },
      [theme.breakpoints.down('md')]: {
        padding: '0 10px',
        minWidth: 'unset',
      },
    })}
  }
`

export const WrapDiscount = styled('div')`
  padding: 0 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  border-radius: 24px;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
  })}
`

export const Cards = styled('ul')`
  gap: 10px;
  width: 100%;
  display: grid;
  max-width: 1043px;
  grid-template-columns: 1fr 1fr 1fr;
`

export const Card = styled('li')`
  width: 100%;
  height: 450px;
  overflow: hidden;
  position: relative;
  border-radius: 14px;

  ${({ theme }) => ({
    backgroundColor: theme.palette.allColors.WHITE,
    border: `1px solid ${theme.palette.allColors.GRAY750}`,
    boxShadow: `0px 0px 25px 0px ${theme.palette.allColors.BLACK180}`,

    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  })}

  .content {
    z-index: 100;
    padding: 20px;
    position: relative;
  }
`

export const Wrapper = styled('div')`
  width: 100%;
  height: 490px;

  .swiper-wrapper {
    display: flex;
    height: 450px;
    box-sizing: border-box;
  }
`
