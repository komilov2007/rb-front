import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
`

export const Left = styled('div')`
  width: 100%;
  flex-grow: 1;
  max-width: 30%;
  overflow: hidden;
  min-width: 339px;
  padding-top: 25px;
  border-right: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      minWidth: '100%',
    },
  })}
`

export const Right = styled('div')`
  width: 100%;
  flex-grow: 1;
  max-width: 70%;
  overflow: hidden;
  min-width: calc(70% - 339px);
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      minWidth: '100%',
    },
  })}
`
