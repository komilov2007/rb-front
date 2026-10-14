import { styled } from '@mui/material/styles'

export const Wrapper = styled('div')`
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.allColors.GRAY600};
`

export const CheckboxCard = styled('label')<{ checked?: boolean }>`
  width: 100%;
  display: flex;
  cursor: pointer;
  padding: 12px 16px;
  user-select: none;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, checked }) =>
    checked ? theme.palette.allColors.GREEN100 : theme.palette.allColors.GRAY};
  border: 1px solid
    ${({ theme, checked }) =>
      checked ? theme.palette.allColors.GREEN50 : theme.palette.allColors.GRAY60};
`
