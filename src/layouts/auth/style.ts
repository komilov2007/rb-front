import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  flex-grow: 1;
  display: flex;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      height: 'fit-content',
      overflow: 'unset',
    },
  })}
`

export const WrapLeft = styled('div')`
  width: 50%;
  height: 100vh;
  display: flex;
  padding: 70px 0;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'fit-content',
      padding: '60px 20px 20px 20px',
    },
  })};
`

export const Left = styled('div')`
  width: 100%;
  margin: auto;
  max-width: 525px;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 'fit-content',
      paddingBottom: '70px',
      '.suspense': {
        height: 'calc(100vh - 80px)',
      },
    },
  })}
`

export const Right = styled('div')`
  gap: 30px;
  opacity: 1;
  height: 100%;
  display: flex;
  min-width: 50%;
  padding-top: 40px;
  flex-direction: column;
  ${({ theme }) => {
    const ua = navigator.userAgent
    const isIOS = /iPhone|iPad|iPod/i.test(ua)
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua)

    return {
      backgroundColor: isIOS ? '#0a5150' : isSafari ? '#036356' : theme.palette.allColors.PURPLE,
      [theme.breakpoints.down('md')]: {
        paddingTop: '20px',
        height: 'fit-content',
        overflow: 'hidden',
        backgroundColor: isIOS ? '#0a5150' : theme.palette.allColors.PURPLE,
      },
    }
  }}
`

export const WrapHeader = styled('div')`
  top: 20px;
  width: 100%;
  display: flex;
  max-width: 525px;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '90vw',
    },
  })}
`
