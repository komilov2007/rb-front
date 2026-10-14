import { Container } from './style'
import { SMS_STATUS } from '@/constants/sms'
import { useTranslation } from 'react-i18next'
import { type SmsMailingStatusProps } from '@/types/sms-mailing'

interface SmsStatusProps {
  status: SmsMailingStatusProps
}

export const SmsStatus = ({ status }: SmsStatusProps) => {
  const { t } = useTranslation()

  return (
    <Container
      sx={theme => ({
        color: theme.palette.allColors[SMS_STATUS[status]?.color],
        background: theme.palette.allColors[SMS_STATUS[status]?.bgcolor],
      })}
    >
      {t(SMS_STATUS[status]?.label)}
    </Container>
  )
}
