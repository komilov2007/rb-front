import { styled } from '@mui/material/styles'

interface LabelProps {
  dragging: boolean
}

export const Label = styled('label')<LabelProps>`
  display: flex;
  cursor: pointer;
  width: fit-content;
  position: relative;
  background-color: ${({ theme, dragging }) =>
    dragging ? theme.palette.allColors.PURPLE40 : theme.palette.allColors.PURPLE120};
  :hover svg {
    fill: ${({ theme }) => theme.palette.allColors.PURPLE150};
  }
`

export const Image = styled('img')`
  width: 100%;
  height: 100%;
  border-radius: 9px;
`

export const WrapImage = styled('div')`
  width: 76px;
  height: 76px;
  object-fit: fill;
  position: relative;
`

export const WrapIconReplace = styled('div')`
  top: -20px;
  right: -20px;
  display: flex;
  position: absolute;
  align-items: center;
`
