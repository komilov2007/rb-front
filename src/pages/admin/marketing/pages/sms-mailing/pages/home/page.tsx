import { Header } from './style'
import Box from '@mui/material/Box'
import { usePage } from './usePage'
import Stack from '@mui/material/Stack'
import { Empty } from '@/components/empty'
import { CardSms } from './components/card'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { InputSearch } from '@/components/inputs/input-search'
import { FormSmsMailing } from '@/components/forms/sms-mailing'
import { SelectSmsMailing } from '@/components/selects/select-sms-mailing'

const Page = () => {
  const { t } = useTranslation()
  const { data, status, search, setStatus, isLoading, setSearch } = usePage()

  return (
    <Stack width='100%' height='100%'>
      <Box p='20px 20px 0'>
        <Typography variant='title30' component='h3'>
          {t('sms_mailing')}{' '}
          <Typography
            variant='text'
            component='span'
            color={theme => theme.palette.allColors.PURPLE10}
          >
            {data.data?.length} {t('mailing_count')}
          </Typography>
        </Typography>
        <Header>
          <InputSearch
            size='small'
            value={search}
            onChange={setSearch}
            sx={{ maxWidth: '350px' }}
            placeholder='search_by_mailing_name'
          />
          <Stack gap='10px' direction='row' alignItems='center'>
            <SelectSmsMailing value={status} onChange={setStatus} />
            <FormSmsMailing />
          </Stack>
        </Header>
        <Stack
          gap='15px'
          width='100%'
          component='ul'
          display='grid'
          gridTemplateColumns='repeat(3,calc((100% / 3) - 10px))'
          sx={{
            gridTemplateColumns: {
              xs: '100%',
              md: 'repeat(2,calc((100% / 2) - 10px))',
              lg: 'repeat(2,calc((100% / 2) - 10px))',
              xl: 'repeat(3,calc((100% / 3) - 10px))',
            },
          }}
        >
          {isLoading
            ? Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} width='100%' height='250px' variant='rounded' />
              ))
            : data.data
                .filter(sms => (status === 'all' ? true : sms.status === status))
                .filter(sms =>
                  search.length > 0
                    ? sms.template_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                    : true,
                )
                .map(sms => <CardSms key={sms.id} {...sms} />)}
        </Stack>
        {!isLoading && data.data?.length === 0 && (
          <Stack height='100%' flexGrow={1}>
            <Empty title='No rassilka' />
          </Stack>
        )}
      </Box>
    </Stack>
  )
}

export default Page
