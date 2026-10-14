import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Switch from '@mui/material/Switch'
import { useTranslation } from 'react-i18next'
import { useState, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateProductOnlineShopStatus } from '@/apis/admin/product'
import { type ProductListOnlineShopProps } from '@/types/product-online-shop'

export const Status = ({ id, is_active }: ProductListOnlineShopProps) => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(is_active)
  const { mutate, isLoading } = useMutation({
    mutationFn: updateProductOnlineShopStatus,
    onSuccess: () => {
      setChecked(!checked)
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
