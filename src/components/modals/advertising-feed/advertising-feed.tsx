import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { Copy } from '@/components/copy'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import TabContext from '@mui/lab/TabContext'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import type { LanguageTypes } from '@/types/language'
import { LANGUAGE_OPTIONS } from '@/constants/languages'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconFileList } from '@/assets/icons/file-list.svg'
import { ReactComponent as IconInformation } from '@/assets/icons/information.svg'
import { FEED_FORMAT_OPTIONS, FEED_CATEGORY_MODE_OPTIONS } from '@/constants/feed'
import { type AdvertisingFeedProps, useAdvertisingFeed } from './useAdvertisingFeed'
import { ReactComponent as IconOpenExternal } from '@/assets/icons/icon-external.svg'
import { SectionLabel, FlagIcon, InfoBox, InfoIcon, Section, TabList } from './style'

export const AdvertisingFeed = (props: AdvertisingFeedProps) => {
  const { t } = useTranslation()
  const {
    modal,
    feedLink,
    language,
    formatTab,
    categories,
    categoryIds,
    categoryMode,
    currentFormatTab,
    isEmptyCategories,
    selectedCategories,
    isLoadingCategories,
    handleChangeLanguage,
    handleDeleteCategory,
    handleChangeFormatTab,
    isSelectedCategoryMode,
    handleChangeCategoryIds,
    handleChangeCategoryMode,
  } = useAdvertisingFeed(props)

  return (
    <>
      <Button variant='contained-light' startIcon={<IconFileList />} onClick={modal.setTrue}>
        {t('advertising_feed')}
      </Button>
      <SwipeableDrawer
        anchor='right'
        open={modal.value}
        onOpen={modal.setTrue}
        onClose={modal.setFalse}
      >
        <Box className='container'>
          <Box
            display='flex'
            p='24px 24px 0 32px'
            component='header'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='title30'>{t('advertising_feed')}</Typography>
            <IconButton onClick={modal.setFalse} aria-label={t('close')}>
              <IconRemove />
            </IconButton>
          </Box>
          <Box className='content'>
            <Stack gap='20px'>
              <Section>
                <SectionLabel>{t('feed_format')}</SectionLabel>
                <TabContext value={formatTab}>
                  <TabList aria-label='feed-format-tabs' onChange={handleChangeFormatTab}>
                    {FEED_FORMAT_OPTIONS.map(option => (
                      <Tab key={option.value} value={option.value} label={option.label} />
                    ))}
                  </TabList>
                </TabContext>
                <Typography variant='text60' color={theme => theme.palette.allColors.GRAY30}>
                  {t(currentFormatTab.description)}
                </Typography>
              </Section>
              <Section>
                <SectionLabel>{t('language')}</SectionLabel>
                <Select
                  displayEmpty
                  size='small'
                  value={language}
                  aria-label={t('feed_language')}
                  onChange={handleChangeLanguage}
                  renderValue={(selected: LanguageTypes) => {
                    const option = LANGUAGE_OPTIONS[selected]
                    const Icon = option.Icon

                    return (
                      <Stack gap='6px' direction='row' alignItems='center'>
                        <FlagIcon>
                          <Icon />
                        </FlagIcon>
                        {option.label}
                      </Stack>
                    )
                  }}
                >
                  {Object.values(LANGUAGE_OPTIONS).map(({ Icon, value, label }) => {
                    return (
                      <MenuItem key={value} value={value} sx={{ gap: '6px' }}>
                        <FlagIcon>
                          <Icon />
                        </FlagIcon>
                        <Typography variant='inherit'>{label}</Typography>
                      </MenuItem>
                    )
                  })}
                </Select>
              </Section>
              <Section>
                <SectionLabel>{t('feed_categories')}</SectionLabel>
                <TabContext value={categoryMode}>
                  <TabList aria-label='feed-category-tabs' onChange={handleChangeCategoryMode}>
                    {FEED_CATEGORY_MODE_OPTIONS.map(option => (
                      <Tab key={option.value} value={option.value} label={t(option.label)} />
                    ))}
                  </TabList>
                </TabContext>
                {isSelectedCategoryMode && (
                  <>
                    <Select
                      multiple
                      size='small'
                      displayEmpty
                      value={categoryIds}
                      aria-label={t('feed_categories')}
                      disabled={isLoadingCategories}
                      onChange={handleChangeCategoryIds}
                      renderValue={selected =>
                        selected.length === 0
                          ? t('feed_categories_placeholder')
                          : t('feed_selected_categories_count', { count: selected.length })
                      }
                    >
                      {categories.data.map(category => (
                        <MenuItem key={category.id} value={category.id}>
                          <Checkbox checked={categoryIds.includes(category.id)} sx={{ mr: 1 }} />
                          <Typography variant='inherit'>{category.name}</Typography>
                        </MenuItem>
                      ))}
                      {isEmptyCategories && (
                        <MenuItem disabled sx={{ justifyContent: 'center' }}>
                          <Typography variant='inherit'>{t('not_found')}</Typography>
                        </MenuItem>
                      )}
                    </Select>
                    <Stack gap='8px' direction='row' flexWrap='wrap'>
                      {selectedCategories.map(category => (
                        <Chip
                          key={category.id}
                          variant='outlined'
                          label={category.name}
                          onDelete={handleDeleteCategory(category.id)}
                          aria-label={t('feed_remove_category')}
                        />
                      ))}
                    </Stack>
                  </>
                )}
              </Section>
              <Section>
                <Stack direction='row' alignItems='end' gap='8px'>
                  <TextField
                    fullWidth
                    size='small'
                    value={feedLink}
                    variant='outlined'
                    label={t('feed_link')}
                    aria-label={t('feed_link')}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <IconButton
                    color='gray'
                    component='a'
                    href={feedLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={t('feed_open_link')}
                  >
                    <IconOpenExternal />
                  </IconButton>
                  <Copy text={feedLink} color='gray' />
                </Stack>
              </Section>
              <InfoBox>
                <InfoIcon>
                  <IconInformation />
                </InfoIcon>
                <Typography variant='text70' color={theme => theme.palette.allColors.BLUE20}>
                  {t('feed_info_text')}
                </Typography>
              </InfoBox>
            </Stack>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
