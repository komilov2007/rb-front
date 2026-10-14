import { usePage } from './usePage'
import { STEPS } from './constants'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Table } from '@/components/table'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import Typography from '@mui/material/Typography'
import { InputSearch } from '@/components/inputs/input-search'
import { FormTelegramPost } from '@/components/forms/telegram-post'
import { Card, Header, WrapIcon, WrapTag, WrapWarning } from './style'
import { ReactComponent as IconWarning } from '@/assets/icons/warning.svg'
import { ReactComponent as IconCheckCircleGreen } from '@/assets/icons/check-circle-green.svg'
import { Empty } from '@/components/empty'

const Page = () => {
  const { t } = useTranslation()
  const {
    data,
    search,
    columns,
    can_edit,
    telegram,
    channels,
    setSearch,
    isLoading,
    isFetching,
    hasTelegram,
    can_edit_post,
    channelsLength,
  } = usePage()

  if (channels.isLoading || telegram.isLoading) {
    return <Spinner center />
  }

  if (typeof telegram.data?.data === 'string' || channelsLength === 0 || data.data.length === 0) {
    return (
      <Stack p='20px' height='100%' overflow='auto'>
        <Stack alignItems='center' flexGrow={1} width='100%'>
          {can_edit_post ? (
            <Stack gap='15px' maxWidth='720px'>
              <Stack gap='6px'>
                <Typography variant='title10'>{t('bot_channel_connection_guide')}</Typography>
                <Typography variant='text'>{t('follow_steps_in_order')}</Typography>
              </Stack>
              <Stack gap='10px' component='ul'>
                {STEPS.map(({ Icon, ...step }, i) => (
                  <Card key={i}>
                    <WrapIcon
                      sx={theme => ({
                        backgroundColor:
                          i === 0
                            ? step.color
                            : !hasTelegram || (channelsLength === 0 && i === 4)
                              ? theme.palette.allColors.GRAY10
                              : step.color,
                        color: step.iconColor,
                        'path , ellipse, circle':
                          i !== 0
                            ? !hasTelegram || (channelsLength === 0 && i === 4)
                              ? {
                                  fill: theme.palette.allColors.GRAY20,
                                  stroke: theme.palette.allColors.GRAY20,
                                }
                              : {
                                  fill: step.iconColor,
                                  stroke: step.iconColor,
                                }
                            : {},
                      })}
                    >
                      <Icon />
                    </WrapIcon>
                    <Stack gap='10px' width='100%' direction='row' justifyContent='space-between'>
                      <div>
                        <Typography variant='text250' component='span'>
                          {t('step', { value: i + 1 })}
                        </Typography>
                        <Typography variant='title50' component='h3'>
                          {t(step.title)}
                        </Typography>
                        <Typography variant='text' lineHeight='normal' component='p'>
                          {t(step.desc)}
                        </Typography>
                        {step.tag && (
                          <WrapTag
                            target='_blank'
                            sx={{ pointerEvents: hasTelegram ? '' : 'none' }}
                            className={hasTelegram ? '' : 'disable'}
                            to={`https://t.me/${telegram.data?.data.username}`}
                          >
                            {telegram.data?.data?.username
                              ? `@${telegram.data?.data.username}`
                              : step.tag}
                          </WrapTag>
                        )}
                        {step.warning && (
                          <WrapWarning className={hasTelegram ? '' : 'disable'}>
                            <IconWarning />
                            {t(step.warning)}
                          </WrapWarning>
                        )}
                      </div>
                      {(hasTelegram && i === 0) || (channelsLength && i !== 4) ? (
                        <div>
                          <IconCheckCircleGreen />
                        </div>
                      ) : null}
                      {typeof telegram.data?.data === 'string' && can_edit && i === 0 && (
                        <div>
                          <Button
                            component={Link}
                            size='extraSmall'
                            to={`${ROUTER.ADMIN}/${ROUTER.PLATFORMS}/${ROUTER.TELEGRAM_BOTS}/${ROUTER.PLATFORM_CREATE}?return=${ROUTER.ADMIN}/${ROUTER.MARKETING}/${ROUTER.MARKETING_POST}`}
                          >
                            {t('create_bot')}
                          </Button>
                        </div>
                      )}
                      {channelsLength !== 0 && i === 4 && (
                        <div>
                          <FormTelegramPost size='extraSmall' />
                        </div>
                      )}
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Stack>
          ) : (
            <Stack alignItems='center' flexGrow={1} justifyContent='center' height='100%'>
              <Empty />
            </Stack>
          )}
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack width='100%' height='100%'>
      <Stack p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('post_for_channel')}{' '}
          <Typography
            variant='text'
            component='span'
            color={theme => theme.palette.allColors.PURPLE10}
          >
            {data.data?.length ?? 0} {t('post')}
          </Typography>
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={search}
            onChange={setSearch}
            sx={{ maxWidth: '350px' }}
          />
          {can_edit_post && <FormTelegramPost />}
        </Header>
      </Stack>
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle='you_have_no_mailings'
        options={{
          columns,
          data: data.data,
        }}
      />
    </Stack>
  )
}

export default Page
