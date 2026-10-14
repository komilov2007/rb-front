import { styled } from '@mui/material/styles'

interface LabelProps {
  dragging: boolean
}

export const WrapAvatar = styled('div')`
  display: flex;
  width: fit-content;
  position: relative;
`

export const AvatarLabel = styled('label')<LabelProps>`
  display: flex;
  width: fit-content;
  cursor: pointer;
  border-radius: 50%;
  outline: ${({ theme, dragging }) =>
    dragging ? `2px dashed ${theme.palette.allColors.PURPLE}` : 'none'};
  outline-offset: 6px;
`

export const WrapIconIphone = styled('div')`
  width: fit-content;
  position: relative;
  margin: 12px 0 -22px -20px;
  ::after {
    top: 0;
    left: 2px;
    content: '';
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 7px);
    border-radius: 20px 20px 0 0;
  }
`

export const Label = styled('label')<LabelProps>`
  height: 134px;
  display: flex;
  padding: 12px;
  cursor: pointer;
  position: relative;
  border-radius: 13px;
  background-color: ${({ theme, dragging }) =>
    dragging ? theme.palette.allColors.PURPLE40 : theme.palette.allColors.PURPLE120};
  :hover {
    background-color: ${({ theme }) => theme.palette.allColors.PURPLE150};
  }
  & > svg {
    width: 100%;
    height: 100%;
  }
`

export const Content = styled('div')`
  top: 12px;
  left: 12px;
  display: flex;
  border-radius: 3px;
  position: absolute;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 24px);
  height: calc(100% - 24px);
  border: 2px dashed ${({ theme }) => theme.palette.allColors.PURPLE210};
`

export const Image = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 9px;
`

export const WrapImage = styled('div')`
  padding: 9px;
  width: 120px;
  height: 60px;
  position: relative;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY440};
`

export const AvatarIconReplace = styled('div')`
  right: -20px;
  bottom: -20px;
  display: flex;
  z-index: 2;
  position: absolute;
  align-items: center;
`

export const WrapIconReplace = styled('div')`
  top: -20px;
  right: -20px;
  display: flex;
  position: absolute;
  align-items: center;
`

export const WrapMobileImage = styled('div')`
  top: 20px;
  width: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;

  div {
    width: 30px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.palette.allColors.WHITE};
    ::after {
      top: 0;
      z-index: 1;
      left: -30px;
      width: 50px;
      content: '';
      height: 20px;
      position: absolute;
      background-color: ${({ theme }) => theme.palette.allColors.WHITE};
    }
  }

  svg,
  img,
  canvas {
    z-index: 2;
    width: 100%;
    max-width: 200px;
    max-height: 30px;
  }
`

export const CropImage = styled('img')`
  display: block;
  max-width: 100%;
  max-height: 100%;
`

export const WrapCrop = styled('div')<{ $isLogo?: boolean }>`
  display: flex;
  justify-content: center;

  .ReactCrop {
    width: ${({ $isLogo }) => ($isLogo ? '100%' : 'auto')};
    max-width: 100%;
    max-height: ${({ $isLogo }) => ($isLogo ? '500px' : 'none')};
  }

  .ReactCrop__child-wrapper,
  img {
    width: ${({ $isLogo }) => ($isLogo ? '100%' : 'auto')};
    max-height: ${({ $isLogo }) => ($isLogo ? '500px' : 'none')};
  }
`

export const PreviewCanvas = styled('canvas')`
  width: 76px;
  height: 76px;
  border-radius: 50%;
`

export const WrapPreview = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const WrapLogoCropPreview = styled('div')`
  margin: 0 0 20px 20px;
`
