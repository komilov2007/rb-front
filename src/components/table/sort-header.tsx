import { ReactComponent as ArrowUpwardIcon } from '@/assets/icons/arrow-upward.svg'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import type { Column } from '@tanstack/react-table'
import { type ReactNode } from 'react'

interface SortHeaderProps<T> {
  column: Column<T, unknown>
  children?: ReactNode
  align?: 'left' | 'center' | 'right'
}

export function SortHeader<T>({ column, children, align = 'left' }: SortHeaderProps<T>) {
  const canSort = column.getCanSort()
  const theme = useTheme()
  const sorted = column.getIsSorted() as false | 'asc' | 'desc'

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:
          align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        gap: 0.5,
        userSelect: 'none',
      }}
    >
      <Typography component='span' fontSize={13} fontWeight={300}>
        {children}
      </Typography>

      {canSort && (
        <IconButton
          size='small'
          onClick={column.getToggleSortingHandler()}
          sx={{ p: 0 }}
          aria-label='toggle sort'
          aria-pressed={sorted !== false}
        >
          <ArrowUpwardIcon
            fill={theme.palette.allColors.GRAY30}
            style={{ opacity: 0.5, transform: sorted === 'asc' ? 'rotate(180deg)' : 'none' }}
            width={20}
            height={20}
          />
        </IconButton>
      )}
    </Box>
  )
}
