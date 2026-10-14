import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import { useState, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { type ProductListProps } from '@/types/products'
import { updateProductStatus } from '@/apis/admin/product'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export const Status = ({ id, is_active }: ProductListProps) => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(is_active)
  const { mutate, isLoading } = useMutation({
    mutationFn: updateProductStatus,
    onSuccess: res => {
      setChecked(res.data.is_active)
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleChange = (_: ChangeEvent<HTMLInputElement>) => {
    mutate(id)
  }

  return (
    <Box gap='18px' display='flex' justifyContent='flex-end' maxWidth='100px'>
      {t(checked ? 'active' : 'in_active')}
      <Switch checked={checked} onChange={handleChange} disabled={isLoading} />
    </Box>
  )
}
