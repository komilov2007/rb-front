import { type ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useBranches } from '@/hooks/useBranches'
import Select, { type SelectProps } from '@mui/material/Select'
import { ReactComponent as IconLocationMap } from '@/assets/icons/location-map.svg'
import { ReactComponent as IconRemoveCircle } from '@/assets/icons/remove-circle.svg'

type SelectBranchFilterProps = Pick<SelectProps, 'value' | 'onChange' | 'disabled'> & {
  variant?: 'fill' | 'contained'
  onClear: () => void
}

export const SelectBranchFilter = ({
  variant = 'contained',
  ...props
}: SelectBranchFilterProps) => {
  const { t } = useTranslation()
  const { data, isLoading } = useBranches()

  return (
    <Select
      {...props}
      fullWidth
      value={props.value}
      onChange={props.onChange}
      sx={theme =>
        variant === 'contained'
          ? {
              height: '42px',
              minWidth: '120px',
              borderRadius: '5px !important',
              backgroundColor: theme.palette.allColors.GRAY330,
              fieldset: {
                borderColor: theme.palette.allColors.GRAY10,
              },
              '.MuiOutlinedInput-input': {
                paddingTop: '9px !important',
                paddingBottom: '9px !important',
              },
            }
          : {}
      }
      displayEmpty
      IconComponent={() =>
        isLoading ? (
          <Stack pr='10px'>
            <Spinner
              center
              sx={{
                '.MuiCircularProgress-root': {
                  width: '20px !important',
                  height: '20px !important',
                },
              }}
            />
          </Stack>
        ) : props.value ? (
          <IconButton sx={{ p: 0, mr: '10px', zIndex: '999' }} onClick={props.onClear}>
            <IconRemoveCircle />
          </IconButton>
        ) : null
      }
      renderValue={() => {
        const label = data.find(b => b.value === props.value)?.label
        return (
          <Stack p='6px 0' gap='4px' direction='row' alignItems='center'>
            <Stack>
              <IconLocationMap />
            </Stack>
            <Stack justifyContent='center'>
              <Typography
                variant='text60'
                component='span'
                color={theme => theme.palette.allColors.GRAY30}
              >
                {t('branches')}
              </Typography>
              <Typography variant='text' color={theme => theme.palette.allColors.BLACK30}>
                {label}
              </Typography>
            </Stack>
          </Stack>
        ) as ReactNode
      }}
    >
      {data.map(({ value, label }, i) => (
        <MenuItem key={i} value={value} sx={{ gap: '6px' }}>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
