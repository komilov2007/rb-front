import { styled } from '@mui/material/styles'

interface WrapperProps {
  error: boolean
}

export const Wrapper = styled('div')<WrapperProps>`
  gap: 8px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  padding: 0 8px;
  margin-top: 8px;
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

export const WrapImage = styled('div')`
  position: relative;
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
`

export const Image = styled('img')`
  width: 100%;
  height: 100%;
  min-width: 306px;
  max-width: 306px;
  min-height: 180px;
  max-height: 180px;
  object-fit: fill;
  border-radius: inherit;
`

export const WrapIconFile = styled('div')`
  padding: 5px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.allColors.PURPLE};
  svg {
    g {
      path {
        fill: ${({ theme }) => theme.palette.allColors.WHITE};
      }
    }
  }
`

export const WrapFileLink = styled('div')`
  gap: 10px;
  width: 100%;
  padding: 5px;
  display: flex;
  border-radius: 8px;
  margin-bottom: 12px;
  align-items: center;
  background: ${({ theme }) => theme.palette.allColors.PURPLE60};
`
