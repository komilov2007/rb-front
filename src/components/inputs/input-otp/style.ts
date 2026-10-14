import { styled } from '@mui/material/styles'
import { MuiOtpInput } from 'mui-one-time-password-input'

export const OtpInput = styled(MuiOtpInput)`
  gap: 8px;
  display: flex;
  .MuiInputBase-root {
    width: 46px;
    height: 52px;
  }
  .MuiInputBase-input {
    padding: 11px 12px !important;
  }
`
