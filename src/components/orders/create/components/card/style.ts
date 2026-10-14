import { styled } from '@mui/material/styles'

interface ContainerProps {
  disabled: boolean
}

export const Container = styled('div')<ContainerProps>`
  height: 255px;
  display: flex;
  border-radius: 14px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY430};
  border-bottom: 1px solid ${({ theme }) => theme.palette.allColors.GRAY10};
  box-shadow: 0px 2px 4px 0px ${({ theme }) => theme.palette.allColors.GRAY470};
  ${({ disabled }) =>
    disabled && {
      opacity: '0.6',
      pointerEvents: 'none',
      '*': {
        pointerEvents: 'none',
      },
    }}
`

export const WrapImage = styled('div')`
  padding: 4px;
  height: 105px;
  display: flex;
  user-select: none;
  position: relative;
  img {
    object-fit: cover;
    object-position: center;
  }
`
