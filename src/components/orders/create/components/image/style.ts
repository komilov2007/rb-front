import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  span {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  .loading {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
`
