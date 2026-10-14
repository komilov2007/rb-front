import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { HOSTNAME } from '@/constants/domain-themes'

export const InstructionVideo = () => {
  const { t } = useTranslation()
  return (
    <Stack gap='6px'>
      <Typography variant='text' lineHeight='20px'>
        {t('watch_the_tutorial_video')}
      </Typography>
      <iframe
        width='207'
        height='104'
        frameBorder='0'
        allowFullScreen
        title='YouTube video player'
        src={
          HOSTNAME.includes('bitomarket.uz') || HOSTNAME.includes('bito.market')
            ? 'https://www.youtube.com/embed/xq9gVlWOwYk?si=qi9kIjaP5adLc92z'
            : t('telegram_instruction_video')
        }
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        style={{
          borderRadius: '8px',
        }}
      />
    </Stack>
  )
}
