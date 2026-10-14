import dayjs from 'dayjs'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { Bonus } from '@/components/bonus'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { Platform } from '@/components/platform'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import relativeTime from 'dayjs/plugin/relativeTime'
import { type DetailCustomerProps } from '@/types/customer'
import { ReactComponent as IconPhone } from '@/assets/icons/phone.svg'
import { ReactComponent as IconSend45 } from '@/assets/icons/send-45.svg'

dayjs.extend(relativeTime)

export const Customer = (props: DetailCustomerProps) => {
  const { t } = useTranslation()

  return (
    <Stack
      gap='20px'
      overflow='auto'
      p={{
        xs: '15px',
        md: '36px 20px 20px',
      }}
    >
      <Stack
        gap='10px'
        width='100%'
        alignItems='center'
        justifyContent='center'
        direction={{ xs: 'row', md: 'column' }}
      >
        <Avatar
          src={props.photo}
          alt={props.firstname}
          sx={theme => ({
            width: { xs: '50px', md: '80px' },
            height: { xs: '50px', md: '80px' },
            boxShadow: '0px 6px 10px 0px rgba(0, 0, 0, 0.18)',
            border: `2px solid ${theme.palette.colors['L-WHITE-D-GRAY40']}`,
          })}
        />
        <Stack>
          <Typography mt='13px' variant='title30' component='h2' align='center'>
            {props.firstname}
          </Typography>
          <Stack>
            <Typography
              align='center'
              m='5px 0 15px'
              variant='title20'
              color={theme => theme.palette.colors['L-GRAY30-D-WHITE20']}
            >
              {props.username}
            </Typography>
            <div>
              <Button
                fullWidth
                size='small'
                component={Link}
                variant='contained-green'
                startIcon={<IconSend45 />}
                to={`${ROUTER.ADMIN}/${ROUTER.CHAT}/${props.id}`}
                sx={theme => ({
                  minWidth: '178px',
                  color: theme.palette.colors['L-WHITE-D-BLACK10'],
                  svg: {
                    path: {
                      fill: theme.palette.colors['L-WHITE-D-BLACK10'],
                    },
                  },
                })}
              >
                {t('send_message')}
              </Button>
            </div>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        pt='20px'
        gap='14px'
        sx={theme => ({ borderTop: `1px solid ${theme.palette.colors['L-GRAY10-D-BLACK20']}` })}
      >
        <Typography variant='title50' component='h3' lineHeight='normal'>
          {t('user_info')}
        </Typography>
        <Stack gap='14px' component='ul'>
          <Stack component='li' direction='row' alignItems='center' justifyContent='space-between'>
            <Stack gap='4px'>
              <Typography variant='text' component='h6' fontWeight='300'>
                {t('phone_number')}
              </Typography>
              <Typography
                variant='text'
                color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
              >
                {props.phone ?? '-'}
              </Typography>
            </Stack>
            {props.phone && (
              <Stack>
                <IconButton radius='6px' component={Link} to={`tel:${props.phone}`}>
                  <IconPhone />
                </IconButton>
              </Stack>
            )}
          </Stack>
          <Stack gap='4px' component='li'>
            <Typography variant='text' component='h6' fontWeight='300'>
              {t('current_bonus_ball')}
            </Typography>
            <Bonus value={props.cashback_ball} />
          </Stack>
          <Stack gap='4px' component='li'>
            <Typography variant='text' component='h6' fontWeight='300'>
              {t('added_date')}
            </Typography>
            <Typography variant='text' color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}>
              {dayjs(props.created_at).format('DD.MM.YYYY, HH:mm')}
            </Typography>
          </Stack>
          <Stack gap='4px' component='li'>
            <Typography variant='text' component='h6' fontWeight='300'>
              {t('last_visited')}
            </Typography>
            <Typography variant='text' color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}>
              {dayjs(props.last_active).fromNow()}
            </Typography>
          </Stack>
          <Stack gap='4px' component='li'>
            <Typography variant='text' component='h6' fontWeight='300'>
              {t('platform')}
            </Typography>
            <Stack gap='3px' direction='row'>
              {props.platform.map((p, i) => (
                <Fragment key={p}>
                  {i !== 0 && '/'}
                  <Platform platform={p} />
                </Fragment>
              ))}
            </Stack>
          </Stack>
          <Stack gap='4px' component='li'>
            <Typography variant='text' component='h6' fontWeight='300'>
              {t('location')}
            </Typography>

            <Stack direction='row' gap={2} flexWrap='wrap'>
              {props.addresses.map((a, i) => (
                <Typography
                  key={i}
                  variant='text'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {a.address}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
