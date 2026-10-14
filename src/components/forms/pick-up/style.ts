import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  gap: 12px;
  width: 100%;
  display: flex;
  min-width: 519px;
  max-width: 519px;
  max-height: 255px;
  border-radius: 9px;
  flex-direction: column;
  padding: 11px 11px 11px 24px;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY60-D-WHITE40']};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  })}
`

export const Status = styled('div')`
  font-size: 10px;
  padding: 2px 5px;
  font-weight: 500;
  border-radius: 4px;
  width: fit-content;
  text-align: center;
  line-height: normal;
  height: fit-content;
  color: ${({ theme }) => theme.palette.allColors.GREEN};
  background-color: ${({ theme }) => theme.palette.allColors.GREEN40};
`

export const Content = styled('ul')`
  gap: 8px;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  li {
    border-top: ${({ theme }) => `1px solid ${theme.palette.colors['L-GRAY130-D-BLACK60']}`};
  }
`
