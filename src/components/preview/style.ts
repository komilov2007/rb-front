import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  .MuiTabs-root {
    min-height: 44px;
    border-radius: 9px;
    border: 1px solid rgba(131, 147, 166, 0.2);
    background: #f9f9fc;
    ::after {
      display: none;
    }
  }
  .MuiTabs-indicator {
    display: none;
  }

  .Mui-selected {
    color: var(--black, #171215);
    font-family: var(--app-font, Onest, serif);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    box-shadow:
      0px 3px 8px 0px rgba(0, 0, 0, 0.07),
      0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  }
  .MuiButtonBase-root.MuiTab-root {
    padding: 0 20px;
    min-height: 38px;
  }
  .MuiTabs-flexContainer {
    gap: 0;
    padding: 1.5px 1px 0 1px;
  }
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
  margin-bottom: 45px;
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

export const Header = styled('header')`
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 3px 0 6px;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.allColors.GRAY10};
`

export const WrapMobileContent = styled('div')`
  height: 100%;
  overflow: hidden;
  margin-left: 2px;
  max-width: 180px;
  padding-top: 18px;
  max-height: 390px;
  position: absolute;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
`

export const Categories = styled('div')`
  gap: 10px;
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  padding: 7px 0 18px 7px;
`

export const WrapCategory = styled('div')`
  gap: 3.6px;
  width: 100%;
  display: flex;
  min-width: 29px;
  align-items: center;
  flex-direction: column;
  img {
    border-radius: 7.4px;
    width: 29px !important;
    height: 29px !important;
  }
`

export const Products = styled('div')`
  gap: 10px;
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  padding-left: 7px;
  padding-bottom: 11px;
`

export const WrapProduct = styled('div')`
  width: 100%;
  padding: 4px;
  display: flex;
  min-width: 62px;
  min-height: 88px;
  flex-direction: column;
  border-radius: 4.909px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY430};
  border-bottom: 0.409px solid ${({ theme }) => theme.palette.allColors.GRAY10};
  box-shadow: 0px 0.818px 2.454px 0px ${({ theme }) => theme.palette.allColors.GRAY450};
  img {
    border-radius: 4.091px;
    width: 100% !important;
    height: 35px !important;
  }
`

export const WrapDetail = styled('div')`
  z-index: 4;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  border-radius: 35px;
  align-items: flex-end;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.allColors.BLACK120};
`

export const WrapDetailContent = styled('div')`
  width: 100%;
  overflow-y: auto;
  max-height: 300px;
  margin-bottom: 5px;
  height: fit-content;
  background-color: white;
  width: calc(100% - 15px);
  border-radius: 15px 15px 25px 25px;
`

export const Banners = styled('div')`
  display: flex;
  overflow: hidden;
  position: relative;
  padding: 4.5px 0 4.5px 4.5px;
  img {
    width: 93%;
  }
  ::after {
    top: 5px;
    width: 100%;
    content: '';
    position: absolute;
    border-radius: 6px;
    left: calc(93% + 5px);
    height: calc(100% - 12px);
    background-color: ${({ theme }) => theme.palette.allColors.PURPLE};
  }
`

export const WrapSearch = styled('div')`
  gap: 4px;
  height: 19px;
  display: flex;
  margin: 0 7px;
  padding: 0 6.5px;
  align-items: center;
  border-radius: 4.091px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY};
  border: 0.409px solid ${({ theme }) => theme.palette.allColors.GRAY10};
  svg {
    width: 7.3px;
    height: 7.3px;
  }
`

export const WrapMore = styled('div')`
  display: flex;
  font-weight: 500;
  font-size: 4.909px;
  align-items: center;
  line-height: normal;
  border-radius: 6.545px;
  color: ${({ theme }) => theme.palette.allColors.PURPLE};
  background-color: ${({ theme }) => theme.palette.allColors.GRAY140};
  svg {
    width: 8.6px;
    height: 8.6px;
    transform: rotate(-90deg);
    path {
      stroke: ${({ theme }) => theme.palette.allColors.PURPLE};
    }
  }
`

export const WrapPrice = styled('div')`
  display: flex;
  min-height: 13px;
  overflow: hidden;
  font-weight: 500;
  font-size: 4.909px;
  white-space: nowrap;
  line-height: normal;
  align-items: center;
  justify-content: center;
  border-radius: 2.864px;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.palette.allColors.BLACK30};
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  box-shadow: 0px 0.818px 2.454px 0px ${({ theme }) => theme.palette.allColors.GRAY450};
`

export const WrapUsername = styled('div')`
  height: 38px;
  display: flex;
  padding: 0 16px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.allColors.GRAY};
`

export const WrapMacContent = styled('div')`
  width: fit-content;
  position: relative;
`
export const MacContent = styled('div')`
  top: 10px;
  left: 10px;
  overflow: hidden;
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 35px);
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
`

export const WrapMac = styled('div')`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
`

export const WrapMacBody = styled('div')`
  bottom: 0;
  right: center;
  position: absolute;
`
