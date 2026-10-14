import { styled } from '@mui/material/styles'

export const Container = styled('div')`
  position: relative;
  min-height: 268px;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      minHeight: '168px',
    },
  })}
  .swiper-wrapper {
    display: flex;
    align-items: center;
  }
  .swiper-slide {
    transition: all 0.2s ease-out;
    -o-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    img {
      object-fit: cover;
      border-radius: 6px;
    }
    &:not(.swiper-slide-active) {
      height: 226px;
      position: relative;
      ${({ theme }) => ({
        [theme.breakpoints.down('md')]: {
          height: '126px',
        },
      })}
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        opacity: 0.5;
        border-radius: 6px;
        background: ${({ theme }) => theme.palette.allColors.BLACK};
      }
    }
  }

  .swiper-slide.swiper-slide-active {
    height: 268px;
    ${({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        height: '168px',
      },
    })}
  }
  .swiper-b {
    top: 110px;
    z-index: 10;
    padding: 0;
    position: absolute;
    ${({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        top: '70px',
        width: '35px',
        height: '35px',
        svg: {
          circle: {
            fill: theme.palette.allColors.BLACK,
          },
          path: {
            stroke: theme.palette.allColors.BLACK,
          },
        },
      },
    })}
  }
  .p-custom {
    left: 20px;
    right: auto;
    ${({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        left: '35px',
      },
    })}
  }
  .n-custom {
    left: auto;
    right: 20px;
    ${({ theme }) => ({
      [theme.breakpoints.down('md')]: {
        right: '35px',
      },
    })}
  }
`
