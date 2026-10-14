import { styled } from '@mui/material/styles'

interface WrapperProps {
  error: boolean
}

export const Container = styled('main')`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Wrapper = styled('div')<WrapperProps>`
  gap: 8px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  padding: 0 8px;
  min-height: 56px;
  position: relative;
  border-radius: 12px;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY170-D-GRAY180']};
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.palette.allColors.RED : theme.palette.allColors.TRANSPARENT};
  textarea {
    width: 100%;
    border: none;
    resize: none;
    padding: 4px 0;
    max-height: 30vh;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 20px !important;
    background-color: ${({ theme }) => theme.palette.allColors.TRANSPARENT};
    &:focus {
      outline: none;
    }
    &::placeholder {
      line-height: 20px;
      opacity: 1 !important;
      font-size: 16px !important;
      color: ${({ theme }) => theme.palette.colors['L-GRAY30-D-GRAY20']} !important;
    }
  }
`

export const Form = styled('form')`
  gap: 8px;
  width: 100%;
  display: flex;
  align-items: flex-end;
`
