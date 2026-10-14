import dayjs from 'dayjs'
import { getUser } from '@/utils/user'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import { Card, Platforms } from './style'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { getShopPlatforms } from '@/apis/admin/shop'
import { getTitle } from '@/constants/domain-themes'
import { DeleteShop } from '@/components/deletes/shop'
import { DeleteWebsite } from '@/components/deletes/website'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { AdvertisingFeed } from '@/components/modals/advertising-feed'
import { DeleteTelegramBot } from '@/components/deletes/telegram-bot'
import { ReactComponent as IconGlobeOutline } from '@/assets/icons/globe-outline.svg'
import { ReactComponent as IconCheckCircle } from '@/assets/icons/check-circle-green.svg'
import { ReactComponent as IconTelegramOutline } from '@/assets/icons/telegram-outline.svg'
import { useProfileStore } from '@/store/profile'

const Page = () => {
  const user = getUser()
  const { t } = useTranslation()
  const isNewVersion = useProfileStore(state => state.me?.is_new_version)

  const SUB_DOMAIN = isNewVersion ? getTitle().new_sub_domain : getTitle().sub_domain
  const { data, isLoading } = useQuery({
    queryFn: async () => await getShopPlatforms({ row: true }),
    queryKey: [REACT_QUERY_KEYS.SHOP_LIST_ROW],
  })

  return (
    <Stack p='24px 32px'>
      <Typography mb='12px' variant='title10' component='h3'>
        {t('platforms')}
      </Typography>
      <Stack gap='20px' component='ul'>
        {isLoading
          ? Array.from({ length: 3 }, (_, i: number) => (
              <Stack key={i} component='li'>
                <Skeleton variant='rounded' height='232px' />
              </Stack>
            ))
          : data?.data.map(({ bot, website, ...p }) => (
              <Card key={p.id}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Stack gap='8px' direction='row' alignItems='center'>
                    <Typography variant='title70' fontWeight='400' component='h2'>
                      {p.name}
                    </Typography>
                    {user.shop === p.id && (
                      <Stack justifyContent='center'>
                        <IconCheckCircle />
                      </Stack>
                    )}
                  </Stack>
                  <Stack gap='10px' direction='row' alignItems='center'>
                    {isNewVersion && <AdvertisingFeed shop={p.id} />}
                    <DeleteShop id={p.id} isCurrent={user?.shop === p?.id} />
                  </Stack>
                </Stack>
                <Platforms>
                  {bot && (
                    <Stack
                      gap='30px'
                      component='li'
                      direction='row'
                      maxWidth='480px'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Stack gap={{ xs: '4px', md: '8px' }} direction='row' alignItems='center'>
                        <Stack justifyContent='center'>
                          <IconTelegramOutline />
                        </Stack>
                        <Stack gap='1px'>
                          <Typography
                            component='h3'
                            variant='text120'
                            color={theme => theme.palette.allColors.BLACK30}
                          >
                            {bot.firstname}
                          </Typography>
                          <Typography variant='text60' component='h4'>
                            {dayjs(bot.created_at).format('hh:mm; DD.MM.YYYY')}
                          </Typography>
                        </Stack>
                      </Stack>
                      <DeleteTelegramBot variant='profile' shop={p.id} />
                    </Stack>
                  )}
                  {website && (
                    <Stack
                      gap='30px'
                      component='li'
                      direction='row'
                      maxWidth='480px'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Stack gap='8px' direction='row' alignItems='center'>
                        <Stack justifyContent='center'>
                          <IconGlobeOutline />
                        </Stack>
                        <Typography
                          target='_blank'
                          component={Link}
                          variant='text120'
                          color={theme => theme.palette.allColors.BLACK30}
                          to={`https://${website.is_sub ? `${website.domain}${SUB_DOMAIN}` : website.domain}`}
                        >
                          {website.domain}
                          {website.is_sub && SUB_DOMAIN}
                        </Typography>
                      </Stack>
                      <DeleteWebsite variant='profile' shop={p.id} />
                    </Stack>
                  )}
                </Platforms>
              </Card>
            ))}
      </Stack>
    </Stack>
  )
}

export default Page
