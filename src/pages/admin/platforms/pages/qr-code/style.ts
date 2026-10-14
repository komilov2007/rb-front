import { styled } from '@mui/material/styles'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

interface ControlLabelProps {
  active: boolean
}

export const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  border-radius: 8px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.colors['L-WHITE-D-BLACK10']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
  .input-color {
    max-width: 440px;
    input.MuiInputBase-input {
      height: 40px;
      border: none;
      border-radius: 6px;
      padding: 5px !important;
    }
  }
`

export const Footer = styled('footer')`
  width: 100%;
  bottom: -24px;
  z-index: 2000;
  padding: 17px 24px;
  display: flex;
  border-radius: 0 0 8px 8px;
  align-items: center;
  justify-content: flex-end;
  ${({ theme }) => ({
    backgroundColor: theme.palette.allColors.WHITE,
    borderTop: `1px solid ${theme.palette.colors['L-GRAY10-D-GRAY190']}`,
    boxShadow: `0px -1px 25px 0px ${theme.palette.colors['L-GRAY120-D-GRAY190']}`,
  })}
`

export const ControlLabel = styled(FormControlLabel)<ControlLabelProps>`
  width: 56px;
  height: 56px;
  position: relative;
  border-radius: 5.5px;
  border: ${({ theme, active }) =>
    active
      ? `1.5px solid ${theme.palette.allColors.GREEN}`
      : `1px solid ${theme.palette.allColors.GRAY10}`};
  background-color: ${({ theme, active }) =>
    active ? theme.palette.allColors.GREEN60 : theme.palette.allColors.TRANSPARENT};
  ::after {
    left: 10px;
    content: '';
    width: 34px;
    height: 34px;
    border-radius: 3px;
    position: absolute;
    background-color: ${({ value }) => value as string};
  }
`

export const WrapControlLabel = styled('div')`
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(7, 56px);
  .MuiRadio-root {
    padding: 0;
  }
`

export const WrapTableContent = styled('div')`
  top: 15px;
  position: absolute;
`

export const Content = styled('div')`
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
`

export const WrapQrCode = styled('div')`
  padding: 18px;
  width: fit-content;
  height: fit-content;
  border-radius: 17.28px;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  box-shadow: 0px 2.88px 34.56px 0px ${({ theme }) => theme.palette.allColors.GRAY290};
`

export const CustomRadioGroup = styled(RadioGroup)`
  gap: 32px;
  .MuiRadio-root {
    padding: 0;
    border-radius: 6px;
    .MuiTouchRipple-root .MuiTouchRipple-child {
      border-radius: 6px;
    }
  }
`

export const WrapImage = styled('div')`
  margin: 20px 0 15px;
  svg,
  img {
    width: 67px;
    height: 22px;
  }
`
