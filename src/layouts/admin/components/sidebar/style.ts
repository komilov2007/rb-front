import MuiDrawer from '@mui/material/Drawer'
import { type MultiBankProps } from '@/types/multibank'
import { styled, type Theme, type CSSObject } from '@mui/material/styles'

const openDrawerWidth = 240
const closeDrawerWidth = 84

const openedMixin = (theme: Theme): CSSObject => ({
  width: openDrawerWidth,
  backgroundColor: 'unset',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
})

const closedMixin = (theme: Theme): CSSObject => ({
  width: closeDrawerWidth,
  backgroundColor: 'unset',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
})

export const Aside = styled('aside')<MultiBankProps>`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  --mui-palette-colors-L-GRAY30-D-GRAY20: ${({ theme, isMultibank }) =>
    isMultibank ? theme.palette.allColors.WHITE : undefined};

  background-color: ${({ theme, isMultibank }) =>
    isMultibank ? theme.palette.allColors.GREEN70 : theme.palette.colors['L-WHITE-D-BLACK10']};
  ${({ theme, isMultibank }) =>
    isMultibank && {
      '.pricing_plan': {
        'svg path': {
          fill: theme.palette.allColors.GREEN80,
        },
      },
    }}
`

export const Header = styled('div')`
  gap: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 23px 12px 24px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
`

export const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    flexShrink: 0,
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    borderRight: `1px solid ${theme.palette.colors['L-GRAY10-D-BLACK20']}`,

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

export const Ul = styled('ul')`
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding-top: 15px;
  .icon {
    display: flex;
    align-items: center;
    padding: 0 10px 0 16px;
  }
  .sidebar-text {
    font-size: 16px;
    font-weight: 400;
  }
`

export const Li = styled('li')<MultiBankProps>`
  display: flex;
  user-select: none;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 12px 0 14px;
  a > div,
  .link > div {
    width: 100%;
    height: 44px;
    display: flex;
    border-radius: 6px;
    align-items: center;
    color: ${({ theme, isMultibank }) =>
      isMultibank ? theme.palette.allColors.WHITE : theme.palette.colors['L-GRAY30-D-GRAY20']};
  }

  a > .notactive:hover,
  .link > .notactive:hover {
    transition: all 0.3s ease;
    background-color: ${({ theme, isMultibank }) =>
      isMultibank ? theme.palette.allColors.WHITE60 : theme.palette.colors['L-GRAY-D-GRAY40']};
  }

  a,
  .link {
    width: 100%;
    display: flex;
    align-items: center;
    .only-text-active {
      color: ${({ theme, isMultibank }) =>
        isMultibank ? theme.palette.allColors.WHITE : theme.palette.colors['L-BLACK30-D-WHITE']};
    }
    .active {
      color: ${({ theme, isMultibank }) =>
        isMultibank ? theme.palette.allColors.WHITE : theme.palette.colors['L-BLACK30-D-WHITE']};
      background-color: ${({ theme, isMultibank }) =>
        isMultibank ? theme.palette.allColors.WHITE60 : theme.palette.colors['L-GRAY-D-GRAY40']};
      .icon {
        svg path {
          fill: ${({ theme, isMultibank }) =>
            isMultibank ? theme.palette.allColors.GREEN80 : undefined};
        }
      }

      &::after {
        left: 1px;
        content: '';
        width: 3px;
        height: inherit;
        position: absolute;
        border-radius: 0px 6px 6px 0px;
        background: ${({ theme, isMultibank }) =>
          isMultibank ? theme.palette.allColors.GREEN80 : theme.palette.allColors.PURPLE80};
      }
    }
  }
`

export const WrapButton = styled('div')<MultiBankProps>`
  top: 20px;
  width: 38px;
  right: -19px;
  height: 38px;
  display: flex;
  z-index: 2000;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  justify-content: center;
  transform: rotate(-135deg);
  border: 1px solid ${({ theme }) => theme.palette.colors['L-GRAY10-D-BLACK20']};
  border-left-color: transparent;
  border-bottom-color: transparent;
  background-color: ${({ theme }) => theme.palette.background.default};
  button {
    width: 32px;
    padding: 0;
    height: 32px;
    transform: rotate(-135deg);
    background: ${({ theme, isMultibank }) =>
      isMultibank
        ? theme.palette.allColors.GREEN70
        : theme.palette.colors['L-PURPLE110-D-PURPLE20']};
    &:hover {
      background: ${({ theme, isMultibank }) =>
        isMultibank
          ? theme.palette.allColors.GREEN70
          : theme.palette.colors['L-PURPLE110-D-PURPLE20']};
    }
    svg {
      path {
        stroke: ${({ theme, isMultibank }) =>
          isMultibank ? theme.palette.allColors.GREEN80 : theme.palette.allColors.PURPLE};
      }
    }
  }
`

export const WrapCount = styled('div')`
  display: flex;
  min-width: 24px;
  font-size: 14px;
  font-weight: 500;
  min-height: 24px;
  border-radius: 10px;
  align-items: center;
  line-height: normal;
  justify-content: center;
  color: ${({ theme }) => theme.palette.allColors.GREEN};
  background-color: ${({ theme }) => theme.palette.allColors.GREEN30};
`
