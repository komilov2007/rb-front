import { styled } from '@mui/material/styles'
import MuiMenuItem from '@mui/material/MenuItem'

interface MenuItemProps {
  header: boolean
}

export const MenuItem = styled(MuiMenuItem)<MenuItemProps>`
  padding: 0;
  border-radius: 8px;
  &:hover {
    background: ${({ theme, header }) =>
      header
        ? theme.palette.colors['L-GRAY330-D-GRAY180']
        : theme.palette.colors['L-PURPLE200-D-PURPLE230']};
    .notactive,
    button {
      transition: all 0.3s ease;
      color: ${({ theme, header }) =>
        header ? theme.palette.colors['L-BLACK30-D-WHITE20'] : theme.palette.allColors.PURPLE10};
    }
    svg {
      stop,
      ellipse,
      circle {
        stop-color: ${({ theme, header }) =>
          header ? theme.palette.colors['L-BLACK30-D-WHITE20'] : theme.palette.allColors.PURPLE10};
        stroke: ${({ theme, header }) =>
          header ? theme.palette.colors['L-BLACK30-D-WHITE20'] : theme.palette.allColors.PURPLE10};
      }
      path {
        stroke: ${({ theme, header }) =>
          header ? theme.palette.colors['L-BLACK30-D-WHITE20'] : theme.palette.allColors.PURPLE10};
      }
    }
  }
  :has(.active) {
    .active {
      transition: all 0.3s ease;
      color: ${({ theme, header }) =>
        header ? theme.palette.colors['L-BLACK30-D-WHITE20'] : theme.palette.allColors.PURPLE10};
      svg {
        stop,
        ellipse,
        circle {
          stroke: ${({ theme, header }) =>
            header
              ? theme.palette.colors['L-BLACK30-D-WHITE20']
              : theme.palette.allColors.PURPLE10};
        }
        path {
          stroke: ${({ theme, header }) =>
            header
              ? theme.palette.colors['L-BLACK30-D-WHITE20']
              : theme.palette.allColors.PURPLE10};
        }
      }
    }

    background: ${({ theme, header }) =>
      header
        ? theme.palette.colors['L-GRAY330-D-GRAY180']
        : theme.palette.colors['L-PURPLE200-D-PURPLE230']};
  }
  a,
  button {
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    padding: 0 9px !important;
    background: transparent !important;
    svg {
      stop,
      ellipse,
      circle {
        stroke: ${({ theme }) => theme.palette.colors['L-BLACK30-D-WHITE']};
        stop-color: ${({ theme }) => theme.palette.colors['L-BLACK30-D-WHITE']};
      }
      path {
        stroke: ${({ theme }) => theme.palette.colors['L-BLACK30-D-WHITE']};
      }
    }
  }
  .active,
  .notactive,
  button {
    gap: 14px;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    align-items: center;
    justify-content: flex-start;
    color: ${({ theme }) => theme.palette.colors['L-BLACK30-D-WHITE20']};
  }
`
