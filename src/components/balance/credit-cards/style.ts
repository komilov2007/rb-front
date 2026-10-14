import { styled } from '@mui/material/styles'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

interface FormControlLabelProps {
  active: boolean
}

export const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>`
  width: 100%;
  max-width: 270px;
  border-radius: 6px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.palette.allColors.GREEN : theme.palette.allColors.GRAY60};
  .MuiFormControlLabel-label {
    width: 100%;
  }
`
