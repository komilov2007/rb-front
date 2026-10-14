import { styled } from '@mui/material/styles'
import Accordion from '@mui/material/Accordion'
import type { MultiBankProps } from '@/types/multibank'

export const MuiAccordion = styled(Accordion, {
  shouldForwardProp: prop => prop !== 'isMultibank',
})<MultiBankProps>`
  width: 100%;
  border: none;
  box-shadow: none;
  background-image: none;
  background-color: transparent;
  .MuiAccordionDetails-root {
    padding: 5px 0 0 40px;
  }
  .MuiAccordionSummary-root.Mui-expanded {
    min-height: fit-content;
  }
  .MuiAccordionSummary-content {
    margin: 0;
    color: ${({ theme, expanded, isMultibank }) =>
      isMultibank
        ? theme.palette.allColors.WHITE
        : expanded
          ? theme.palette.colors['L-BLACK30-D-WHITE']
          : theme.palette.colors['L-GRAY30-D-GRAY20']};
  }
  .MuiAccordionSummary-root {
    padding: 0;
    border-radius: 6px;
    min-height: fit-content;
    &:hover {
      transition: all 0.3s ease;
      background-color: ${({ theme, isMultibank }) =>
        isMultibank ? theme.palette.allColors.WHITE60 : theme.palette.colors['L-GRAY-D-GRAY40']};
    }
    .MuiAccordionSummary-content.Mui-expanded {
      margin: 0;
    }
  }
  .icon {
    svg path {
      fill: ${({ theme, expanded, isMultibank }) =>
        expanded ? (isMultibank ? theme.palette.allColors.GREEN80 : undefined) : undefined};
    }
  }
`

export const Wrapper = styled('div')`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding-right: 10px;
  justify-content: space-between;
`

export const Ul = styled('ul')`
  width: 100%;
`

export const Li = styled('li')`
  margin-bottom: 10px;
  position: relative;
  a {
    width: 100%;
    display: flex;
    align-items: center;
  }
`

interface WrapLinkProps extends MultiBankProps {
  active: boolean
}

export const WrapLink = styled('div')<WrapLinkProps>`
  width: 100%;
  height: 100%;
  position: relative;
  height: 36px !important;

  ::before {
    top: 0;
    left: -2px;
    width: 10%;
    height: 100%;
    content: '';
    z-index: 0;
    position: absolute;
    border-radius: 7px;
    border-left: 2px solid transparent;
    background: ${({ theme, active, isMultibank }) =>
      active
        ? isMultibank
          ? theme.palette.allColors.TRANSPARENT
          : theme.palette.allColors.PURPLE80
        : isMultibank
          ? theme.palette.allColors.TRANSPARENT
          : theme.palette.allColors.WHITE};
  }
  div {
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 8px 16px;
    align-items: center;
    border-radius: inherit;
    background-color: ${({ theme, active, isMultibank }) =>
      isMultibank
        ? active
          ? theme.palette.allColors.WHITE60
          : theme.palette.allColors.TRANSPARENT
        : active && theme.palette.colors['L-GRAY-D-GRAY40']};
    h6 {
      ${({ theme, active, isMultibank }) =>
        isMultibank
          ? { color: active ? theme.palette.allColors.GREEN80 : theme.palette.allColors.WHITE }
          : {
              background: active
                ? theme.palette.allColors.PURPLE80
                : theme.palette.colors['L-BLACK30-D-WHITE'],
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
    }
  }
`

export const WrapPro = styled('p')`
  display: flex;
  min-width: 24px;
  font-size: 14px;
  font-weight: 500;
  min-height: 24px;
  padding: 3px 7px;
  border-radius: 10px;
  align-items: center;
  line-height: normal;
  justify-content: center;
  color: ${({ theme }) => theme.palette.allColors.GREEN};
  background-color: ${({ theme }) => theme.palette.allColors.GREEN30};
`
