import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import { ReactComponent as IconEmptyDark } from '@/assets/icons/empty-dark.svg'
import { ReactComponent as IconEmptyLight } from '@/assets/icons/empty-light.svg'

interface EmptyProps {
  title?: string
  text?: string
}

export const Empty = ({ title = 'no_data', text }: EmptyProps) => {
  const { t } = useTranslation()
  const { mode } = useColorScheme()

  return (
    <Stack height='100%' flexGrow={1} alignItems='center' justifyContent='center'>
      <Stack
        alignItems='center'
        justifyContent='center'
        mt={{ xs: '20px', md: '0' }}
        mb={{ xs: '30px', md: '58px' }}
        sx={{ svg: { width: { xs: '50%', md: '100%' }, height: { xs: '50%', md: '100%' } } }}
      >
        {mode === 'dark' ? <IconEmptyDark /> : <IconEmptyLight />}
      </Stack>
      <Typography variant='title30' fontWeight='700'>
        {t(title)}
      </Typography>
      {text && (
        <Typography variant='text' mt='5px' maxWidth='350px' align='center'>
          {t(text)}
        </Typography>
      )}
    </Stack>
  )
}
