import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { SMS_STATUS } from '@/constants/sms'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import Typography from '@mui/material/Typography'
import type { Dispatch, SetStateAction } from 'react'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

interface SelectSmsMailingProps {
  value: string | number
  onChange: Dispatch<SetStateAction<string | number>>
}

export const SelectSmsMailing = ({ value, onChange }: SelectSmsMailingProps) => {
  const { t } = useTranslation()
  const modal = useBoolean()

  const handleChange = (e: SelectChangeEvent<string | number>) => {
    onChange(e.target.value)
  }

  const options = [
    {
      label: 'all_status',
      value: 'all',
    },
    ...Object.values(SMS_STATUS),
  ]
  return (
    <Select
      size='small'
      value={value}
      open={modal.value}
      onOpen={modal.setTrue}
      onClose={modal.setFalse}
      onChange={handleChange}
      sx={theme => ({
        minHeight: '42px',
        '.MuiOutlinedInput-input': {
          paddingLeft: '10px !important',
          paddingRight: '60px !important',
        },
        background: theme.palette.allColors.WHITE,
      })}
      IconComponent={p => (
        <Box
          {...p}
          sx={theme => ({
            width: '35px',
            height: '24px',
            display: 'flex',
            right: '11px !important',
            justifyContent: 'flex-end',
            top: 'calc(50% - 12px) !important',
            borderLeft: `1px solid ${theme.palette.allColors.GRAY130}`,
            '&.MuiSelect-iconOpen': {
              borderLeft: 'none',
              justifyContent: 'flex-start',
              borderRight: `1px solid ${theme.palette.allColors.GRAY130}`,
            },
          })}
        >
          <IconDirectionDown />
        </Box>
      )}
    >
      {options.map(status => (
        <MenuItem
          key={status.value}
          value={status.value}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography variant='inherit'>{t(status.label)}</Typography>
        </MenuItem>
      ))}
    </Select>
  )
}
