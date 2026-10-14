import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { ReactComponent as IconUnderConstruction } from '@/assets/icons/under-construction.svg'

export const UnderConstruction = () => {
  const { t } = useTranslation()

  return (
    <Stack flexGrow={1} alignItems='center' justifyContent='center'>
      <Stack sx={{ svg: { width: '90%', height: '90%' } }}>
        <IconUnderConstruction />
      </Stack>
      <Typography m='40px 0 7px' variant='title70' fontSize='20px'>
        {t('coming_soon')}
      </Typography>
      <Typography align='center' variant='text30'>
        {t('page_is_under_construction')}
      </Typography>
    </Stack>
  )
}
