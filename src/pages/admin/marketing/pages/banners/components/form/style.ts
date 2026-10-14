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
