import { TabList } from './style'
import Tab from '@mui/material/Tab'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import { useState, type SyntheticEvent } from 'react'
import TabContext from '@mui/lab/TabContext'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import { useProfileStore } from '@/store/profile'
import { type LanguageTypes } from '@/types/language'
import useMediaQuery from '@mui/material/useMediaQuery'
import { LANGUAGE_OPTIONS } from '@/constants/languages'

interface TabLanguagesProps {
  panels: Array<{ value: string; panel: JSX.Element }>
  isRestaurant?: boolean
}

export const TabLanguages = ({ panels, isRestaurant = false }: TabLanguagesProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [tab, setTab] = useState<LanguageTypes | null>(null)
  const {
    language,
    isLoading,
    tabLanguage,
    setTabLanguage,
    languages = [],
  } = useProfileStore(state => ({
    language: state.language,
    isLoading: state.isLoading,
    tabLanguage: state.tabLanguage,
    languages: state.me?.languages,
    setTabLanguage: state.setTabLanguage,
  }))

  const handleChangeTab = (_: SyntheticEvent, tab: LanguageTypes) => {
    if (isRestaurant) {
      setTab(tab)
    } else {
      setTabLanguage(tab)
    }
  }

  return (
    <>
      {isLoading ? (
        <Skeleton variant='rounded' sx={{ maxWidth: '400px' }} height={44} />
      ) : (
        <TabContext value={isRestaurant ? (tab ?? language) : tabLanguage}>
          {languages.length <= 1 ? null : (
            <TabList
              onChange={handleChangeTab}
              aria-label='tabs-select-language'
              sx={{
                marginBottom: '28px',
              }}
            >
              {Object.values(LANGUAGE_OPTIONS)
                .filter(t => languages.includes(t.value))
                .map(({ Icon, value, label, shortLabel }) => (
                  <Tab
                    key={value}
                    value={value}
                    label={matches ? shortLabel : label}
                    icon={
                      <Stack
                        justifyContent='center'
                        sx={{ svg: { width: '19px', height: '18px' } }}
                      >
                        <Icon />
                      </Stack>
                    }
                    iconPosition='start'
                  />
                ))}
            </TabList>
          )}
          {panels.map(({ value, panel }) => (
            <TabPanel key={value} value={value} sx={{ p: '0' }}>
              {panel}
            </TabPanel>
          ))}
        </TabContext>
      )}
    </>
  )
}
