import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { ALL_OPTION } from '@/constants/option'
import Typography from '@mui/material/Typography'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

interface SelectBranchProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ label: string; value: string }>
}

export const SelectBranch = ({ value, options, onChange }: SelectBranchProps) => {
  const { t } = useTranslation()

  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange(e.target.value)
  }

  return (
    <Select
      size='small'
      value={value}
      onChange={handleChange}
      sx={theme => ({
        minHeight: '42px',
        minWidth: { xs: '100%', md: '200px' },
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
      <MenuItem value={ALL_OPTION.value}>
        <Typography variant='inherit'>{t('all_branches')}</Typography>
      </MenuItem>
      {options.map(branch => (
        <MenuItem key={branch.value} value={branch.value}>
          <Typography variant='inherit'>{branch.label}</Typography>
        </MenuItem>
      ))}
    </Select>
  )
}
