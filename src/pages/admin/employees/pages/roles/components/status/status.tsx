import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import { type RoleListProps } from '@/types/role'
import { useState, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateRoleStatus } from '@/apis/admin/role'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export const Status = ({ id, is_active, is_admin }: RoleListProps) => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(is_active)
  const { mutate, isLoading } = useMutation({
    mutationFn: updateRoleStatus,
    onSuccess: res => {
      toast.success(t('the_action_has_successfully_been_completed'))
      setChecked(res.data.is_active)
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
      <Stack
        gap='18px'
        direction='row'
        minWidth='120px'
        htmlFor={`${id}`}
        component='label'
        width='fit-content'
        alignItems='center'
        sx={{ cursor: 'pointer' }}
      >
        {t(checked ? 'active' : 'in_active')}
        <Switch
          id={`${id}`}
          checked={checked}
          onChange={handleChange}
          disabled={is_admin || isLoading}
        />
      </Stack>
    </Tooltip>
  )
}
