import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Switch from '@mui/material/Switch'
import { useTranslation } from 'react-i18next'
import type { CourierProps } from '@/types/role'
import { updateCourier } from '@/apis/admin/role'
import { useState, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'

export const Status = ({ id, phone, is_active, firstname }: CourierProps) => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(is_active)
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => await updateCourier({ phone, firstname, is_active: !is_active }, id),
    onSuccess: res => {
      setChecked(res.data.is_active)
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleChange = (_: ChangeEvent<HTMLInputElement>) => {
    mutate()
  }

  return (
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
      <Switch id={`${id}`} checked={checked} onChange={handleChange} disabled={isLoading} />
    </Box>
  )
}
