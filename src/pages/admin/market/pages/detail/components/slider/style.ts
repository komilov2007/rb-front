import { styled } from '@mui/material/styles'

export const WrapperImg = styled('div')`
  max-height: 304px;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      maxHeight: '204px',
    },
  })}
  .swiper-wrapper {
    display: flex;
    align-items: center;
  }
  img {
    width: 100%;
    height: 304px;
    object-fit: cover;
    border-radius: 4px;
    vertical-align: middle;
    object-position: center;
    ${({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        height: '204px',
      },
    })}
  }
  video {
    width: 100%;
    height: 304px;
    ${({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        height: '204px',
      },
    })}
  }
`

export const Container = styled('div')`
  display: block;
  position: relative;
  .swiper-wrapper {
    display: flex;
    align-items: center;
  }

  .mini-swiper {
    padding: 14px 3px;
    .swiper-slide {
      position: relative;
      &:after {
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 4px;
        background: ${({ theme }) => theme.palette.allColors.BLACK110};
      }
    }
    .swiper-slide-thumb-active {
      border-radius: 4px;
      border: 3px solid ${({ theme }) => theme.palette.colors['L-WHITE-D-BLACK10']};
      box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.palette.allColors.PURPLE};
      &:after {
        display: none;
      }
    }
    img,
    video {
      height: 86px;
      border-radius: 4px;
      ${({ theme }) => ({
        [theme.breakpoints.down('md')]: {
          height: '46px',
        },
      })}
    }
  }
`
