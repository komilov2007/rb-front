import Box from '@mui/material/Box'
import { Alert } from '@/components/alert'
import Typography from '@mui/material/Typography'
import { Trans, useTranslation } from 'react-i18next'

const BOT_FATHER = 'https://t.me/BotFather'

export const InstructionTelegram = () => {
  const { t } = useTranslation()

  return (
    <Alert>
      <Typography variant='title40' lineHeight='21px'>
        {t('instruction')}
      </Typography>
      <Box gap='5px' display='flex' component='ul' flexDirection='column'>
        <Typography variant='text20' component='li'>
          1.{' '}
          <Trans
            i18nKey='connect_with_the_bot_father_bot_on_telegram'
            components={{
              linkTag: (
                <Typography
                  component='a'
                  target='_blank'
                  variant='inherit'
                  href={BOT_FATHER}
                  sx={{ textDecorationLine: 'underline' }}
                  color={theme => theme.palette.allColors.PURPLE}
                />
              ),
            }}
          />
        </Typography>
        <Typography variant='text20' component='li'>
          2.{' '}
          <Trans
            i18nKey='create_a_new_bot_using_the_newbot_command'
            components={{
              linkTag: (
                <Typography
                  component='span'
                  variant='inherit'
                  color={theme => theme.palette.allColors.RED}
                />
              ),
            }}
          />
        </Typography>
        <Typography variant='text20' component='li'>
          3. {t('enter_the_bot_name_and_username')}
        </Typography>
        <Typography variant='text20' component='li'>
          4.{' '}
          <Trans
            i18nKey='in_response_bot_father_sends_you_a_token'
            components={{
              linkTag: (
                <Typography
                  component='a'
                  target='_blank'
                  variant='inherit'
                  href={BOT_FATHER}
                  sx={{ textDecorationLine: 'underline' }}
                  color={theme => theme.palette.allColors.PURPLE}
                />
              ),
            }}
          />
          <Typography ml='15px' variant='inherit' color={theme => theme.palette.allColors.RED}>
            123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
          </Typography>
        </Typography>
        <Typography variant='text20' component='li'>
          5. {t('place_the_token_in_the_space_above')}
        </Typography>
      </Box>
    </Alert>
  )
}
