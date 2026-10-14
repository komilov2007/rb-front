import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { useFieldArray, useFormContext } from 'react-hook-form'
import type { SchemaTypeProductOnlineShop } from '@/utils/schema'
import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { ReactComponent as IconPlusFill } from '@/assets/icons/plus-fill.svg'
import { ReactComponent as IconRemoveCircleFill } from '@/assets/icons/remove-circle-fill.svg'

export const Tags = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control: form.control,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleAdd = () => {
    append({ tag: value })
    setValue('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (value.trim() !== '') {
        append({ tag: value })
        setValue('')
      }
    }
  }

  const handleDelete = (index: number) => () => {
    remove(index)
  }

  return (
    <Stack gap='12px'>
      <TextField
        fullWidth
        value={value}
        variant='outlined'
        label={t('teglar')}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={t('enter_a_tag')}
        InputProps={{
          endAdornment: (
            <InputAdornment position='start'>
              {value.length > 0 && (
                <IconButton
                  onClick={handleAdd}
                  radius='50%'
                  sx={{
                    mr: '-9px',
                    svg: {
                      width: '24px',
                      height: '24px',
                    },
                  }}
                >
                  <IconPlusFill />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      <Stack component='ul' flexWrap='wrap' gap='8px' direction='row'>
        {fields.map((f, index) => (
          <Chip
            key={f.id}
            component='li'
            label={f.tag}
            variant='filled'
            onDelete={handleDelete(index)}
            deleteIcon={<IconRemoveCircleFill />}
          />
        ))}
      </Stack>
    </Stack>
  )
}
