import { styled } from '@mui/material/styles'

interface LabelProps {
  dragging: boolean
}

export const Label = styled('label')<LabelProps>`
  display: flex;
  padding: 12px;
  height: 150px;
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

export const SmallLabel = styled('label')<LabelProps>`
  width: 76px;
  height: 76px;
  cursor: pointer;
  min-width: 76px;
  min-height: 76px;
  max-width: 76px;
  max-height: 76px;
  position: relative;

  svg {
    fill: ${({ theme, dragging }) =>
      dragging ? theme.palette.allColors.PURPLE40 : theme.palette.allColors.PURPLE120};
  }
  :hover {
    svg {
      fill: ${({ theme }) => theme.palette.allColors.PURPLE150};
    }
  }
`

export const WrapImageAdd = styled('div')`
  width: 76px;
  height: 76px;
  display: flex;
  min-width: 76px;
  min-height: 76px;
  max-width: 76px;
  max-height: 76px;
  position: absolute;
  align-items: center;
  justify-content: center;
`

export const Content = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 3px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.palette.allColors.PURPLE210};
`

export const WrapImage = styled('li')`
  width: 76px;
  height: 76px;
  min-width: 76px;
  min-height: 76px;
  max-width: 76px;
  max-height: 76px;
  position: relative;
`

export const Image = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9px;
`

export const WrapIconDelete = styled('div')`
  top: -20px;
  right: -20px;
  display: flex;
  position: absolute;
  align-items: center;
`

export const WrapImages = styled('ul')`
  gap: 26px;
  display: flex;
  flex-wrap: wrap;
`
