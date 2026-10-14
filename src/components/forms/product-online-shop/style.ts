import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

interface WrapperProps {
  isCreate: boolean
}

export const Wrapper = styled('div')<WrapperProps>`
  border-radius: 13px;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  box-shadow: ${({ isCreate }) =>
    isCreate
      ? 'unset'
      : ' 0px 12px 12px -6px rgba(3, 45, 96, 0.04), 0px 6px 6px -3px rgba(3, 45, 96, 0.04), 0px 3px 3px -1.5px rgba(3, 45, 96, 0.04), 0px 1px 1px -0.5px rgba(1, 24, 51, 0.08), 0px 0px 0px 1px rgba(3, 45, 96, 0.04)'};
`

export const WrapperHeader = styled('div')`
  gap: 10px;
  display: flex;
  padding: 10px 18px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.allColors.GRAY780};
`

export const StyledContainer = styled(Stack)`
  gap: 24px;
  width: 100%;
  display: grid;
  align-self: center;
  ${({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      padding: '0px 24px',
      marginBottom: '32px',
      gap: '0px',
    },
  })}
`
