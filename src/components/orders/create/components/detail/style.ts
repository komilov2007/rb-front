import { styled } from '@mui/material/styles'

export const Footer = styled('footer')`
  gap: 24px;
  display: flex;
  align-items: center;
  padding: 12px 18px 28px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.allColors.WHITE};
  border-top: 1px solid ${({ theme }) => theme.palette.allColors.GRAY10};
  box-shadow: 0px -4px 12px 0px ${({ theme }) => theme.palette.allColors.GRAY320};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      gap: '12px',
      padding: '12px 18px 18px',
    },
  })}
`

export const WrapperCarousel = styled('div')`
  width: 100%;
  .swiper-pagination-bullets {
    .swiper-pagination-bullet {
      margin: 0 3px;
      background-color: ${({ theme }) => theme.palette.allColors.GRAY500};
      &.swiper-pagination-bullet-active {
        opacity: 1;
        background-color: ${({ theme }) => theme.palette.allColors.WHITE};
      }
    }
  }
`

export const WrapClose = styled('div')`
  top: 16px;
  right: 16px;
  z-index: 10;
  position: absolute;
`
