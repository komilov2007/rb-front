import Stack from '@mui/material/Stack'
import { ReactComponent as IconStar } from '@/assets/icons/star.svg'

interface RatingProps {
  value: number
}

export const Rating = (props: RatingProps) => {
  return (
    <Stack gap='10px' direction='row' alignItems='center'>
      <Stack
        sx={theme => ({
          'svg path': { fill: theme.palette.allColors.YELLOW40, fillOpacity: 1 },
        })}
      >
        <IconStar />
      </Stack>
      {props.value.toFixed(1)}
    </Stack>
  )
}
