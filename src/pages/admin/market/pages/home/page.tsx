import Stack from '@mui/material/Stack'
import { Cards, Header } from './style'
import { Card } from './components/card'
import Skeleton from '@mui/material/Skeleton'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@/hooks/useDebounce'
import Typography from '@mui/material/Typography'
import { useOutletContext } from 'react-router-dom'
import { HOSTNAME } from '@/constants/domain-themes'
import { getAppList } from '@/apis/admin/robo-market'
import { InputSearch } from '@/components/inputs/input-search'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'

const Page = () => {
  const marketId = useOutletContext()
  const isAll = marketId === 'all'
  const [searchValue, setSearchValue] = useSearchParamsState('search', '')
  const search = useDebounce(searchValue)
  const { data, isLoading, isFetching } = useQuery({
    enabled: !!marketId,
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.ROBO_MARKET_APP_LIST, search, marketId],
    queryFn: async () => await getAppList(marketId, { search }),
  })

  const handleSearch = (e: string) => {
    setSearchValue(e)
  }

  return (
    <Stack flexGrow={1} overflow='auto'>
      <Header>
        <InputSearch
          size='small'
          value={searchValue}
          onChange={handleSearch}
          sx={{ maxWidth: { xs: '100%', md: '350px' } }}
        />
      </Header>
      <Stack p={{ xs: '0 20px 20px', md: '0 20px 20px' }} m={{ xs: '0', md: '0 0 50px' }}>
        <Cards sx={{ flexDirection: isLoading || isFetching ? 'row' : isAll ? 'column' : 'row' }}>
          {isLoading || isFetching
            ? Array.from({ length: 6 }, (_, i) => (
                <Skeleton
                  key={i}
                  height='137px'
                  variant='rounded'
                  animation='pulse'
                  sx={{
                    width: { xs: '100%', md: '273px' },
                  }}
                />
              ))
            : data?.data
                .filter(app => {
                  if (HOSTNAME.includes('bitomarket.uz') || HOSTNAME.includes('bito.market')) {
                    if (
                      app?.name === 'Billz' ||
                      app?.name === 'Smartup' ||
                      app.name === 'Dizgo' ||
                      app.name === 'ERA' ||
                      app.name === 'ROBO_POCHTA'
                    ) {
                      return false
                    }
                    return true
                  }
                  return true
                })
                .map(({ id, apps, name, ...props }) =>
                  isAll ? (
                    <Stack key={id}>
                      <Typography mb='15px' variant='title30'>
                        {name}
                      </Typography>
                      <Cards>
                        {apps
                          .filter(app => {
                            const HOSTNAME = window.location.hostname
                            if (
                              HOSTNAME.includes('bitomarket.uz') ||
                              HOSTNAME.includes('bito.market')
                            ) {
                              if (
                                app.name === 'Billz' ||
                                app.name === 'Smartup' ||
                                app.name === 'Dizgo' ||
                                app.name === 'ERA' ||
                                app.name === 'ROBO_POCHTA'
                              ) {
                                return false
                              }
                              return true
                            }
                            return true
                          })
                          .map(app => (
                            <Card key={app.id} {...app} />
                          ))}
                      </Cards>
                    </Stack>
                  ) : (
                    <Card key={id} id={id} name={name} {...props} />
                  ),
                )}
        </Cards>
      </Stack>
    </Stack>
  )
}

export default Page
