import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

export const WrapIconIphone = styled('div')`
  width: 60%;

  img {
    width: 50%;
    height: 100%;
    object-fit: cover;
  }
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  })}
`

export const WrapIconMac = styled('div')`
  width: 70%;

  img {
    width: 100%;
    object-fit: cover;
  }
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  })}
`

export const Wrapper = styled('div')`
  border-radius: 13px;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  box-shadow:
    0px 12px 12px -6px rgba(3, 45, 96, 0.04),
    0px 6px 6px -3px rgba(3, 45, 96, 0.04),
    0px 3px 3px -1.5px rgba(3, 45, 96, 0.04),
    0px 1px 1px -0.5px rgba(1, 24, 51, 0.08),
    0px 0px 0px 1px rgba(3, 45, 96, 0.04);
`

export const StyledContainer = styled(Stack)`
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  display: grid;
  align-self: center;
  grid-template-columns: 0.24fr 0.52fr 0.24fr;
  ${({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      padding: '0px 24px',
      marginBottom: '32px',
      gap: '0px',
    },
  })}
`
