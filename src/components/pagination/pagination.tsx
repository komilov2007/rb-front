import Stack from '@mui/material/Stack'
import { type ChangeEvent } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MuiPagination from '@mui/material/Pagination'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import { ReactComponent as IconDirectionRight } from '@/assets/icons/direction-right.svg'

interface PaginationProps {
  total: number
  disabled?: boolean
  page: number | string
  limit: number | string
  onChangePage: (e: number) => void
  onChangeLimit: (e: number) => void
}

const SIZE_OPTIONS = [10, 30, 50, 100, 200]

export const Pagination = ({
  page,
  limit,
  total,
  disabled,
  onChangePage,
  onChangeLimit,
}: PaginationProps) => {
  const { t } = useTranslation()
  if (total === 0) {
    return null
  }

  const devide = total % Number(limit)
  const remain = Number(limit) - devide
  const count = (total + remain) / Number(limit)

  const handleChange = (event: SelectChangeEvent<number | string>) => {
    onChangeLimit(Number(event.target.value))
  }

  const handleChangePage = (_: ChangeEvent<unknown>, page: number) => {
    onChangePage(page)
  }

  return (
    <Stack
      width='100%'
      direction='row'
      alignItems='center'
      className='pagination'
      justifyContent='space-between'
      p={{ xs: '5px 20px', md: '18px 20px' }}
    >
      <Stack gap='18px' direction='row' alignItems='center'>
        <Typography variant='text'>{t('showing')}</Typography>
        <Select
          value={limit}
          sx={theme => ({
            height: '32px',
            borderRadius: '6px',
            '.MuiSelect-select': {
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: 'normal',
              p: '8px 7px 6px 14px',
              color: theme.palette.colors['L-BLACK30-D-WHITE20'],
            },
            backgroundColor: `${theme.palette.allColors.TRANSPARENT}`,
            fieldset: {
              borderColor: theme.palette.colors['L-GRAY10-D-BLACK20'],
            },
          })}
          onChange={handleChange}
        >
          {SIZE_OPTIONS.map(size => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Typography variant='text' sx={{ display: { xs: 'none', md: 'unset' } }}>
        {t('showing_from_to_of_value_record', {
          total,
          from: Number(page) === 1 ? 1 : (Number(page) - 1) * Number(limit),
          to: Number(limit) > Number(total) ? total : Number(page) * Number(limit),
        })}
      </Typography>
      <MuiPagination
        count={count}
        showLastButton
        showFirstButton
        defaultPage={1}
        siblingCount={0}
        boundaryCount={0}
        page={Number(page)}
        onChange={handleChangePage}
        renderItem={item => {
          if (item.type === 'first' || item.type === 'last') {
            return (
              <IconButton
                onClick={item.onClick}
                disabled={disabled || item.disabled}
                sx={{ transform: item.type === 'last' ? 'rotate(-180deg)' : undefined }}
              >
                <IconDirectionRight />
              </IconButton>
            )
          }

          if (item.type === 'previous' || item.type === 'next') {
            return (
              <IconButton
                onClick={item.onClick}
                disabled={disabled || item.disabled}
                sx={{ transform: item.type === 'next' ? 'rotate(-90deg)' : 'rotate(90deg)' }}
              >
                <IconDirectionDown />
              </IconButton>
            )
          }
          return null
        }}
      />
    </Stack>
  )
}
