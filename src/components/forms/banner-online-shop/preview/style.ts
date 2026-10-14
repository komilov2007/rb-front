import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  gap: 24px;
  width: 100%;
  display: flex;
  padding: 16px;
  border-radius: 8px;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.allColors.WHITE};
  box-shadow:
    0px 12px 12px -6px rgba(3, 45, 96, 0.04),
    0px 6px 6px -3px rgba(3, 45, 96, 0.04),
    0px 3px 3px -1.5px rgba(3, 45, 96, 0.04),
    0px 1px 1px -0.5px rgba(1, 24, 51, 0.08),
    0px 0px 0px 1px rgba(3, 45, 96, 0.04);
`

export const WrapFrontCamera = styled('div')`
  top: 6px;
  z-index: 3;
  left: center;
  position: absolute;
`

export const WrapMobile = styled('div')`
  display: flex;
  cursor: pointer;
  width: fit-content;
  position: relative;
  align-items: center;
  justify-content: center;

  ::before {
    z-index: 10;
    left: center;
    bottom: 10px;
    width: 50px;
    content: '';
    height: 3px;
    position: absolute;
    border-radius: 50px;
    background-color: ${({ theme }) => theme.palette.allColors.BLACK};
  }

  ::after {
    top: 0;
    content: '';
    height: 100%;
    position: absolute;
    border-radius: 35px;
    width: calc(100% - 5px);

    box-shadow:
      0 13px 13px 0 rgba(0, 0, 0, 0.25),
      0 29px 45px 0 rgba(0, 0, 0, 0.15),
      0 -14px 14px 0 rgba(255, 255, 255, 0.1),
      0 -5px 20px 0 rgba(0, 0, 0, 0.1);
  }
`

export const WrapMobileContent = styled('div')`
  height: 100%;
  overflow: hidden;
  margin-left: 0px;
  max-width: 180px;
  padding-top: -10px;
  max-height: 390px;
  position: absolute;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
`
