import { Map } from 'react-yandex-maps'
import { styled } from '@mui/material/styles'

export const YMap = styled(Map)`
  width: 100%;
  height: 350px;
  ymaps[class$='copyright__wrap'],
  ymaps[class$='opyrights-promo'] {
    display: none;
  }
  ymaps[class$='inner-panes'] {
    border-radius: 9px;
  }
`

export const WrapZoom = styled('div')`
  width: 42px;
  right: 18px;
  height: 85px;
  z-index: 200;
  bottom: 75px;
  display: flex;
  position: absolute;
  border-radius: 50px;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.allColors.WHITE};
  box-shadow: 0px 0px 25px 0px ${({ theme }) => theme.palette.allColors.GRAY450};
  button {
    padding: 0;
    width: 100%;
    height: 50%;
    font-size: 24px;
    color: ${({ theme }) => theme.palette.allColors.BLACK};
  }
`

export const WrapNavigation = styled('div')`
  right: 18px;
  z-index: 200;
  bottom: 18px;
  position: absolute;
`
