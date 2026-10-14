import { styled } from '@mui/material/styles'

interface LabelProps {
  dragging: boolean
}

export const Label = styled('label')<LabelProps>`
  width: 100%;
  display: flex;
  height: 154px;
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

export const Card = styled('div')`
  gap: 62px;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 0 12px 0 18px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
`
