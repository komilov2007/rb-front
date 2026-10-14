import { TABS } from './constants'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { type SyntheticEvent } from 'react'
import TabContext from '@mui/lab/TabContext'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from '@/components/suspense'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import { getWebsiteDetail } from '@/apis/admin/sign-up'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconEmptyBot } from '@/assets/icons/empty-bot.svg'

const Layout = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))
  const { data, isLoading } = useQuery({
    queryFn: getWebsiteDetail,
    queryKey: [REACT_QUERY_KEYS.WEBSITE_DETAIL],
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
            {t('it_s_time_to_launch_your_own_website')}
          </Typography>
          <Typography m='13px 0 27px' align='center' maxWidth='470px'>
            {t('build_your_site_quickly_and_begin_taking_orders')}
          </Typography>
          <Button
            fullWidth
            component={Link}
            size='mediumSmall'
            sx={{
              maxWidth: '147px',
            }}
            to={ROUTER.PLATFORM_CREATE}
          >
            {t('create_website')}
          </Button>
        </Stack>
      </Box>
    ) : (
      <Stack p='20px' height='100%'>
        <TabContext value={location.pathname}>
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={onChangeTab}
            aria-label='website-tabs'
          >
            {TABS.map((tab, i: number) => (
              <Tab
                key={i}
                label={t(tab.label)}
                value={`${ROUTER.ADMIN}/${ROUTER.PLATFORMS}/${ROUTER.WEBSITE}${tab.value}`}
              />
            ))}
          </TabList>
          <Suspense>
            <Stack
              height='100%'
              flexGrow={1}
              pt='27px'
              sx={theme => ({
                overflowY: 'auto',
                [theme.breakpoints.down('md')]: {
                  scrollbarColor: 'transparent transparent',
                },
              })}
            >
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
