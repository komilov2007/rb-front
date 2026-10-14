import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Alert } from '@/components/alert'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { ReactComponent as IconDoc } from '@/assets/icons/doc.svg'

export const InstructionWebsite = () => {
  const { t } = useTranslation()
  const { copy } = useCopyToClipboard()

  return (
    <Alert>
      <Typography variant='title40' lineHeight='21px' component='h3'>
        {t('connect_domain_to_ip')}
      </Typography>
      <Stack
        gap='4px'
        direction='row'
        alignItems='center'
        onClick={copy('209.38.61.107')}
        sx={{ cursor: 'pointer' }}
      >
        <Typography>{t('ip_address')}:</Typography>
        <Typography
          fontWeight='500'
          variant='text260'
          color={theme => theme.palette.allColors.PURPLE}
        >
          209.38.61.107
        </Typography>
        <Stack justifyContent='center'>
          <IconDoc />
        </Stack>
      </Stack>
      <Box gap='5px' display='flex' component='ul' flexDirection='column'>
        <Typography variant='text260' component='li'>
          1. {t('go_to_domain_provider')}.
        </Typography>
        <Typography variant='text260' component='li'>
          2. {t('find_dns_section')}.
        </Typography>
        <Typography variant='text260' component='li'>
          3. {t('add_or_edit_a_records')}:
        </Typography>
        <Typography variant='text260' component='li'>
          Type: A Name: @ Value: 209.38.61.107
        </Typography>
        <Typography variant='text260' component='li'>
          4. {t('save_changes')}.
        </Typography>
        <Typography variant='text260' component='li'>
          5. {t('dns_propagation_time')}.
        </Typography>
      </Box>
    </Alert>
  )
}
