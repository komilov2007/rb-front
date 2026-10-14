import dayjs from 'dayjs'
import { Media } from '../media'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import isToday from 'dayjs/plugin/isToday'
import { Image } from '@/components/image'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { type MessageProps } from '@/types/chat'
import Typography from '@mui/material/Typography'
import { Wrapper, WrapDate, Container } from './style'

dayjs.extend(isToday)

export const Message = (props: MessageProps) => {
  const { t } = useTranslation()
  const isMineMessage = props.is_bot

  return (
    <>
      <Container isMineMessage={isMineMessage}>
        <Wrapper isMineMessage={isMineMessage}>
          {props.message_type === 'REVIEW' && (
            <Typography component='h4' variant='title40'>
              {t('review_title')}
            </Typography>
          )}
          {props.file && <Media {...props} />}
          {props.message_type === 'ORDER' ? (
            <Stack gap='12px'>
              <Stack>
                <Typography
                  fontWeight='400'
                  variant='title50'
                  color={theme => (isMineMessage ? theme.palette.allColors.WHITE : undefined)}
                >
                  {t('order_id')}: {props.order_id};
                </Typography>
                <Typography
                  fontWeight='400'
                  variant='title50'
                  color={theme => (isMineMessage ? theme.palette.allColors.WHITE : undefined)}
                >
                  {t('date_time')}: {dayjs(props.created_at).format('HH:mm; MM.DD.YYYY')};
                </Typography>
                <Typography
                  fontWeight='400'
                  variant='title50'
                  color={theme => (isMineMessage ? theme.palette.allColors.WHITE : undefined)}
                >
                  {t('products')}: {props.products_count}
                </Typography>
              </Stack>
              <Button
                fullWidth
                size='small'
                component={Link}
                variant='contained-green'
                to={`${ROUTER.ADMIN}/${ROUTER.ORDERS}`}
              >
                {t('go_to_order')}
              </Button>
            </Stack>
          ) : (
            <Typography
              fontWeight='400'
              variant='title50'
              sx={{ whiteSpace: 'pre-wrap' }}
              color={theme => (isMineMessage ? theme.palette.allColors.WHITE : undefined)}
            >
              {props.text}
            </Typography>
          )}
          {props.message_type === 'REVIEW' && (
            <Stack sx={{ margin: '10px 0 10px 10px', width: '100%' }} alignItems='flex-end'>
              <Rating sx={{ gap: '10px' }} readOnly value={props.review_data.rating} />
            </Stack>
          )}
          {props.message_type === 'REVIEW' && props.review_data.images.length > 0 && (
            <Stack>
              {props.review_data.images.map((image, index) => (
                <Image
                  isGallery
                  src={image}
                  key={index}
                  radius='5px'
                  alt={props.review_data.comment}
                  sx={{
                    width: '48px',
                    height: '64px',
                  }}
                />
              ))}
            </Stack>
          )}
          <Stack>
            <Typography
              align='right'
              component='h6'
              variant='text50'
              color={theme => (isMineMessage ? theme.palette.allColors.WHITE : undefined)}
            >
              {dayjs(props.created_at).format('HH:mm')}
            </Typography>
          </Stack>
        </Wrapper>
      </Container>
      {props.is_first && (
        <Stack mt='11px' alignItems='center'>
          <WrapDate>
            <Typography variant='text' fontSize='16px' lineHeight='20px'>
              {dayjs(props.created_at).isToday()
                ? t('today')
                : dayjs(props.created_at).format('DD.MM.YYYY')}
            </Typography>
          </WrapDate>
        </Stack>
      )}
    </>
  )
}
