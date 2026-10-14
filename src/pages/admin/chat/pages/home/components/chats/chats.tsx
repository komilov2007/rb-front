import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useChatStore } from '@/store/chat'
import TabContext from '@mui/lab/TabContext'
import { useTranslation } from 'react-i18next'
import { Suspense } from '@/components/suspense'
import { ReactComponent as IconInstagram } from '@/assets/icons/instagram.svg'
import { type ChatUserTypesProps } from '@/types/chat'
import { InputSearch } from '@/components/inputs/input-search'
import { lazy, useCallback, type SyntheticEvent } from 'react'

const Users = lazy(async () => await import('../users'))

type PanelsProps = Record<
  ChatUserTypesProps,
  {
    label: string
    value: ChatUserTypesProps
  }
>

const PANELS: PanelsProps = {
  all: {
    value: 'all',
    label: 'all',
  },
  unread: {
    value: 'unread',
    label: 'unread',
  },
  instagram: {
    value: 'instagram',
    label: 'Instagram',
  },
  review: {
    value: 'review',
    label: 'reviews',
  },
}

export const Chats = () => {
  const { t } = useTranslation()
  const { type, search, setType, setSearch } = useChatStore(state => ({
    type: state.type,
    search: state.search,
    setType: state.setType,
    setSearch: state.setSearch,
  }))
  const handleSearch = useCallback(
    (search: string) => {
      setSearch(search)
    },
    [setSearch],
  )

  const onChangeTab = (_: SyntheticEvent, tab: ChatUserTypesProps) => {
    setType(tab)
  }

  return (
    <>
      <Box p='10px 20px 16px'>
        <InputSearch
          variant='outlined'
          value={search}
          onChange={handleSearch}
          inputProps={{ maxLength: 100 }}
        />
      </Box>
      <TabContext value={type}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          aria-label='chat-tabs'
          onChange={onChangeTab}
          sx={{
            p: '0 20px',
            '::after': {
              left: '20px',
              width: 'calc(100% - 40px)',
            },
          }}
        >
          {Object.values(PANELS).map(({ value, label }) => (
            <Tab
              key={value}
              value={value}
              icon={label === 'Instagram' ? <IconInstagram width={15} /> : undefined}
              iconPosition='start'
              label={t(label)}
              sx={{ p: '11px 9px', minWidth: 'fit-content' }}
            />
          ))}
        </TabList>
        {Object.values(PANELS).map(({ value }) => (
          <TabPanel
            key={value}
            value={value}
            sx={{
              p: '5px 0 0',
              height: 'calc(100% - 140px)',
            }}
          >
            <Suspense>
              <Users />
            </Suspense>
          </TabPanel>
        ))}
      </TabContext>
    </>
  )
}
