import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { Card, Cards } from './style'
import Stack from '@mui/material/Stack'
import { Image } from '@/components/image'
import { Delete } from './components/delete'
import { useTranslation } from 'react-i18next'
import { FormBanner } from './components/form/form'
import { ReactComponent as IconEmpty } from '@/assets/icons/empty.svg'
import { Spinner } from '@/components/spinner'
import { getBanners } from '@/apis/admin/banner'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

const Page = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryFn: getBanners,
    queryKey: [REACT_QUERY_KEYS.BANNER_LIST],
  })
  const { can_edit, can_delete } = useProfileStore(state => {
    return {
      can_edit: state.getPermission('banner', 'can_edit'),
      can_delete: state.getPermission('banner', 'can_delete'),
    }
  })

  return (
    <Stack p='20px' height='100%' overflow='auto'>
      {isLoading ? (
        <Spinner center />
      ) : data?.data.length === 0 ? (
        <Stack p='20px' height='100%'>
          <Box display='flex' height='100%' width='100%' flexGrow={1} alignItems='center'>
            <Stack alignItems='center' width='100%'>
              <Stack mb='68px'>
                <IconEmpty />
              </Stack>
              <Typography align='center' width={'60%'} mb='27px' variant='title30' fontWeight='700'>
                {t('you_have_not_added_a_banner_yet')}
              </Typography>
              {can_edit && <FormBanner count={data?.data?.length} variant='create' />}
            </Stack>
          </Box>
        </Stack>
      ) : (
        <>
          <Stack mb='16px' direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant='title30' component='h3'>
              {t('banners')}
            </Typography>
            {can_edit && <FormBanner count={data?.data?.length} variant='add' />}
          </Stack>
          <Cards>
            {data?.data.map(banner => (
              <Card key={banner.id}>
                <Image
                  radius='20px'
                  alt={banner.created_at}
                  sx={{ height: '225px' }}
                  src={banner.mobile_photo}
                />
                <Stack pt='17px' direction='row' alignItems='center' justifyContent='space-between'>
                  <Stack gap='2px' justifyContent='center'>
                    <Typography variant='text'>{t('last_updated')}</Typography>
                    <Typography variant='title40'>
                      {dayjs(banner.created_at).format('DD.MM.YYYY - HH:mm')}
                    </Typography>
                  </Stack>
                  <Stack gap='8px' direction='row' alignItems='center'>
                    {can_delete && <Delete id={banner.id} />}
                    {can_edit && <FormBanner {...banner} variant='edit' />}
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Cards>
        </>
      )}
    </Stack>
  )
}

export default Page
