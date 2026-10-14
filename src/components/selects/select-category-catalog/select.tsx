import Box from '@mui/material/Box'
import { getUser } from '@/utils/user'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import type { Dispatch, SetStateAction } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getCategoriesCatalogList } from '@/apis/admin/category'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

interface SelectCategoryCatalogFilterProps {
  value: number | string
  onChange: Dispatch<SetStateAction<string | number>>
}

export const SelectCategoryCatalogFilter = ({
  value,
  onChange,
}: SelectCategoryCatalogFilterProps) => {
  const user = getUser()
  const select = useBoolean()
  const { t } = useTranslation()

  const { data: categoryCatalogs, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CATEGORY_CATALOG_LIST, user.shop],
    queryFn: async () => await getCategoriesCatalogList(user.shop),
  })
  const options = categoryCatalogs?.data

  const handleChange = (e: SelectChangeEvent<string | number>) => {
    onChange(e.target.value)
  }

  return (
    <Select
      size='small'
      value={value}
      onClose={select.setFalse}
      onChange={handleChange}
      displayEmpty
      renderValue={selected =>
        selected ? (
          <span>{options?.find(c => c.id === selected)?.name}</span>
        ) : (
          <span className='placeholder'>{t('select_category')}</span>
        )
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
      {isLoading ? (
        <Spinner center />
      ) : (
        options?.map(categoryCatalog => (
          <MenuItem
            key={categoryCatalog.id}
            value={categoryCatalog.id}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant='inherit'>{categoryCatalog.name}</Typography>
          </MenuItem>
        ))
      )}
    </Select>
  )
}
