import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  padding: 5px;
  display: flex;
  border-radius: 29px;
  align-items: center;
  background: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
`

export const Wrapper = styled('div')`
  gap: 7px;
  z-index: 1;
  height: 36px;
  display: flex;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  align-items: center;
  font-style: normal;
  line-height: normal;
  color: ${({ theme }) => theme.palette.colors['L-GRAY30-D-GRAY20']};
`

export const Wrap = styled('div')`
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 50px;

  .MuiButtonBase-root {
    position: absolute;
  }
  .MuiFormControlLabel-root {
    margin: 0 !important;
    &:has(.Mui-checked) span.theme-title {
      color: ${({ theme }) => theme.palette.colors['L-BLACK30-D-WHITE20']};
    }
  }
  .MuiFormGroup-root {
    gap: 6px;
    flex-wrap: nowrap;
  }
`

export const Round = styled('div')`
  top: 0;
  z-index: 0;
  width: 82px;
  height: 36px;
  display: flex;
  position: absolute;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.colors['L-PURPLE30-D-WHITE10']};
`
