import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'

interface CardLinkProps {
  isActive: boolean
}

export const CardLink = styled(Link)<CardLinkProps>`
  display: flex;
  padding: 14px;
  cursor: pointer;
  border-width: 1px;
  border-radius: 12px;
  border-style: solid;
  align-items: center;
  justify-content: space-between;
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.palette.allColors.GREEN : theme.palette.allColors.TRANSPARENT};
  background: ${({ theme, isActive }) =>
    isActive ? theme.palette.allColors.GREEN20 : theme.palette.allColors.GRAY330};
  :hover {
    background: ${({ theme }) => theme.palette.allColors.GREEN20};
  }
  .icon-arrow {
    transform: rotate(-90deg);
    svg {
      path {
        stroke: ${({ theme }) => theme.palette.allColors.BLACK30};
      }
    }
  }
  .icon-step {
    svg {
      path {
        fill: ${({ theme, isActive }) => (isActive ? theme.palette.allColors.GREEN : undefined)};
      }
    }
  }
`
