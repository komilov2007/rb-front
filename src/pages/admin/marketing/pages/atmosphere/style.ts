import { styled } from '@mui/material/styles'

export const Wrapper = styled('section')`
  border-radius: 13px;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  box-shadow:
    0px 12px 12px -6px rgba(3, 45, 96, 0.04),
    0px 6px 6px -3px rgba(3, 45, 96, 0.04),
    0px 3px 3px -1.5px rgba(3, 45, 96, 0.04),
    0px 1px 1px -0.5px rgba(1, 24, 51, 0.08),
    0px 0px 0px 1px rgba(3, 45, 96, 0.04);
`

export const WrapperHeader = styled('div')`
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 18px;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.palette.allColors.GRAY780};
`

export const Cards = styled('ul')`
  gap: 16px;
  display: flex;
  flex-wrap: wrap;
`

export const StyledChip = styled('div')`
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.allColors.GREEN30};
  color: ${({ theme }) => theme.palette.allColors.GREEN};
`
