import { Container } from './style'
import { STATUS } from '@/constants/review'
import { useTranslation } from 'react-i18next'
import type { ReviewStatusProps } from '@/types/review'

interface StatusProps {
  status: ReviewStatusProps
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
