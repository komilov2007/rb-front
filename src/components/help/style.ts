import { styled } from '@mui/material/styles'

export const Link = styled('a')`
  gap: 10px;
  display: flex;
  align-items: center;
  ${({ theme }) => ({
    p: {
      color: theme.palette.allColors.BLACK30,
    },
    svg: {
      width: '28px',
      height: '28px',
    },
    ':hover': {
      p: {
        textDecoration: 'underline',
        color: theme.palette.allColors.BLUE70,
      },
      'svg path': {
        fill: theme.palette.allColors.BLUE70,
      },
    },
  })}
`
