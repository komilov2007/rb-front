import { styled } from '@mui/material/styles'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

export const FormControlLabel = styled(MuiFormControlLabel)`
  width: 100%;
  padding: 5px;
  display: flex;
  cursor: pointer;
  max-height: 52px;
  user-select: none;
  border-radius: 9px;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY60};
`
