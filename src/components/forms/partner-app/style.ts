import { styled } from '@mui/material/styles'

export const Wrapper = styled('div')`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY600};
`

export const Status = styled('span')<{ active?: boolean }>`
  gap: 6px;
  display: flex;
  font-size: 13px;
  font-weight: 500;
  padding: 4px 10px;
  line-height: normal;
  align-items: center;
  border-radius: 100px;
  color: ${({ theme, active }) =>
    active ? theme.palette.allColors.GREEN50 : theme.palette.colors['L-GRAY30-D-GRAY20']};
  background: ${({ theme, active }) =>
    active ? theme.palette.allColors.GREEN20 : theme.palette.colors['L-GRAY10-D-BLACK20']};
  ::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`
