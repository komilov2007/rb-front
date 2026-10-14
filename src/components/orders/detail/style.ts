import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'

export const WrapItem = styled('div')`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.colors['L-WHITE-D-GRAY40']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-GRAY280']};
  filter: ${({ theme }) => `drop-shadow(0px 0px 25px ${theme.palette.allColors.GRAY290})`};
`

export const FooterItem = styled('footer')`
  display: flex;
  padding: 18px 15px;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px 0px 7px 7px;
  background: ${({ theme }) => theme.palette.allColors.PURPLE180};
`

export const Accordion = styled(MuiAccordion)`
  box-shadow: none;
  border-radius: 8px;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  &.Mui-expanded {
    border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-GRAY280']};
  }
`
export const AccordionSummary = styled(MuiAccordionSummary)`
  min-height: 44px !important;
  .MuiAccordionSummary-content {
    margin: 0 !important;
  }
  &.Mui-expanded {
    min-height: 44px !important;
    border-bottom: 1px solid ${({ theme }) => theme.palette.allColors.PURPLE10};
  }
  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    svg {
      path {
        stroke: ${({ theme }) => theme.palette.allColors.PURPLE10};
      }
    }
  }
`

export const WrapPercent = styled('div')`
  font-size: 12px;
  font-weight: 500;
  padding: 3px 5px;
  text-align: right;
  border-radius: 4px;
  line-height: normal;
  background: ${({ theme }) => theme.palette.allColors.PURPLE80};
  color: ${({ theme }) => theme.palette.colors['L-WHITE-D-GRAY40']};
`

export const Wrapper = styled('div')`
  gap: 20px;
  display: flex;
  justify-content: space-between;
`

export const WrapMap = styled('div')`
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const WrapIconMap = styled('div')`
  svg {
    width: 30px;
    height: 30px;
  }
`
