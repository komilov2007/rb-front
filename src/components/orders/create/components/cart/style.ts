import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  gap: 4px;
  display: flex;
  min-width: 286px;
  max-width: 286px;
  min-height: 540px;
  max-height: 540px;
  position: relative;
  border-radius: 16px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      maxWidth: '100%',
      minHeight: '100%',
      maxHeight: '100%',
    },
  })}
`

export const Card = styled('div')`
  gap: 15px;
  width: 100%;
  display: flex;
  direction: row;
  padding: 12px 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ theme }) => `1px solid ${theme.palette.allColors.GRAY460}`};
`

export const Footer = styled('footer')`
  left: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
  padding: 12px 12px 14px;
  border-radius: 0 0 16px 16px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY};
  border-top: 1px solid ${({ theme }) => theme.palette.allColors.GRAY10};
  box-shadow: 0px -4px 12px 0px ${({ theme }) => theme.palette.allColors.GRAY320};
`
