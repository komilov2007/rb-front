import { styled } from '@mui/material/styles'

export const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  border-radius: 8px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.colors['L-WHITE-D-BLACK10']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
`

export const Cards = styled('ul')`
  gap: 16px;
  display: grid;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  })}
`

export const Card = styled('li')`
  padding: 20px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.colors['L-GRAY-D-GRAY40']};
`
