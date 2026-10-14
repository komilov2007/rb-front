import { styled } from '@mui/material/styles'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

interface FormControlLabelProps {
  active: boolean
}

export const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>`
  margin: 0;
  width: 100%;
  display: flex;
  padding: 7px 11px;
  border-radius: 12px;
  align-items: center;
  ${({ theme, active }) => ({
    backgroundColor: active ? theme.palette.allColors.GREEN20 : theme.palette.allColors.WHITE,
    border: `1px solid ${active ? theme.palette.allColors.GREEN : theme.palette.allColors.GRAY550}`,
  })}
`

export const WrapDiscount = styled('div')`
  padding: 1.5px 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  border-radius: 5px;
  color: ${({ theme }) => theme.palette.allColors.WHITE};
  background: ${({ theme }) => theme.palette.allColors.GREEN50};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
  })}
`
