import dayjs from 'dayjs'
import { SmsStatus } from '../status'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { Card, CardContent } from './style'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { numberFormat } from '@/utils/number-format'
import type { SmsMailingProps } from '@/types/sms-mailing'

export const CardSms = (props: SmsMailingProps) => {
  const { t } = useTranslation()

  return (
    <Card key={props.id} to={`${ROUTER.PAYMENT_HISTORY}/${props.id}`}>
      <Stack gap='10px' flexGrow={1}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography noWrap variant='title30'>
            {props.template_name}
          </Typography>
          <SmsStatus status={props.status} />
        </Stack>
        <Typography noWrap data-lines='2' variant='text30'>
          {props.template_text}
        </Typography>
      </Stack>
      <CardContent>
        <Stack gap='5px'>
          <Typography variant='text'>{props.total_recipients}</Typography>
          <Typography variant='title80' fontSize='13px'>
            {t('sent_users')}
          </Typography>
        </Stack>
        <Divider orientation='vertical' variant='middle' flexItem />
        <Stack gap='5px'>
          <Typography variant='text'>{numberFormat(props.total_cost)} UZS</Typography>
          <Typography variant='title80' fontSize='13px'>
            {t('total_price')}
          </Typography>
        </Stack>
        <Divider orientation='vertical' variant='middle' flexItem />
        <Stack gap='5px'>
          <Typography variant='text'>{dayjs(props.created_at).format('DD/MM/YYYY')}</Typography>
          <Typography variant='title80' fontSize='13px'>
            {t('created')}
          </Typography>
        </Stack>
      </CardContent>
      <Button
        onClick={e => {
          e.stopPropagation()
        }}
        to={`${props.id}`}
        component={Link}
        disabled={props.status !== 'confirmed'}
        sx={theme => ({
          '&.Mui-disabled': {
            color: theme.palette.allColors.WHITE,
            background: theme.palette.allColors.GRAY10,
          },
        })}
      >
        {t('send_message')}
      </Button>
    </Card>
  )
}
