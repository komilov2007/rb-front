import { Conatiner } from './style'
import Stack from '@mui/material/Stack'
import { exportIkpu } from '@/apis/admin/ikpu'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import { ReactComponent as IconExcel } from '@/assets/icons/excel.svg'
import { ReactComponent as IconFileUpload } from '@/assets/icons/file-upload.svg'
import { downloadExternal } from '@/utils/native-bridge'

interface ExportIkpuProps {
  variant: 'export' | 'example'
}

export const ExportIkpu = ({ variant }: ExportIkpuProps) => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useMutation({
    mutationFn: exportIkpu,
    onSuccess: res => {
      setTimeout(() => {
        downloadExternal(res.data.file)
      })
    },
  })

  const handleExport = () => {
    mutate()
  }

  return (
    <>
      {variant === 'example' ? (
        <Conatiner>
          <Stack gap='10px' maxWidth='322px'>
            <Stack gap='10px' direction='row'>
              <Stack justifyContent='center'>
                <IconExcel />
              </Stack>
              <Typography variant='title50' lineHeight='normal'>
                {t('table_example')}
              </Typography>
            </Stack>
            <Typography variant='text' lineHeight='19px' letterSpacing='0.049px'>
              {t(
                'you_can_download_the_attached_example_and_use_them_as_a_starting_pint_for_your_own_file',
              )}
            </Typography>
          </Stack>
          <LoadingButton
            size='small'
            loading={isLoading}
            onClick={handleExport}
            variant='outlined-white'
            sx={theme => ({
              borderRadius: '6px',
              color: theme.palette.colors['L-BLACK30-D-WHITE20'],
              borderColor: theme.palette.colors['L-GRAY270-D-WHITE40'],
            })}
          >
            {t('download')}
          </LoadingButton>
        </Conatiner>
      ) : (
        <LoadingButton
          variant='outlined'
          loading={isLoading}
          onClick={handleExport}
          startIcon={<IconFileUpload />}
        >
          {t('export')}
        </LoadingButton>
      )}
    </>
  )
}
