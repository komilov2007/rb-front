import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { ReactComponent as IconTelegramSolid } from '@/assets/icons/telegram-solid.svg'
import { Link } from 'react-router-dom'
import { getTitle } from '@/constants/domain-themes'

interface WriteToAdminProps {
  title: string
}

export const WriteToAdmin = ({ title }: WriteToAdminProps) => {
  const { t } = useTranslation()

  return (
    <Stack
      gap='24px'
      sx={theme => ({
        p: '16px',
        width: '100%',
        borderRadius: '8px',
        background: theme.palette.allColors.WHITE,
        boxShadow:
          '0px 12px 12px -6px rgba(3, 45, 96, 0.04), 0px 6px 6px -3px rgba(3, 45, 96, 0.04), 0px 3px 3px -1.5px rgba(3, 45, 96, 0.04), 0px 1px 1px -0.5px rgba(1, 24, 51, 0.08), 0px 0px 0px 1px rgba(3, 45, 96, 0.04)',
      })}
    >
      <Stack gap='5px'>
        <Typography variant='title160'>{t(title)}</Typography>
        <Typography variant='text50' sx={theme => ({ color: theme.palette.allColors.BLACK190 })}>
          {t(
            'dont_worry_well_help_if_you_have_any_questions_or_something_isnt_working_contact_us_via_telegram',
          )}
        </Typography>
      </Stack>
      <Button
        component={Link}
        to={`https://t.me/${getTitle().telegram}`}
        target='_blank'
        size='small'
        startIcon={<IconTelegramSolid />}
        sx={theme => ({ stop: { stopColor: theme.palette.allColors.WHITE } })}
      >
        {t('write_to_admin')}
      </Button>
    </Stack>
  )
}
