import Stack from '@mui/material/Stack'
import { Copy } from '@/components/copy'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { getYandex } from '@/apis/admin/yandex'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const FormYandex = () => {
  const { t } = useTranslation()
  const detail = useQuery({
    queryFn: getYandex,
    queryKey: [REACT_QUERY_KEYS.YANDEX_DETAIL],
  })

  return (
    <Stack p='20px' flexGrow={1}>
      {detail.isLoading ? (
        <Spinner center />
      ) : (
        <Stack gap='10px' component='ul'>
          {Object.entries(detail.data?.data ?? {}).map(([key, value]) => (
            <Stack component='li' key={key}>
              <Typography variant='title20'>{t(key)}</Typography>
              <Stack gap='10px' direction='row' alignItems='center'>
                <Typography noWrap variant='text'>
                  {value as string}
                </Typography>
                <Copy text={value as string} />
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
