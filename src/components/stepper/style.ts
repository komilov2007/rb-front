import { styled } from '@mui/material/styles'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: theme.palette.allColors.PURPLE90,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: theme.palette.allColors.PURPLE90,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    borderRadius: 1,
    backgroundColor: theme.palette.allColors.GRAY10,
  },
}))

export const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  zIndex: 1,
  width: 52,
  height: 52,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.allColors.WHITE,
  border: `1px solid ${theme.palette.allColors.GRAY10}`,
  [theme.breakpoints.down('md')]: {
    width: 37,
    height: 37,
    svg: {
      width: '18px',
      height: '18px',
    },
  },
  ...(ownerState.active && {
    width: '65px',
    height: '65px',
    marginTop: '-8px',
    border: `1px solid ${theme.palette.allColors.PURPLE}`,
    backgroundImage: theme.palette.allColors.PURPLE100,
    [theme.breakpoints.down('md')]: {
      width: '50px',
      height: '50px',
      svg: {
        width: '18px',
        height: '18px',
      },
    },
    svg: {
      path: {
        fill: theme.palette.allColors.PURPLE,
      },
    },
  }),
  ...(ownerState.completed && {
    backgroundImage: theme.palette.allColors.PURPLE90,
    border: 'none',
  }),
}))
