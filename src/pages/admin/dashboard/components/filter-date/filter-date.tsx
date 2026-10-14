import MenuItem from '@mui/material/MenuItem'
import { type Dispatch, type SetStateAction } from 'react'
import { FILTER_DATE_OPTIONS } from '@/constants/filter-date'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { useTranslation } from 'react-i18next'

interface FilterDateProps {
  date: string
  disabled?: boolean
  setDate: Dispatch<SetStateAction<string>>
}

export const FilterDate = ({ date, disabled, setDate }: FilterDateProps) => {
  const { t } = useTranslation()
  const handleChange = (e: SelectChangeEvent<string>) => {
    setDate(e.target.value)
  }

  return (
    <Select
      value={date}
      disabled={disabled}
      onChange={handleChange}
      sx={theme => ({
        height: '28px',
        borderRadius: '4px',
        '.MuiSelect-select': {
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: 'normal',
          p: '8px 8px 5px 14px',
          color: theme.palette.colors['L-GRAY30-D-GRAY20'],
        },
        backgroundColor: theme.palette.colors['L-GRAY360-D-GRAY180'],
        fieldset: {
          borderColor: theme.palette.allColors.TRANSPARENT,
        },
      })}
    >
      {Object.values(FILTER_DATE_OPTIONS).map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {t(label)}
        </MenuItem>
      ))}
    </Select>
  )
}
