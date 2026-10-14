import { styled } from '@mui/material/styles'

export const WrapperMaps = styled('div')`
  width: 100%;
  border-radius: 0 0 12px 12px !important;
  ymaps[class$='copyright__wrap'],
  ymaps[class$='opyrights-promo'] {
    display: none;
  }
  ymaps[class$='inner-panes'],
  ymaps[class$='events-pane'] {
    border-radius: 0 0 12px 12px;
  }
  & > div {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0 0 12px 12px !important;
  }

  ${({ theme }) => ({
    height: '528px',
    [theme.breakpoints.down('md')]: {
      height: '100%',
    },
  })}
`
