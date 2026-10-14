import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import type { Dispatch, SetStateAction } from 'react'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { ReactComponent as IconLocationMap } from '@/assets/icons/location-map.svg'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

interface SelectBranchesFilterProps {
  isAll?: boolean
  value: string | number
  onChange: Dispatch<SetStateAction<string | number>>
}

export const SelectBranchesFilter = ({ isAll, value, onChange }: SelectBranchesFilterProps) => {
  const { t } = useTranslation()
  const modal = useBoolean()
  const branches = useProfileStore(state => (isAll ? state.allBranches : state.branches))

  const handleChange = (e: SelectChangeEvent<string | number>) => {
    onChange(e.target.value)
  }

  return (
    <Select
      size='small'
      value={value}
      open={modal.value}
      onOpen={modal.setTrue}
      onClose={modal.setFalse}
      onChange={handleChange}
      startAdornment={
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{
            svg: {
              width: '15px',
              height: '15px',
            },
          }}
        >
          <IconLocationMap />
        </Stack>
      }
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
      {branches.map(branche => (
        <MenuItem
          key={branche.value}
          value={branche.value}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography variant='inherit'>{t(branche.label as string)}</Typography>
        </MenuItem>
      ))}
    </Select>
  )
}
