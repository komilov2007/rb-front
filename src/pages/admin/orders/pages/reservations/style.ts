import { styled } from '@mui/material/styles'

export const Header = styled('header')`
  gap: 10px;
  padding: 5px;
  display: flex;
  border-radius: 6px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      marginBottom: '5px',
      flexDirection: 'column',
    },
  })}
`

export const Wrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  justify-content: space-between;
  flex-direction: column;
  .MuiTableRow-head .MuiTableCell-root {
    height: 40px !important;
  }
  .MuiTableCell-root {
    height: 50px !important;
  }
  .pagination {
    padding: 8px 10px;
  }
`
