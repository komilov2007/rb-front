import { styled } from '@mui/material/styles'

export const List = styled('ul')`
  gap: 4px;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  li {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`
