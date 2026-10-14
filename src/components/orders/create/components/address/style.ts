import { styled } from '@mui/material/styles'
import MuiRadioGroup from '@mui/material/RadioGroup'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

interface FormControlLabelProps {
  active: boolean
}

export const RadioGroup = styled(MuiRadioGroup)`
  gap: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .MuiRadio-root {
    margin: -9px 0 -9px -9px;
  }
`

export const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>`
  margin: 0;
  padding: 14px;
  border-radius: 12px;
  align-items: flex-start;
  ${({ theme, active }) => ({
    backgroundColor: active ? theme.palette.allColors.GREEN20 : theme.palette.allColors.GRAY430,
    border: `1px solid ${active ? theme.palette.allColors.GREEN : theme.palette.allColors.GRAY430}`,
  })}
`
