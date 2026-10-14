import { styled } from '@mui/material/styles'

export const Container = styled('main')`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  flex-direction: column-reverse;
  .infinite-scroll-component {
    width: 100%;
    flex-grow: 1;
    display: flex;
    padding: 0 24px;
    overflow: hidden !important;
    flex-direction: column-reverse;
  }
`

export const WrapNoMessage = styled('div')`
  left: 0;
  width: 100%;
  flex-grow: 1;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`
