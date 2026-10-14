import { styled } from '@mui/material/styles'
import type { MultiBankProps } from '@/types/multibank'

export const Container = styled('div')<MultiBankProps>`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  background-color: ${({ theme, isMultibank }) =>
    isMultibank ? theme.palette.allColors.GREEN70 : theme.palette.background.default};
`

export const Wrapper = styled('div')<MultiBankProps>`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  border-radius: ${({ isMultibank }) => isMultibank && '15px 0 0 15px'};
  background-color: ${({ theme, isMultibank }) => isMultibank && theme.palette.background.default};
`

export const WrapMain = styled('div')`
  width: 100%;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
  &:has(.scrollPageLayout) {
    overflow-y: auto;
  }
  ${({ theme }) => ({
    padding: '0 25px 25px;',
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
  })}
`

export const WrapAlert = styled('div')`
  width: 100%;
  ${({ theme }) => ({
    padding: '6px 25px 10px 25px',
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
  })}
`

export const Main = styled('main')`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.colors['L-WHITE-D-BLACK10']};
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
  &:has(.transparent) {
    border: none;
    background-color: ${({ theme }) => theme.palette.allColors.TRANSPARENT};
  }
  &:has(.scrollPageLayout) {
    min-height: 100%;
    height: fit-content;
  }
  ${({ theme }) => ({
    borderRadius: '8px',
    [theme.breakpoints.down('md')]: {
      borderRadius: '0',
    },
  })}
`

export const WrapHeader = styled('div')`
  top: 0;
  z-index: 1;
  position: sticky;
  background-color: ${({ theme }) => theme.palette.background.default};
  ${({ theme }) => ({
    padding: '18px 25px 5px',
    [theme.breakpoints.down('md')]: {
      padding: '0 0 15px',
    },
  })}
`
