import { Container } from './style'
import Typography from '@mui/material/Typography'
import { numberFormat } from '@/utils/number-format'
import { ReactComponent as IconBonus } from '@/assets/icons/bonus.svg'

interface BonusProps {
  value: number | string
}

export const Bonus = (props: BonusProps) => {
  return (
    <Container>
      <IconBonus />
      <Typography variant='text350'>{numberFormat(props.value)}</Typography>
    </Container>
  )
}
