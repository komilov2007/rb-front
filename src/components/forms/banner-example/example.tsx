import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { ReactComponent as IconFhd } from '@/assets/icons/fhd.svg'
import ImageExampleCategory from '@/assets/images/example-category.webp'
import ImageExampleCategory1 from '@/assets/images/example-category-1.webp'
import { ReactComponent as IconHouseCam } from '@/assets/icons/house-cam.svg'

export const Example = () => {
  const { t } = useTranslation()

  return (
    <Stack gap='16px'>
      <Stack>
        <Typography variant='title120' fontWeight='600'>
          {t('tips_for_uploading_a_banner')}
        </Typography>
        <Typography variant='text'>
          {t(
            'banner_is_eye_catching_advertising_it_draws_user_attention_and_encourages_clicks_follow_these_tips',
          )}
        </Typography>
      </Stack>
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
          <Stack gap='10px' direction='row'>
            <img src={ImageExampleCategory} alt='Example' width='62px' height='82px' />
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>{t('use_short_and_clear_text')}</Typography>
              <Typography variant='title180'>
                {t(
                  'simple_and_effective_texts_like_buy_now_25_off_or_new_collection_can_be_used_on_banners',
                )}
              </Typography>
            </Stack>
          </Stack>
          <Stack gap='10px' direction='row'>
            <img src={ImageExampleCategory1} alt='Example' width='62px' height='82px' />
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>
                {t('avoid_too_much_text_or_unclear_images')}
              </Typography>
              <Typography variant='title180'>
                {t('banner_should_be_short_understandable_within_1_second')}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack gap='10px'>
          <Stack gap='10px' direction='row'>
            <div>
              <IconHouseCam />
            </div>
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>{t('choose_clear_image')}</Typography>
              <Typography variant='title180'>{t('banner_should_look_professional')}</Typography>
              <Stack>
                <Typography variant='title180'>{t('mobile_banner_size')}</Typography>
                <Typography variant='title180'>{t('desktop_banner_size')}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack gap='10px' direction='row'>
            <div>
              <IconFhd />
            </div>
            <Stack gap='4px' justifyContent='center'>
              <Typography variant='title170'>{t('for_clickable_banners')}</Typography>
              <Typography variant='title180'>
                {t('the_call_to_action_cta_should_be_clear')}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
