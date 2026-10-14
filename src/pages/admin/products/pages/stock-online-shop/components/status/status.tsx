import { useState } from 'react'
import { toast } from 'react-toastify'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { useProfileStore } from '@/store/profile'
import { useMutation } from '@tanstack/react-query'
import { STOCK_STATUS_OPTIONS } from '@/constants/stock'
import { updateProductStockOnlineShop } from '@/apis/admin/stock'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import type { StatusProps, StockStatusProps, StockOnlineShopProps } from '@/types/stock'

interface StatusSelectProps extends StockOnlineShopProps {
  handleUpdate: (values: StockStatusProps) => void
}

export const StatusSelect = ({
  id,
  body_price,
  handleUpdate,
  storage_status,
}: StatusSelectProps) => {
  const { t } = useTranslation()
  const [selectValue, setSelectValue] = useState<StatusProps | null>(storage_status)
  const can_edit = useProfileStore(state => state.getPermission('stock', 'can_edit'))

  const { mutate } = useMutation({
    mutationFn: async () =>
      await updateProductStockOnlineShop({ status: selectValue, amount: 0, body_price }, id),
    onSuccess: () => {
      handleUpdate({ id, status: selectValue as StatusProps, amount: 0, body_price })
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const handleChange = (e: SelectChangeEvent<StatusProps | null>) => {
    mutate()
    setSelectValue(e.target.value as StatusProps)
  }

  return can_edit ? (
    <Select
      value={selectValue}
      onChange={handleChange}
      sx={{
        height: '35px',
        minWidth: '150px',
        borderRadius: '6px',
      }}
    >
      {STOCK_STATUS_OPTIONS.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {t(option.label)}
        </MenuItem>
      ))}
    </Select>
  ) : (
    t(STOCK_STATUS_OPTIONS.find(s => s.value === selectValue)?.label as string)
  )
}
