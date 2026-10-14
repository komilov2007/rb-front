import dayjs from 'dayjs'
import { TABS } from './constants'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { type SyntheticEvent } from 'react'
import TabContext from '@mui/lab/TabContext'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { Suspense } from '@/components/suspense'
import { useQuery } from '@tanstack/react-query'
import { Platform } from '@/components/platform'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { Header, WrapIcon, Wrapper } from './style'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getTelegramBotSettings } from '@/apis/admin/telegram-bot'
import { ReactComponent as IconPocket } from '@/assets/icons/pocket.svg'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as IconEmptyBot } from '@/assets/icons/empty-bot.svg'
import { ReactComponent as IconUsersActive } from '@/assets/icons/users-active.svg'

const Layout = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { can_edit, subscription, setSubscriptionModal } = useProfileStore(state => ({
    can_edit: state.getPermission('telegram_bot', 'can_edit'),
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))
  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.TELEGRAM_BOT_SETTINGS],
    queryFn: getTelegramBotSettings,
  })

  const onChangeTab = (_: SyntheticEvent, tab: string) => {
    const qrPath = `/${ROUTER.QR_CODE}`

    if (tab.endsWith(qrPath) && subscription?.tariff === 'START') {
      setSubscriptionModal(true)
    } else {
      navigate(tab)
    }
  }

  const content = () => {
    return typeof data?.data === 'string' ? (
      <Box display='flex' height='100%' width='100%' flexGrow={1} alignItems='center'>
        <Stack alignItems='center' width='100%'>
          <Stack mb='68px'>
            <IconEmptyBot />
          </Stack>
          <Typography variant='title30' fontWeight='700'>
            {t('you_havent_added_a_bot_yet')}
          </Typography>
          <Typography m='13px 0 27px' align='center' maxWidth='470px'>
            {t(
              'if_you_receive_an_order_by_phone_you_can_also_manage_those_orders_by_entering_them_into_the_system',
            )}
          </Typography>
          {can_edit && (
            <Button
              fullWidth
              component={Link}
              size='mediumSmall'
              sx={{
                maxWidth: '147px',
              }}
              to={ROUTER.PLATFORM_CREATE}
            >
              {t('create_bot')}
            </Button>
          )}
        </Stack>
      </Box>
    ) : (
      <Stack p={{ xs: '10px', md: '20px' }} height='100%'>
        <Header>
          <Stack width='100%' gap='30px' direction='row' alignItems='center'>
            <Avatar sx={{ width: '38px', height: '38px' }} />
            <Stack>
              <Stack
                gap='10px'
                target='_blank'
                direction='row'
                component={Link}
                alignItems='center'
                to={`https://t.me/${data?.data.username}`}
              >
                <Typography variant='title50' lineHeight='normal'>
                  {data?.data.firstname}
                </Typography>
                <Platform platform='TELEGRAM' />
              </Stack>
              <Typography variant='text' fontSize='12px' whiteSpace='nowrap'>
                {t('last_update')}{' '}
                <Typography
                  variant='inherit'
                  component='span'
                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                >
                  {dayjs(data?.data.updated_at).format('HH:mm; MMM D, YYYY')}
                </Typography>
              </Typography>
            </Stack>
          </Stack>
          <Wrapper>
            <Stack gap='8px' direction='row' alignItems='center'>
              <WrapIcon>
                <IconUsersActive />
              </WrapIcon>
              <Stack>
                <Typography variant='title10' fontSize='14px'>
                  {data?.data.users}
                </Typography>
                <Typography variant='text' fontSize='11px'>
                  {t('customers')}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap='8px' direction='row' alignItems='center'>
              <WrapIcon>
                <IconPocket />
              </WrapIcon>
              <Stack>
                <Typography variant='title10' fontSize='14px'>
                  {data?.data.orders}
                </Typography>
                <Typography variant='text' fontSize='11px'>
                  {t('orders_number')}
                </Typography>
              </Stack>
            </Stack>
          </Wrapper>
        </Header>
        <TabContext value={location.pathname}>
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={onChangeTab}
            aria-label='telegram-bot-tabs'
          >
            {TABS.map((tab, i: number) => (
              <Tab
                key={i}
                label={t(tab.label)}
                value={`${ROUTER.ADMIN}/${ROUTER.PLATFORMS}/${ROUTER.TELEGRAM_BOTS}${tab.value}`}
              />
            ))}
          </TabList>
          <Suspense>
            <Stack height='100%' flexGrow={1} pt='27px' sx={{ overflowY: 'auto' }}>
              <Outlet context={data?.data} />
            </Stack>
          </Suspense>
        </TabContext>
      </Stack>
    )
  }
  return (
    <Stack height='100%' width='100%' flexGrow={1}>
      {isLoading ? <Spinner center /> : content()}
    </Stack>
  )
}

export default Layout
