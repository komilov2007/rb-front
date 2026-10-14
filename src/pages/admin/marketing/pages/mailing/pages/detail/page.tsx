import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { useParams } from 'react-router-dom'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { type ParamProps } from '@/types/params'
import Typography from '@mui/material/Typography'
import { getMailingDetail } from '@/apis/admin/mailing'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconCtr } from '@/assets/icons/ctr.svg'
import { ReactComponent as IconViews } from '@/assets/icons/views.svg'
import { ReactComponent as IconClicks } from '@/assets/icons/clicks.svg'

const Page = () => {
  const { t } = useTranslation()
  const { mailingId } = useParams<ParamProps>()
  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.MAILING_DETAIL, mailingId],
    queryFn: async () => await getMailingDetail(String(mailingId)),
  })

  return (
    <Stack p='24px 20px' flexGrow={1}>
      {isLoading ? (
        <Spinner center />
      ) : (
        <>
          <Typography mb='26px' variant='title50' fontWeight='400'>
            LIFETIME ANALYTICS
          </Typography>
          <Stack gap='64px' direction='row' alignItems='center'>
            <Stack gap='10px' direction='row' alignItems='center'>
              <Stack justifyContent='center'>
                <IconViews />
              </Stack>
              <Stack justifyContent='center'>
                <Typography variant='text100'>Send</Typography>
                <Typography
                  variant='text100'
                  sx={theme => ({
                    fontWeight: 500,
                    color: theme.palette.colors['L-BLACK30-D-WHITE20'],
                  })}
                >
                  {data?.data.success}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap='10px' direction='row' alignItems='center'>
              <Stack justifyContent='center'>
                <IconClicks />
              </Stack>
              <Stack justifyContent='center'>
                <Typography variant='text100'>Clicks</Typography>
                <Typography
                  variant='text100'
                  sx={theme => ({
                    fontWeight: 500,
                    color: theme.palette.colors['L-BLACK30-D-WHITE20'],
                  })}
                >
                  {data?.data.clicks}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap='10px' direction='row' alignItems='center'>
              <Stack justifyContent='center'>
                <IconCtr />
              </Stack>
              <Stack justifyContent='center'>
                <Typography variant='text100'>CTR</Typography>
                <Typography
                  variant='text100'
                  sx={theme => ({
                    fontWeight: 500,
                    color: theme.palette.colors['L-BLACK30-D-WHITE20'],
                  })}
                >
                  {data?.data.success === 0
                    ? 0
                    : (Number(data?.data.clicks) * 100) / Number(data?.data.success)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack mt='60px' gap='21px' width='100%' maxWidth='506px'>
            <Stack width='100%' direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='text100' fontSize='16px'>
                {t('mailing_name')}
              </Typography>
              <Typography
                variant='text100'
                sx={theme => ({
                  fontWeight: 500,
                  fontSize: '16px',
                  color: theme.palette.colors['L-BLACK30-D-WHITE20'],
                })}
              >
                {data?.data.title}
              </Typography>
            </Stack>
            <Stack width='100%' direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='text100' fontSize='16px'>
                Type
              </Typography>
              <Typography
                sx={theme => ({
                  fontWeight: 500,
                  fontSize: '16px',
                  color: theme.palette.colors['L-BLACK30-D-WHITE20'],
                })}
              >
                {data?.data.error}
              </Typography>
            </Stack>
            <Stack width='100%' direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='text100' fontSize='16px'>
                {t('created_date_time')}
              </Typography>
              <Typography
                sx={theme => ({
                  fontWeight: 500,
                  fontSize: '16px',
                  color: theme.palette.colors['L-BLACK30-D-WHITE20'],
                })}
              >
                {dayjs(data?.data.created_at).format('hh:mm; DD.MM.YYYY')}
              </Typography>
            </Stack>
            <Stack width='100%' direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='text100' fontSize='16px'>
                Sent date&time
              </Typography>
              <Typography
                sx={theme => ({
                  fontWeight: 500,
                  fontSize: '16px',
                  color: theme.palette.colors['L-BLACK30-D-WHITE20'],
                })}
              >
                {dayjs(data?.data.schedule_datetime).format('hh:mm; DD.MM.YYYY')}
              </Typography>
            </Stack>
            <Stack width='100%' direction='row' alignItems='center' justifyContent='space-between'>
              <Typography variant='text100' fontSize='16px'>
                {t('blocked')}
              </Typography>
              <Typography
                sx={theme => ({
                  fontWeight: 500,
                  fontSize: '16px',
                  color: theme.palette.colors['L-BLACK30-D-WHITE20'],
                })}
              >
                {data?.data.blocked}
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default Page
