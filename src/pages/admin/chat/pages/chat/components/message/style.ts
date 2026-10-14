import { styled } from '@mui/material/styles'

interface StyleProps {
  isMineMessage: boolean
}

export const Container = styled('div')<StyleProps>`
  width: 100%;
  display: flex;
  margin-top: 12px;
  height: fit-content;
  flex-direction: column;
  content-visibility: auto;
  align-items: ${({ isMineMessage }) => (isMineMessage ? 'flex-end' : 'flex-start')};
`

export const Wrapper = styled('div')<StyleProps>`
  max-width: 410px;
  width: fit-content;
  border-radius: 12px;
  padding: ${({ isMineMessage }) => (isMineMessage ? '4px 12px' : '12px 16px')};
  background: ${({ theme, isMineMessage }) =>
    isMineMessage ? theme.palette.allColors.PURPLE130 : theme.palette.colors['L-GRAY-D-GRAY40']};
`

export const WrapDate = styled('div')`
  display: flex;
  padding: 4px 12px;
  width: fit-content;
  border-radius: 12px;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
`
