import { Container } from './style'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import type { RoboMarketListProps } from '@/types/robo-market'

export const Card = (props: RoboMarketListProps) => {
  const { t } = useTranslation()

  return (
    <Stack>
      <Container to={`${props.id}`}>
        <Stack mb='12px' gap='11px' direction='row'>
          <img
            src={props.icon}
            alt={props.name}
            style={{ width: '58px', height: '58px', borderRadius: '4px' }}
          />
          <Stack gap='4px'>
            <Typography variant='text140' component='h4'>
              {props.name}
            </Typography>
            <Stack gap='5px' direction='row' alignItems='center'>
              <Rating max={1} precision={0.1} defaultValue={props.rate / 5} />
              <Typography variant='text140' component='h5'>
                {props.rate}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Button fullWidth variant='outlined-purple'>
          {t('open')}
        </Button>
      </Container>
    </Stack>
  )
}
