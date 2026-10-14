import { getUser } from '@/utils/user'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import { ReactComponent as Icon404Dark } from '@/assets/icons/404-dark.svg'
import { ReactComponent as Icon404Light } from '@/assets/icons/404-light.svg'

const Page = () => {
  const user = getUser()
  const { t } = useTranslation()
  const { mode } = useColorScheme()

  return (
    <Stack p='20px' flexGrow={1} overflow='auto' alignItems='center'>
      <Stack
        mb='60px'
        sx={{
          svg: {
            width: '100%',
            height: '100%',
          },
        }}
      >
        {mode === 'dark' ? <Icon404Dark /> : <Icon404Light />}
      </Stack>
      <Typography variant='title30' component='h2'>
        {t('page_not_found')}
      </Typography>
      <Typography variant='text30' align='center' p='12px 0 30px' maxWidth='418px'>
        {t('oops_something_went_wrong_we_couldnt_find_the_page_you_are_looking_for')}
      </Typography>
      <Button
        component={Link}
        size='mediumSmall'
        variant='contained'
        to={user.access ? ROUTER.ADMIN : ROUTER.AUTH}
      >
        {t('back_to_home')}
      </Button>
    </Stack>
  )
}

export default Page
