import { styled } from '@mui/material/styles'
import MuiTextField, { type TextFieldProps } from '@mui/material/TextField'

type MuiTextFieldProps = TextFieldProps & {
  customvariant?: 'outlined' | 'contained'
}

export const TextField = styled(MuiTextField)<MuiTextFieldProps>`
  ${({ theme, customvariant }) =>
    customvariant === 'contained'
      ? {
          '.MuiOutlinedInput-root fieldset': {
            borderColor: theme.palette.colors['L-GRAY10-D-WHITE40'],
          },
          '.MuiInputBase-root': {
            backgroundColor: theme.palette.colors['L-WHITE-D-WHITE10'],
            'input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active':
              {
                WebkitBoxShadow: `0 0 0 30px ${theme.palette.colors['L-WHITE-D-WHITE10']} inset !important`,
                boxShadow: `0 0 0 30px ${theme.palette.colors['L-WHITE-D-WHITE10']} inset !important`,
                backgroundColor: `${theme.palette.colors['L-WHITE-D-WHITE10']} !important`,
              },
          },
          'input::placeholder': {
            opacity: '1 !important',
            color: `${theme.palette.colors['L-GRAY30-D-GRAY20']} !important`,
          },
        }
      : {
          'input::placeholder': {
            opacity: '1 !important',
            color: `${theme.palette.colors['L-GRAY30-D-GRAY20']} !important`,
          },
        }}
`
