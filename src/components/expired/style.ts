import { styled } from '@mui/material/styles'

export const WrapExpired = styled('div')`
  flex-grow: 1;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
  ::after {
    top: 0;
    left: 0;
    width: 100%;
    content: '';
    height: 100%;
    position: absolute;
    border-radius: 12px;
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.65);
  }
`

export const ExpiredContent = styled('div')`
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 10px;
  position: absolute;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`
