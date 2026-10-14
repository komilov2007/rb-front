import Box from '@mui/material/Box'
import { Tab, TabList } from './style'
import Stack from '@mui/material/Stack'
import { useCreate } from './useCreate'
import { Cart } from './components/cart'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { Products } from './components/products'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputSearch } from '@/components/inputs/input-search'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export const OrderCreate = () => {
  const { t } = useTranslation()
  const {
    tab,
    value,
    tabRef,
    search,
    setTrue,
    setFalse,
    handleOpen,
    categories,
    searchValue,
    handleSearch,
    handleChangeTab,
    isNewVersion,
  } = useCreate()

  return (
    <>
      {!isNewVersion && (
        <Button
          fullWidth
          onClick={handleOpen}
          size='mediumSmall'
          startIcon={<IconPlus />}
          sx={theme => ({
            svg: {
              path: {
                stroke: theme.palette.allColors.WHITE,
              },
            },
          })}
        >
          {t('create_order')}
        </Button>
      )}
      <SwipeableDrawer
        open={value}
        anchor='right'
        onOpen={setTrue}
        onClose={setFalse}
        PaperProps={{
          sx: theme => ({
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            maxWidth: 'min(75vw,1000px)',
            [theme.breakpoints.down('md')]: {
              maxWidth: '100%',
            },
          }),
        }}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <Stack flexGrow={1} height='100vh'>
          <Box
            display='flex'
            component='header'
            alignItems='center'
            justifyContent='space-between'
            p={{ xs: '7px 7px 0 20px', md: '7px 7px 0 32px' }}
          >
            <Typography variant='title30'>{t('create_order')}</Typography>
            <IconButton onClick={setFalse}>
              <IconRemove />
            </IconButton>
          </Box>
          {categories.isLoading ? (
            <Spinner center />
          ) : (
            <Stack flexGrow={1}>
              <TabContext value={tab}>
                <TabList
                  variant='scrollable'
                  scrollButtons={false}
                  onChange={handleChangeTab}
                  aria-label='tabs-order-categories'
                  TabIndicatorProps={{
                    sx: {
                      display: 'none',
                    },
                  }}
                >
                  {categories.data?.data.map(({ value, label }) => (
                    <Tab key={value} value={value} label={label} />
                  ))}
                </TabList>
                <Stack px={{ xs: '20px', md: '32px' }} flexGrow={1}>
                  <Stack my={{ xs: '10px', md: '28px' }}>
                    <InputSearch
                      variant='outlined'
                      value={searchValue}
                      onChange={handleSearch}
                      sx={{ maxWidth: '628px' }}
                      placeholder='search_product'
                    />
                  </Stack>
                  <Stack
                    flexGrow={1}
                    overflow='hidden'
                    gap={{ xs: '12px', md: '24px' }}
                    direction={{ xs: 'column', md: 'row' }}
                  >
                    <Products category={tab} search={search} ref={tabRef} />
                    <Cart handleClose={setFalse} />
                  </Stack>
                </Stack>
              </TabContext>
            </Stack>
          )}
        </Stack>
      </SwipeableDrawer>
    </>
  )
}
