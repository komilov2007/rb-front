import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { useState, type ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import type { StockProps, StockInputProps, StockStatusProps } from '@/types/stock'
import { updateParameter, updateProductStock, updateAdditionalParameter } from '@/apis/admin/stock'

interface InputStockProps extends StockProps {
  branch_id: string
  type: StockInputProps
  handleUpdate: (values: StockStatusProps, type?: StockInputProps) => void
}

export const InputStock = ({
  id,
  type,
  status,
  branch_id,
  is_parameter,
  handleUpdate,
  ...rest
}: InputStockProps) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState<number | undefined>(rest[type])
  const can_edit = useProfileStore(state => state.getPermission('stock', 'can_edit'))
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (rest.parameters?.length === 0) {
        return await updateProductStock({ [type]: inputValue, branch_id }, id)
      }
      if (is_parameter) {
        return await updateParameter({ [type]: inputValue, branch_id }, id)
      }
      return await updateAdditionalParameter({ [type]: inputValue, branch_id }, id)
    },
    onSuccess: res => {
      handleUpdate(res.data, type)
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onBlur = () => {
    if (inputValue) mutate()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    if (value && type === 'body_price') {
      const min = 0
      const max = Number(rest.price)
      if (value > max) {
        setInputValue(max)
        return
      }
      if (value < min) {
        setInputValue(min)
        return
      }
      setInputValue(value)
    } else {
      setInputValue(value)
    }
  }

  const disabled = status !== 'LIMITED' && type !== 'body_price'

  if (type === 'amount') {
    if (status === 'NOT_AVAILABLE') {
      return <Typography variant='inherit'>0</Typography>
    }
    if (status === 'UNLIMITED') {
      return (
        <Typography variant='inherit' fontWeight={600}>
          &infin;
        </Typography>
      )
    }
  }

  return can_edit ? (
    <TextField
      fullWidth
      type='tel'
      onBlur={onBlur}
      variant='outlined'
      value={inputValue}
      disabled={disabled}
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
        },
      }}
    />
  ) : (
    inputValue
  )
}
