import Stack from '@mui/material/Stack'
import MuiSkeleton from '@mui/material/Skeleton'
import { Cards } from './style'

export const Skeleton = ({ size }: { size: 'medium' | 'small' }) => (
  <Stack spacing={1}>
    <MuiSkeleton variant='text' width='300px' height='40px' sx={{ fontSize: '1rem' }} />
    <Cards>
      {Array.from({ length: 8 }, (_, i: number) => (
        <Stack key={i} sx={{ minWidth: 242 }}>
          <MuiSkeleton
            width='100%'
            height={size === 'medium' ? '397px' : '217px'}
            variant='rounded'
            sx={theme => ({
              borderRadius: '12px',
              backgroundColor: theme.palette.allColors.GRAY510,
            })}
          />
        </Stack>
      ))}
    </Cards>
  </Stack>
)
