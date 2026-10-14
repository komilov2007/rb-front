import { usePage } from './usePage'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { Spinner } from '@/components/spinner'
import { Preview } from '@/components/preview'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton'
import { type ProductListProps } from '@/types/products'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'

const Page = () => {
  const { t } = useTranslation()
  const {
    PATH,
    IS_BOT,
    products,
    links,
    isNewVersion,
    categories,
    websiteInfo,
    telegramInfo,
    handleSubmit,
  } = usePage()

  const URL = isNewVersion
    ? IS_BOT
      ? links?.bot
      : links?.website
    : IS_BOT
      ? telegramInfo.data?.data.url
      : websiteInfo.data?.data.domain

  return (
    <Stack>
      {products.isLoading || categories.isLoading ? (
        <Stack height='30vh'>
          <Spinner center />
        </Stack>
      ) : (
        <>
          <Preview
            category={categories.data?.data.results[0]}
            username={telegramInfo.data?.data.username}
            product={products.data?.data.results[0] as ProductListProps}
            url={URL}
          />
          <Box mt='55px' width='100%' display='flex' justifyContent='center'>
            <Box width='100%' gap='20px' display='flex' maxWidth='630px' justifyContent='flex-end'>
              <Button
                size='large'
                component={Link}
                variant='text-gray'
                startIcon={<IconArrowLeft />}
                to={`${PATH}/${ROUTER.CREATE_DELIVERY}`}
              >
                {t('back')}
              </Button>
              <LoadingButton
                fullWidth
                size='large'
                variant='contained'
                onClick={handleSubmit}
                sx={{ maxWidth: '190px' }}
              >
                {t('next')}
              </LoadingButton>
            </Box>
          </Box>
        </>
      )}
    </Stack>
  )
}

export default Page
