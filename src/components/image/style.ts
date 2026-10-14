import { styled } from '@mui/material/styles'

interface ConatinerProps {
  radius?: number | string
}

export const Conatiner = styled('div')<ConatinerProps>`
  position: relative;
  border-radius: ${({ radius }) => radius} !important;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: fill;
    border-radius: ${({ radius }) => radius} !important;
  }
  .loading {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
  }
`
