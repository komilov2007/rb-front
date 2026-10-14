import { styled } from '@mui/material/styles'

export const WrapCartButtons = styled('div')`
  gap: 3px;
  width: 100px;
  display: flex;
  border-radius: 23px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY480};
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.allColors.GRAY480};
  }
  fieldset {
    border-color: ${({ theme }) => theme.palette.allColors.GRAY480};
  }
`

export const WrapDetailButtons = styled('div')`
  gap: 35px;
  display: flex;
  padding: 6px 8px;
  border-radius: 12px;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY490};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      gap: '12px',
      padding: '3px 4px',
    },
  })}
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  }
  fieldset {
    border-color: ${({ theme }) => theme.palette.allColors.WHITE};
  }
`
