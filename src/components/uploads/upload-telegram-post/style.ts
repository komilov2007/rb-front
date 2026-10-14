import { styled } from '@mui/material/styles'

interface LabelProps {
  dragging: boolean
}

export const Label = styled('label')<LabelProps>`
  width: 100%;
  display: flex;
  height: 100%;
  padding: 12px;
  cursor: pointer;
  border-radius: 13px;
  background-color: ${({ theme, dragging }) =>
    dragging ? theme.palette.allColors.PURPLE40 : theme.palette.allColors.PURPLE120};
  :hover {
    background-color: ${({ theme }) => theme.palette.allColors.PURPLE150};
  }
  & > svg {
    width: 100%;
    height: 100%;
  }
`

export const Content = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10px;
  border-radius: 3px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.palette.allColors.PURPLE210};
`

export const Image = styled('img')`
  width: 100%;
  height: 100%;
  border-radius: 9px;
`

export const WrapImage = styled('div')`
  height: 144px;
  object-fit: fill;
  position: relative;
  max-width: 144px;
  max-height: 144px;
`

export const WrapIconReplace = styled('div')`
  top: -20px;
  right: -20px;
  display: flex;
  position: absolute;
  align-items: center;
`
