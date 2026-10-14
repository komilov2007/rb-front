import { Container } from './style'
import { useTranslation } from 'react-i18next'
import { STATUS } from '@/constants/reservation'
import type { ReservationStatusProps } from '@/types/reservation'

interface StatusProps {
  status: ReservationStatusProps
}

export const Status = ({ status }: StatusProps) => {
  const { t } = useTranslation()

  return (
    <Container
      sx={theme => ({
        color: theme.palette.allColors[STATUS[status].color],
        background: theme.palette.allColors[STATUS[status].bgcolor],
      })}
    >
      {t(STATUS[status].label)}
    </Container>
  )
}
