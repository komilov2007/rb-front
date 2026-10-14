import { WrapProduct } from './style'
import Stack from '@mui/material/Stack'
import MuiSkeleton from '@mui/material/Skeleton'

export const Skeleton = () => (
  <Stack
    width='100%'
    display='grid'
    gap='14px 22px'
    gridTemplateColumns={{ xs: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }}
  >
    {Array.from({ length: 6 }, (_, i: number) => (
      <WrapProduct key={i}>
        <MuiSkeleton
          width='100%'
          height='104px'
          variant='rounded'
          animation={false}
          sx={theme => ({
            borderRadius: '10px',
            backgroundColor: theme.palette.allColors.GRAY510,
          })}
        />
        <Stack mt='8px' flexGrow={1} justifyContent='space-between'>
          <MuiSkeleton
            width='100%'
            height='18px'
            animation={false}
            variant='rounded'
            sx={theme => ({
              borderRadius: '4px',
              backgroundColor: theme.palette.allColors.GRAY510,
            })}
          />
          <MuiSkeleton
            width='80%'
            height='18px'
            animation={false}
            variant='rounded'
            sx={theme => ({
              borderRadius: '4px',
              backgroundColor: theme.palette.allColors.GRAY510,
            })}
          />
          <MuiSkeleton
            width='100%'
            height='36px'
            animation={false}
            variant='rounded'
            sx={theme => ({
              borderRadius: '8px',
              backgroundColor: theme.palette.allColors.GRAY510,
            })}
          />
        </Stack>
      </WrapProduct>
    ))}
  </Stack>
)
