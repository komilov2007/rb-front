import { styled } from '@mui/material/styles'

export const WrapEmpty = styled('div')`
  ${({ theme }) => ({
    top: '10px',
    width: '170px',
    height: '170px',
    borderRadius: '50%',
    position: 'absolute',
    padding: '18px 25px 5px',
    right: 'calc(50% - 178px)',
    border: `25px solid ${theme.palette.allColors.GRAY10}`,
    [theme.breakpoints.down('md')]: {
      right: 'unset',
    },
  })}
`
