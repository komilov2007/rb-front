import { styled } from '@mui/material/styles'

interface TextareaProps {
  error: boolean
}

export const Container = styled('div')<TextareaProps>`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  :has(> label) {
    margin-top: 25px;
  }
  label {
    position: absolute;
    transform: translate(0, -25px) scale(1);
  }
  :has(> textarea:focus) {
    label {
      color: ${({ theme, error }) =>
        error ? theme.palette.allColors.RED : theme.palette.allColors.PURPLE};
    }
  }
`

export const TextArea = styled('textarea')<TextareaProps>`
  resize: none;
  border-width: 1px;
  padding: 16px 20px;
  border-radius: 9px;
  border-color: ${({ theme, error }) =>
    error ? theme.palette.allColors.RED : theme.palette.allColors.GRAY60};
  box-shadow: unset;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  :focus {
    border-color: ${({ theme, error }) =>
      error ? theme.palette.allColors.RED : theme.palette.allColors.PURPLE};
  }
  :hover {
    border-color: ${({ theme, error }) =>
      error ? theme.palette.allColors.RED : theme.palette.allColors.PURPLE};
  }
  :focus,
  :hover:not(:focus) {
    outline: none;
  }
`

export const Text = styled('p')`
  right: 16px;
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  line-height: normal;
  padding: 2px 0 12px 2px;
  border-bottom-right-radius: 9px;
  color: ${({ theme }) => theme.palette.allColors.GRAY100};
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
`
