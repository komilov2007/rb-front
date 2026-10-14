import { toast } from 'react-toastify'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import { useMutation } from '@tanstack/react-query'
import { getEmployeeReport } from '@/apis/admin/role'
import { type EmployeeListProps } from '@/types/role'
import { ReactComponent as IconDownloadSolid } from '@/assets/icons/download-solid.svg'

export const Report = (props: EmployeeListProps) => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useMutation({
    mutationFn: getEmployeeReport,
    onSuccess: data => {
      const url = window.URL.createObjectURL(data.data)
      const link = document.createElement('a')
      link.href = url
      link.download = `${props.user.firstname}-report.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },
    onError: () => {
      toast.error(t('error_occurred'))
    },
  })

  const handleDownload = () => {
    mutate(props.id)
  }

  return (
    <Tooltip placement='top' title={t('download_report')}>
      <IconButton radius='8px' onClick={handleDownload} disabled={isLoading}>
        <IconDownloadSolid />
      </IconButton>
    </Tooltip>
  )
}
