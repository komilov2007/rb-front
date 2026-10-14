import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  width: 100%;
  height: 100%;
  /* Was overflow: hidden, which clipped wide tables instead of letting the
     inner TableContainer scroll them horizontally on a phone. */
  overflow: auto;
  position: relative;
`

export const Wrapper = styled('div')`
  top: 0;
  z-index: 3;
  width: 100%;
  position: absolute;
`

export const WrapEmpty = styled('div')`
  top: 0;
  left: 0;
  width: 100%;
  padding: 50px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`
