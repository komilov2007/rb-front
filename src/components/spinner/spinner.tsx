import Box from '@mui/material/Box'
import CircularProgress, { type CircularProgressProps } from '@mui/material/CircularProgress'

export interface PropTypes extends CircularProgressProps {
  center?: boolean
}

export const Spinner = ({ center, ...rest }: PropTypes) => (
  <Box
    className='suspense'
    sx={
      center
        ? {
            flexGrow: 1,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...rest.sx,
          }
        : rest.sx
    }
  >
    <CircularProgress {...rest} />
  </Box>
)
