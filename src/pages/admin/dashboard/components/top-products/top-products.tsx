import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import { Trans, useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { getTopProducts } from '@/apis/admin/dashboard'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconEmptySolid } from '@/assets/icons/empty-solid.svg'

interface TopProductsProps {
  params: { from: string; to: string }
}

export const TopProducts = ({ params }: TopProductsProps) => {
  const { t } = useTranslation()
  const { data = { data: [] }, isLoading } = useQuery({
    keepPreviousData: true,
    queryFn: async () => await getTopProducts(params),
    queryKey: [REACT_QUERY_KEYS.DASHBOARD_TOP_PRODUCTS, params, params.from, params.to],
  })

  return isLoading ? (
    <Skeleton width='100%' height='100%' variant='rounded' sx={{ borderRadius: '12px' }} />
  ) : (
    <Stack height='100%' p='14px 18px'>
      <Stack
        gap='5px'
        pb='17px'
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={theme => ({ borderBottom: `1px solid ${theme.palette.allColors.GRAY340}` })}
      >
        <Typography variant='title10' component='h2'>
          {t('top_10_products')}
        </Typography>
      </Stack>
      <Stack height='100%' mt='13px' width='100%' flexGrow={1}>
        {data.data.length === 0 ? (
          <Stack
            gap='12px'
            flexGrow={1}
            minHeight='250px'
            alignItems='center'
            justifyContent='center'
          >
            <Stack alignItems='center'>
              <IconEmptySolid />
            </Stack>
            <Typography align='center' component='h3' fontSize='16px' variant='title10'>
              {t('there_is_no_top_product')}
            </Typography>
          </Stack>
        ) : (
          <Stack
            pr='20px'
            width='100%'
            component='ol'
            display='grid'
            gap='16px 100px'
            gridTemplateColumns='1fr 1fr'
          >
            {data.data.map((p, i: number) => (
              <Stack
                pl='20px'
                key={p.id}
                width='100%'
                direction='row'
                component='li'
                alignItems='center'
                position='relative'
                overflow='hidden'
              >
                <Typography left='0' position='absolute' variant='title20'>
                  {i + 1}.
                </Typography>
                <Avatar
                  src={p.photo}
                  sx={{ m: '0 8px 0 11px', width: '42px', height: '38px', borderRadius: '5px' }}
                />
                <div style={{ width: '100%' }}>
                  <Typography
                    component='h4'
                    variant='text120'
                    color={theme => theme.palette.allColors.BLACK30}
                    sx={{
                      width: '50%',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.name}
                  </Typography>

                  <Typography variant='text60' color={theme => theme.palette.allColors.BLACK30}>
                    <Trans
                      i18nKey='count_sales'
                      values={{ count: p.amount }}
                      components={{
                        linkTag: (
                          <Typography
                            component='span'
                            variant='inherit'
                            color={theme => theme.palette.allColors.GRAY30}
                          />
                        ),
                      }}
                    />
                  </Typography>
                </div>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}
