import { styled } from '@mui/material/styles'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

interface FormControlLabelProps {
  active: boolean
}

export const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>`
  width: 100%;
  border-radius: 6px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.palette.allColors.GREEN : theme.palette.allColors.GRAY60};
  background-color: ${({ theme, active }) =>
    active ? theme.palette.allColors.GREEN20 : theme.palette.allColors.TRANSPARENT};
  .MuiFormControlLabel-label {
    width: 100%;
    padding-left: 15px;
  }
`
