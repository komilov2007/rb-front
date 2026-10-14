import Stack from '@mui/material/Stack'
import { useBoolean } from '@/hooks/useBoolean'
import Typography from '@mui/material/Typography'

interface ShowMoreTextProps {
  text: string
}

export const ShowMoreText = ({ text }: ShowMoreTextProps) => {
  const { value, toggle } = useBoolean()

  return (
    <Stack>
      <Typography variant='text150'>
        {value ? text : `${text.substring(0, 190)}`}
        {text.length > 190 && (
          <Typography
            ml='5px'
            onClick={toggle}
            variant='text150'
            component='button'
            sx={theme => ({
              border: 'none',
              cursor: 'pointer',
              color: theme.palette.allColors.PURPLE10,
              backgroundColor: theme.palette.allColors.TRANSPARENT,
            })}
          >
            {value ? 'less' : '...more'}
          </Typography>
        )}
      </Typography>
    </Stack>
  )
}
