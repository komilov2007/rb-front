import { styled } from '@mui/material/styles'

interface LabelProps {
  dragging: boolean
}

export const Label = styled('label')<LabelProps>`
  display: flex;
  width: fit-content;
  position: relative;
`

export const WrapIconReplace = styled('div')`
  right: -20px;
  bottom: -20px;
  display: flex;
  z-index: 2;
  position: absolute;
  align-items: center;
`
