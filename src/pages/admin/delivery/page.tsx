import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { PickUp } from '@/components/forms/pick-up'
import { FormFargo } from '@/components/forms/fargo'
import { Delivery } from '@/components/forms/delivery'
import { FormUzpost } from '@/components/forms/uzpost'

const Page = () => {
  const { t } = useTranslation()

  return (
    <Stack p='20px'>
      <Stack
        gap='32px'
        width='100%'
        flexWrap='wrap'
        component='ul'
        className='scrollPageLayout'
        direction={{ xs: 'column', md: 'row' }}
      >
        <Stack component='li' alignItems='center'>
          <PickUp />
        </Stack>
        <Stack component='li' alignItems='center'>
          <Delivery />
        </Stack>
      </Stack>
      <Stack my='20px'>
        <Divider />
      </Stack>
      <Stack gap='20px'>
        <Typography variant='title10' component='h2'>
          {t('external_delivery_services')}
        </Typography>
        <Stack
          gap='32px'
          width='100%'
          flexWrap='wrap'
          component='ul'
          className='scrollPageLayout'
          direction={{ xs: 'column', md: 'row' }}
        >
          <Stack component='li' alignItems='center'>
            <FormFargo variant='delivery' />
          </Stack>
          <Stack component='li' alignItems='center'>
            <FormUzpost variant='delivery' />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Page
