import { styled } from '@mui/material/styles'

export const Container = styled('header')`
  width: 100%;
  display: flex;
  height: fit-content;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.colors['L-WHITE-D-BLACK10']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-TRANSPARENT-D-BLACK20']};
  box-shadow: ${({ theme }) => `0px 0px 1px 0px ${theme.palette.allColors.GRAY380}, 0px 3px 8px -1px
    ${theme.palette.allColors.GRAY390}`};
  ${({ theme }) => ({
    borderRadius: '8px',
    padding: '12px 20px',
    [theme.breakpoints.down('md')]: {
      borderRadius: '0',
      padding: '6px 10px',
    },
  })}
`
