import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'

export const Example = () => {
  const { t } = useTranslation()

  return (
    <Stack gap='16px'>
      <Typography variant='title120' fontWeight='600'>
        {t('recommendations_for_uploading_category_image')}
      </Typography>
      <Stack
        gap='10px'
        sx={theme => ({
          flexDirection: 'row',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        })}
      >
        <Stack gap='10px'>
          <Typography variant='title40'>✅ {t('recommended')}:</Typography>
          <Stack gap='10px' direction='row'>
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>{t('use_high_quality_image')}</Typography>
              <Typography variant='title180'>- {t('min_size_1x1')}</Typography>
            </Stack>
          </Stack>
          <Stack gap='10px' direction='row'>
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>{t('choose_simple_relevant_image')}</Typography>
              <Typography variant='title180'>- {t('match_category_content')}</Typography>
            </Stack>
          </Stack>
          <Stack gap='10px' direction='row'>
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>{t('same_style_images')}</Typography>
              <Typography variant='title180'>- {t('consistent_background_lighting')}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack gap='10px'>
          <Typography variant='title40'>🚫 {t('not_recommended')}:</Typography>
          <Stack gap='10px' direction='row'>
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>{t('no_text_in_images')}</Typography>
              <Typography variant='title180'>- {t('no_category_name_on_image')}</Typography>
            </Stack>
          </Stack>
          <Stack gap='10px' direction='row'>
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>{t('no_blurry_or_stretched')}</Typography>
              <Typography variant='title180'>- {t('no_pixelated_or_low_quality')}</Typography>
            </Stack>
          </Stack>
          <Stack gap='10px' direction='row'>
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>{t('no_gif_or_animated')}</Typography>
              <Typography variant='title180'>- {t('only_jpg_png_static')}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
