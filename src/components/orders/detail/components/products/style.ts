import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  gap: 16px;
  display: flex;
  position: relative;
  padding-bottom: 19px;
  flex-direction: column;
  &::after,
  &::before {
    content: '';
    width: 24px;
    height: 24px;
    bottom: -12px;
    border-radius: 50%;
    position: absolute;
    background: linear-gradient(0.5turn, #f8f8f8, #f7f7f7);
    border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-GRAY280']};
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  &::after {
    left: -29px;
    transform: rotate(45deg);
  }
  &::before {
    right: -29px;
    transform: rotate(-135deg);
  }
`

export const WrapBorder = styled('div')`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  svg {
    top: 18px;
    width: 100%;
    position: absolute;
  }
`
