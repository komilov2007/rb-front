import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .shape {
    width: 100%;
    svg {
      width: 100%;
      height: 45px;
      ${({ theme }) => ({
        [theme.breakpoints.down('md')]: {
          height: '35px',
        },
      })}
      g {
        width: 100%;
      }
    }
  }

  .shape.bottom {
    margin-top: -17px;
    transform: rotate(180deg);
  }
  .shape.top {
    margin-bottom: -17px;
  }
`

export const Table = styled('table')`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;

  thead tr,
  tbody tr {
    border-bottom: 1px solid ${({ theme }) => theme.palette.allColors.GRAY720};
  }

  thead tr th {
    padding: 10px 0;
    text-align: left;
    padding-left: 20px;
  }

  tbody,
  tfoot {
    td {
      border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY720};
    }
    tr:first-child td {
      border-top: none;
    }
    tr td:first-child {
      padding-left: 0;
    }
    tr td {
      padding-left: 20px;
    }
    tr:last-child td {
      border-bottom: none;
    }
    td:first-child {
      border-left: none;
    }
    td:last-child {
      border-right: none;
    }
    td {
      font-size: 16px;
      font-weight: 500;
      line-height: 100%;
      letter-spacing: 0%;
      color: ${({ theme }) => theme.palette.allColors.BLACK30};
    }
    td {
      padding: 10px 0;
    }
  }
  tfoot tr td:first-child {
    padding-left: 32px !important;
  }
  tfoot tr {
    background-color: ${({ theme }) => theme.palette.allColors.GREEN100};
  }
`

export const WrapperLogo = styled('span')`
  padding: 0 4px;
  margin-left: 5px;
  border-radius: 4px;
  background-color: red;
  color: ${({ theme }) => theme.palette.allColors.WHITE};
  background-color: ${({ theme }) => theme.palette.allColors.PURPLE10};
`

export const StyledHR = styled('hr')`
  background-color: ${({ theme }) => theme.palette.allColors.GRAY720};
  height: 1px;
  display: block;
  margin: 18px 0;
`
