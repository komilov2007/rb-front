import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  width: 100%;
  .rmdp-calendar {
    padding: 11px !important;
  }
  .rmdp-day:hover .sd {
    background: ${({ theme }) => theme.palette.allColors.PURPLE40} !important;
  }
  .rmdp-range-hover {
    background: ${({ theme }) => theme.palette.allColors.PURPLE40} !important;
  }
  .rmdp-day.rmdp-range {
    background-color: ${({ theme }) => theme.palette.allColors.PURPLE10} !important;
  }
  .rmdp-arrow-container:hover {
    background: ${({ theme }) => theme.palette.allColors.PURPLE40} !important;
  }
  .rmdp-day.rmdp-today .sd {
    color: ${({ theme }) => theme.palette.colors['L-BLACK80-D-WHITE50']};
    background: ${({ theme }) => theme.palette.allColors.PURPLE40} !important;
  }
  .rmdp-day.rmdp-range:not(.rmdp-today),
  .rmdp-day.rmdp-range:not(.rmdp-today) {
    .sd {
      color: ${({ theme }) => theme.palette.allColors.WHITE} !important;
    }
  }
  .rmdp-arrow {
    width: 8px !important;
    height: 8px !important;
    border: solid ${({ theme }) => theme.palette.allColors.BLACK30} !important;
    border-width: 0 2px 2px 0 !important;
  }
  .rmdp-day,
  .rmdp-week-day {
    flex-grow: 1;
    box-shadow: none !important;
  }
  .rmdp-top-class,
  .rmdp-calendar,
  .rmdp-day-picker > div {
    width: 100%;
  }
  .rmdp-week-day {
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    line-height: normal;
    color: ${({ theme }) => theme.palette.colors['L-BLACK30-D-WHITE20']};
  }
  .rmdp-wrapper {
    width: 100%;
    border-radius: 12px !important;
    border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY70};
    background: ${({ theme }) => theme.palette.colors['L-WHITE-D-GRAY40']}!important;
    box-shadow: 0px 2px 30px 0px ${({ theme }) => theme.palette.allColors.GRAY80} !important;
  }
  .rmdp-header-values {
    flex-grow: 1;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.palette.colors['L-GRAY30-D-GRAY20']};
  }
  .sd {
    font-size: 12px;
    font-weight: 300;
    text-align: center;
    line-height: normal;
    letter-spacing: -1px;
    font-variant-numeric: lining-nums tabular-nums;
    color: ${({ theme }) => theme.palette.colors['L-BLACK80-D-WHITE50']};
  }
  .rmdp-ym {
    .rmdp-day.rmdp-selected span {
      box-shadow: none !important;
      background-color: ${({ theme }) => theme.palette.allColors.PURPLE10} !important;
    }
    .rmdp-day span:hover {
      background-color: ${({ theme }) => theme.palette.allColors.PURPLE10} !important;
    }
    .rmdp-day.rmdp-today span {
      background: ${({ theme }) => theme.palette.allColors.PURPLE40} !important;
    }
  }
`
