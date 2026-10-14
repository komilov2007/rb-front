import { styled } from '@mui/material/styles'

export const WrapImageContent = styled('div')`
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  cursor: pointer;
  border-radius: 6px;
  position: absolute;
  justify-content: space-between;
  transition: opacity 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out;
  background-color: ${({ theme }) => theme.palette.allColors.BLACK210};
  :hover {
    opacity: 1;
  }
`
