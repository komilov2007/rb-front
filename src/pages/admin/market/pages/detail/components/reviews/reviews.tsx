import { WrapRating } from './style'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { useParams } from 'react-router-dom'
import { ReviewCreate } from '../review-create'
import { useQuery } from '@tanstack/react-query'
import { type ParamProps } from '@/types/params'
import { ShowMoreText } from '../show-more-text'
import Typography from '@mui/material/Typography'
import { getAppDetailComment } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconStar } from '@/assets/icons/star.svg'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

export const Reviews = () => {
  const { t } = useTranslation()
  const { roboMarketAppId } = useParams<ParamProps>()
  const { data = { data: { count: 0, results: [] } } } = useQuery({
    queryKey: [REACT_QUERY_KEYS.ROBO_MARKET_APP_COMMENT, roboMarketAppId],
    queryFn: async () => await getAppDetailComment(String(roboMarketAppId)),
  })

  return (
    <Stack p='24px 20px' overflow='hidden'>
      <Stack gap='7px' direction='row'>
        <Typography variant='title20' fontWeight={500} component='h3'>
          {t('reviews')}
        </Typography>
        <Typography variant='text' color={theme => theme.palette.colors['L-GRAY260-D-GRAY20']}>
          {data?.data.count} {data?.data.count > 1 ? t('reviews') : t('review')}
        </Typography>
      </Stack>
      <Stack m='13px 0 30px'>
        <ReviewCreate />
      </Stack>
      <Stack
        component='ul'
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {data?.data.results.map(c => (
          <Stack key={c.id} component='li'>
            <Stack py='14px'>
              <Stack justifyContent='space-between' direction='row' gap={2}>
                <Stack mb='13px' gap='4px' direction='row' alignItems='center'>
                  <Typography variant='title40' lineHeight='normal'>
                    {c.user}
                  </Typography>
                  <WrapRating>
                    <Stack justifyContent='center'>
                      <IconStar />
                    </Stack>
                    {c.rate}
                  </WrapRating>
                </Stack>
                <Typography
                  pt={'3px'}
                  fontSize={10}
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                  whiteSpace='nowrap'
                  lineHeight='normal'
                  align='right'
                >
                  {dayjs(c.created_at).format('DD.MM.YYYY - HH:mm')}
                </Typography>
              </Stack>
              <ShowMoreText text={c.comment} />
            </Stack>
            <Divider />
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
