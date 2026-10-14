import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { useState, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { InputPrice } from '@/components/inputs/input-price'
import { updateProductStockOnlineShop } from '@/apis/admin/stock'
import type { StockStatusProps, StockInputProps, StockOnlineShopProps } from '@/types/stock'

interface InputStockProps extends StockOnlineShopProps {
  type: StockInputProps
  handleUpdate: (values: StockStatusProps, type: StockInputProps) => void
}

export const InputStock = ({
  id,
  type,
  handleUpdate,
  storage_status,
  ...rest
}: InputStockProps) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState<number | undefined | null>(rest[type])
  const can_edit = useProfileStore(state => state.getPermission('stock', 'can_edit'))
  const { mutate } = useMutation({
    mutationFn: async (values: StockStatusProps) => {
      return await updateProductStockOnlineShop(values, id)
    },
    onSuccess: (_, context: StockStatusProps) => {
      handleUpdate({ ...context, id }, type)
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onBlur = () => {
    if (inputValue !== undefined && inputValue !== null) {
      const values =
        type === 'weight'
          ? { [type]: inputValue, status: storage_status, amount: rest.amount }
          : type === 'amount'
            ? { [type]: inputValue, status: storage_status, body_price: rest.body_price }
            : { [type]: inputValue, status: storage_status, amount: rest.amount }
      mutate(values as StockStatusProps)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value)
    if (type === 'body_price') {
      if (value < 0) value = 0
    }
    setInputValue(value)
  }

  const disabled = storage_status !== 'LIMITED' && type !== 'body_price' && type === 'amount'

  if (type === 'amount') {
    if (storage_status === 'NOT_AVAILABLE') {
      return <Typography variant='inherit'>0</Typography>
    }
    if (storage_status === 'UNLIMITED') {
      return (
        <Typography variant='inherit' fontWeight={600}>
          &infin;
        </Typography>
      )
    }
  }

  return can_edit ? (
    <InputPrice
      fullWidth
      onBlur={onBlur}
      variant='outlined'
      disabled={disabled}
      size='small'
      value={inputValue}
      onChange={handleChange}
      InputProps={{
        readOnly: disabled,
      }}
      sx={{
        height: '35px',
        maxWidth: '120px',
        minWidth: '120px',
        '.MuiInputBase-root': {
          borderRadius: '6px',
        },
        input: {
          paddingLeft: '14px !important',
          fontSize: '13px',
        },
      }}
    />
  ) : (
    inputValue
  )
}
