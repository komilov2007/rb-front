import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import { Outlet } from 'react-router-dom'
import TabContext from '@mui/lab/TabContext'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { getTitle } from '@/constants/domain-themes'
import { useState, type SyntheticEvent } from 'react'
import { getRoboMarketList } from '@/apis/admin/robo-market'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'

const Layout = () => {
  const { t } = useTranslation()
  const [tab, setTab] = useState<string>('')
  const [, setSearchValue] = useSearchParamsState('search', '')
  const { data, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.ROBO_MARKET_LIST],
    queryFn: getRoboMarketList,
    select: res => {
      const data = [{ id: 'all', name: 'all' }, ...res.data]
      return { ...res, data }
    },
    onSuccess: res => {
      setTab(String(res?.data[0]?.id))
    },
  })

  const onChangeTab = (_: SyntheticEvent, tab: string) => {
    setTab(tab)
    setSearchValue('')
  }

  return (
    <Stack height='100%'>
      {isLoading ? (
        <Spinner center />
      ) : (
        <TabContext value={tab}>
          <Stack p='25px 20px 0'>
            <Typography variant='title90' component='h2'>
              {getTitle().title}
            </Typography>
            <TabList
              variant='scrollable'
              scrollButtons={false}
              onChange={onChangeTab}
              aria-label='telegram-bot-tabs'
            >
              {data?.data.map(m => (
                <Tab key={m.id} label={t(m.name)} value={String(m.id)} />
              ))}
            </TabList>
          </Stack>
          <Outlet context={tab} />
        </TabContext>
      )}
    </Stack>
  )
}

export default Layout
