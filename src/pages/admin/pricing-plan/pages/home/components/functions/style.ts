import { styled } from '@mui/material/styles'

export const Table = styled('table')`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  td,
  th {
    padding: 10px 0;
    text-align: center;
    color: ${({ theme }) => theme.palette.allColors.BLACK30};
  }

  thead {
    tr th {
      font-size: 20px;
      font-weight: 600;
      line-height: 100%;
      letter-spacing: 0%;
    }
    tr th:first-child {
      font-size: 16px;
      font-weight: 500;
      line-height: 100%;
      text-align: start;
      padding: 10px 16px;
      letter-spacing: 1.35%;
      text-transform: uppercase;
      color: ${({ theme }) => theme.palette.allColors.GRAY740};
    }
  }

  tbody {
    tr:nth-child(odd) {
      background-color: ${({ theme }) => theme.palette.allColors.GRAY330};
    }
    tr td:first-child {
      text-align: start;
      padding: 10px 16px;
    }
    tr td {
      font-size: 16px;
      font-weight: 500;
      line-height: 100%;
      letter-spacing: 0%;
    }
    tr td:first-child {
      font-size: 18px;
      font-weight: 400;
      line-height: 100%;
      letter-spacing: 0%;
    }
  }
`

export const WrapperLogo = styled('span')`
  padding: 0 4px;
  margin-left: 5px;
  border-radius: 4px;
  background-color: red;
  color: ${({ theme }) => theme.palette.allColors.WHITE};
  background-color: ${({ theme }) => theme.palette.allColors.PURPLE};
`
