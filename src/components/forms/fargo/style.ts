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

export const Wrapper = styled('div')`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY600};
`
