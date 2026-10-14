import { styled } from '@mui/material/styles'

export const WrapPromoCode = styled('div')`
  left: 0;
  top: -3px;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`

export const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => ({
    padding: '22px 0',
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.allColors.GRAY570}`,
    ':hover': {
      background: theme.palette.allColors.GRAY,
    },
    [theme.breakpoints.down('md')]: {
      padding: '12px 0',
    },
  })}
`

export const WrapIconRemove = styled('div')`
  top: 0;
  right: 0;
  display: flex;
  position: absolute;
  margin-bottom: 32px;
  padding: 7px 7px 0 0;
  justify-content: flex-end;
`
