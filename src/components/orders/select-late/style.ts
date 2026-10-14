import { styled } from '@mui/material/styles'

export const WrapInput = styled('div')`
  max-width: 130px;
  .MuiInputBase-root {
    height: 62px;
    background-color: ${({ theme }) => theme.palette.allColors.GRAY590};

    input {
      color: ${({ theme }) => theme.palette.allColors.BLACK30};
      font-size: 28px;
      font-weight: 500;
      line-height: normal;
    }
    fieldset {
      border-color: ${({ theme }) => theme.palette.allColors.TRANSPARENT};
    }
  }
`
