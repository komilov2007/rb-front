import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'
import { useState, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { type EmployeeListProps } from '@/types/role'
import { updateEmployeeStatus } from '@/apis/admin/role'

export const Status = ({ id, is_active, is_admin }: EmployeeListProps) => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(is_active)
  const { mutate, isLoading } = useMutation({
    mutationFn: updateEmployeeStatus,
    onSuccess: res => {
      setChecked(res.data.is_active)
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleChange = (_: ChangeEvent<HTMLInputElement>) => {
    mutate(id)
  }

  return (
    <Tooltip
      placement='top'
      disableHoverListener={!is_admin}
      title={t('you_can_not_inactive_main_admin')}
    >
      <Box
        gap='18px'
        display='flex'
        minWidth='120px'
        htmlFor={`${id}`}
        component='label'
        width='fit-content'
        sx={{ cursor: 'pointer' }}
      >
        {t(checked ? 'active' : 'in_active')}
        <Switch
          id={`${id}`}
          checked={checked}
          onChange={handleChange}
          disabled={is_admin || isLoading}
        />
      </Box>
    </Tooltip>
  )
}
