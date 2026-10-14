import { styled } from '@mui/material/styles'

export const FilterWrapper = styled('div')`
  width: 100%;
  display: flex;
  padding: 10px 16px;
  border-radius: 12px;
  align-items: center;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: 1000;
  border: 1px solid ${({ theme }) => theme.palette.allColors.GRAY320};
  background-color: ${({ theme }) => theme.palette.colors['L-WHITE-D-GRAY40']};
  box-shadow: 0px 0px 48px 0px ${({ theme }) => theme.palette.allColors.GRAY120};

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 8px 10px;
    gap: 8px;
    flex-direction: column;
    align-items: stretch;
  }

  /* Hide scrollbar on period chips row */
  & > .MuiStack-root:first-of-type {
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const PeriodChip = styled('button')<{ active?: boolean }>`
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 20px;
  white-space: nowrap;
  transition: all 0.2s;
  color: ${({ theme, active }) =>
    active ? theme.palette.allColors.WHITE : theme.palette.allColors.BLACK30};
  background-color: ${({ theme, active }) =>
    active ? theme.palette.allColors.GREEN50 : theme.palette.allColors.TRANSPARENT};

  &:hover {
    background-color: ${({ theme, active }) =>
      active ? theme.palette.allColors.GREEN50 : theme.palette.allColors.GRAY60};
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 12px;
    padding: 5px 10px;
  }
`
