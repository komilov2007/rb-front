import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import { Table } from '@/components/table'
import { Header, Wrapper } from './style'
import { Detail } from './components/detail'
import { type SyntheticEvent } from 'react'
import TabContext from '@mui/lab/TabContext'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { Pagination } from '@/components/pagination'
import { SelectBranch } from './components/select-branch'
import { InputSearch } from '@/components/inputs/input-search'
import { RESERVATION_STATUS_TABS } from '@/constants/reservation'

const Page = () => {
  const { t } = useTranslation()
  const {
    data,
    page,
    limit,
    stats,
    status,
    branch,
    columns,
    branches,
    detailRef,
    isLoading,
    isFetching,
    handlePage,
    handleSort,
    searchValue,
    handleLimit,
    handleSearch,
    handleFilter,
    handleRowClick,
  } = usePage()

  const onChangeTab = (_: SyntheticEvent, tab: string) => {
    handleFilter('status')(tab)
  }

  return (
    <Stack pt='10px' height='100%'>
      <Box px='10px'>
        <Typography variant='title30' component='h3'>
          {t('list_of_reservations')}
        </Typography>
      </Box>
      <Stack overflow='hidden' height='100%'>
        <TabContext value={status}>
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={onChangeTab}
            aria-label='reservation-tabs'
            sx={{
              px: '10px',
              '::after': {
                left: '10px',
                width: 'calc(100% - 20px)',
              },
            }}
          >
            {Object.values(RESERVATION_STATUS_TABS).map(({ label, value, color }) => (
              <Tab
                key={value}
                value={value}
                label={
                  <Stack gap='5px' direction='row' alignItems='center'>
                    {t(label)}{' '}
                    {value !== 'ALL' && color && stats?.data[value] !== undefined && (
                      <Stack
                        height='22px'
                        direction='row'
                        component='span'
                        alignItems='center'
                        sx={theme => ({
                          p: '0 6px',
                          borderRadius: '20px',
                          backgroundColor: theme.palette.allColors[color],
                        })}
                      >
                        <Typography
                          component='p'
                          minWidth='13px'
                          variant='inherit'
                          color={theme => theme.palette.allColors.WHITE}
                        >
                          {stats?.data[value]}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                }
              />
            ))}
          </TabList>
          <Stack pt='10px' height='100%' flexGrow={1} overflow='hidden'>
            <Box px='10px'>
              <Header>
                <InputSearch
                  size='small'
                  value={searchValue}
                  onChange={handleSearch}
                  sx={{ maxWidth: { md: '650px' } }}
                  placeholder='search_reservation_placeholder'
                />
                {branches.length > 1 && (
                  <SelectBranch
                    value={branch}
                    options={branches}
                    onChange={handleFilter('branch')}
                  />
                )}
              </Header>
            </Box>
            <Wrapper>
              <Table
                enableSorting
                isLoading={isLoading}
                isFetching={isFetching}
                onRowClick={handleRowClick}
                emptyTitle='no_reservations'
                onSortingChange={handleSort}
                options={{
                  columns,
                  data: data.data.results,
                }}
              />
              <Pagination
                page={page}
                limit={limit}
                disabled={isLoading}
                total={data.data.count}
                onChangePage={handlePage}
                onChangeLimit={handleLimit}
              />
            </Wrapper>
          </Stack>
        </TabContext>
      </Stack>
      <Detail ref={detailRef} />
    </Stack>
  )
}

export default Page
