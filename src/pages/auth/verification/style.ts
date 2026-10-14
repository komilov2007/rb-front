import { styled } from '@mui/material/styles'

export const Form = styled('form')`
  display: flex;
  max-width: 580px;
  align-items: center;
  border-radius: 14px;
  flex-direction: column;
  padding: 70px 64px 30px;
  background: ${({ theme }) => theme.palette.allColors.WHITE};
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY70};
  box-shadow: 0px 4px 200px 0px ${({ theme }) => theme.palette.allColors.GRAY80};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      padding: '15px',
      marginTop: '10px',
    },
  })}
`
