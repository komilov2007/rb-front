import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'

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
