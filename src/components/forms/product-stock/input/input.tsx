import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useProfileStore } from '@/store/profile'
import { useState, type ChangeEvent } from 'react'
import { updateProductStock } from '@/apis/common'
import { useMutation } from '@tanstack/react-query'
import { InputPrice } from '@/components/inputs/input-price'

type InputStockTypeProps = 'all' | 'product'

interface InputStockProps {
  id?: string
  type: InputStockTypeProps
  handleUpdate?: () => void
}

export const InputStock = ({ id, type, handleUpdate }: InputStockProps) => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState<number | null>(null)
  const can_edit = useProfileStore(state => state.getPermission('stock', 'can_edit'))
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await updateProductStock(
        {
          weight: inputValue,
        },
        type === 'all' ? true : id,
      )
    },
    onSuccess: _ => {
      if (handleUpdate) {
        handleUpdate()
      }
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const onBlur = () => {
    if (inputValue !== undefined && inputValue !== null) {
      mutate()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value))
  }

  return can_edit ? (
    <InputPrice
      fullWidth
      size='small'
      onBlur={onBlur}
      variant='outlined'
      value={inputValue}
      onChange={handleChange}
      placeholder='enter_weight'
      sx={theme => ({
        height: '35px',
        maxWidth: '150px',
        minWidth: '150px',
        '.MuiInputBase-root': {
          borderRadius: '6px',
          background: type === 'all' ? theme.palette.allColors.WHITE : '',
        },
        input: {
          paddingLeft: '14px !important',
          fontSize: '13px',
          '::placeholder': {
            fontSize: '12px !important',
          },
        },
      })}
    />
  ) : (
    inputValue
  )
}
