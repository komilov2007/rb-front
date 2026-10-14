import { Container } from './style'
import { STATUS } from '@/constants/order'
import { useTranslation } from 'react-i18next'
import { type OrderStatusesProps } from '@/types/order'

interface OrderStatusProps {
  status: OrderStatusesProps
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
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
