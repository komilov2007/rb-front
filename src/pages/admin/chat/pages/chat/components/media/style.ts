import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  width: 100%;
  height: 100%;
  cursor: pointer;
  min-width: 260px;
  max-width: 260px;
  min-height: 180px;
  max-height: 180px;
  position: relative;
  margin-bottom: 12px;
  border-radius: 12px;
  span {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 12px;
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

export const WrapFileLink = styled('a')`
  gap: 10px;
  padding: 5px;
  display: flex;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 12px;
  align-items: center;
  :hover {
    background: ${({ theme }) => theme.palette.allColors.PURPLE60};
  }
`

export const WrapIconFile = styled('div')`
  padding: 5px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.allColors.PURPLE};
  svg {
    g {
      path {
        fill: ${({ theme }) => theme.palette.allColors.WHITE};
      }
    }
  }
`
