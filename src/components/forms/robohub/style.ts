import { styled } from '@mui/material/styles'

export const Icon = styled('img')`
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 16px;
  padding: 8px;
  background: ${({ theme }) => theme.palette.colors['L-WHITE-D-BLACK10']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
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

export const InfoCard = styled('ul')`
  gap: 12px;
  width: 100%;
  display: flex;
  padding: 16px;
  border-radius: 12px;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
  li {
    gap: 10px;
    display: flex;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    align-items: flex-start;
    color: ${({ theme }) => theme.palette.colors['L-BLACK30-D-WHITE20']};
    svg {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
    }
  }
`

export const Step = styled('span')`
  width: 18px;
  height: 18px;
  display: flex;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
  line-height: 18px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.allColors.WHITE};
  background: ${({ theme }) => theme.palette.allColors.PURPLE10};
`
