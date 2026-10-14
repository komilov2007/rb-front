import { useState } from 'react'
import { toast } from 'react-toastify'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { STOCK_STATUS_OPTIONS } from '@/constants/stock'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import type { StockProps, StatusProps, StockStatusProps } from '@/types/stock'
import { updateParameter, updateAdditionalParameter, updateProductStock } from '@/apis/admin/stock'
import { useProfileStore } from '@/store/profile'

export interface StatusSelectProps extends StockProps {
  branch_id: string
  handleUpdate: (values: StockStatusProps) => void
}

export const StatusSelect = ({
  id,
  status,
  branch_id,
  parameters,
  is_parameter,
  handleUpdate,
}: StatusSelectProps) => {
  const { t } = useTranslation()
  const [selectValue, setSelectValue] = useState<StatusProps | null>(status)
  const can_edit = useProfileStore(state => state.getPermission('stock', 'can_edit'))

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (parameters?.length === 0) {
        return await updateProductStock({ status: selectValue, branch_id }, id)
      }
      if (is_parameter) {
        return await updateParameter({ status: selectValue, branch_id }, id)
      }
      return await updateAdditionalParameter({ status: selectValue, branch_id }, id)
    },
    onSuccess: res => {
      handleUpdate(res.data)
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
