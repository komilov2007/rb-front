import { Footer } from './style'
import { Group } from '../group'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import { useBoolean } from '@/hooks/useBoolean'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import { useProductStore } from '@/store/product'
import { Trans, useTranslation } from 'react-i18next'
import { useWatch, useFormContext } from 'react-hook-form'
import type { GroupsProps } from '@/types/product-online-shop'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

export const Groups = () => {
  const expand = useBoolean(true)
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const tabLanguage = useProfileStore(state => state.tabLanguage)
  const variants = useWatch({ control: form.control, name: 'variants' })
  const { group, groups, setGroup } = useProductStore(state => ({
    group: state.group,
    groups: state.groups ?? [],
    setGroup: state.setGroup,
  }))
  const available = groups?.reduce((prev, next) => prev + next?.available, 0)

  const handleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value
    setGroup(value, variants, form.watch('base_price') ?? undefined)
  }

  const groupIds = groups.map(g => g.parentId)
  const uniqueGroupIds = new Set(groupIds)
  const uniqueGroupIdsArray = [...uniqueGroupIds]

  const listGroups =
    variants.length === 3 || variants.length === 2
      ? (uniqueGroupIdsArray.map(id => groups.find(g => g.parentId === id)) as GroupsProps[])
      : groups

  if (variants.length === 0) {
    return null
  }

  return (
    <Stack>
      {group !== '' && (
        <Stack gap='18px'>
          <Stack mt='18px' gap='10px' px='18px' direction='row' alignItems='center'>
            <span>{t('group')}:</span>
            <Select
              value={group}
              onChange={handleChange}
              renderValue={r => {
                const variant = variants.find(v => v.generateId === r)
                return variant ? variant[`name_${tabLanguage}`] : r
              }}
            >
              {variants.map(variant => {
                const name = variant[`name_${tabLanguage}`]
                return (
                  <MenuItem key={variant.generateId} value={variant.generateId}>
                    {name}
                  </MenuItem>
                )
              })}
            </Select>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Stack direction='row' alignItems='center'>
                    {t('variant')}{' '}
                    <Button
                      variant='text'
                      size='extraSmall'
                      onClick={expand.toggle}
                      sx={{ textDecoration: 'underline' }}
                    >
                      {t('expand_all')}
                    </Button>
                  </Stack>
                </TableCell>
                <TableCell>{t('price')}</TableCell>
                <TableCell>{t('available')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listGroups.map((group, index) => (
                <Group
                  key={index}
                  group={group}
                  expand={expand.value}
                  onCloseExpand={expand.setFalse}
                />
              ))}
            </TableBody>
          </Table>
        </Stack>
      )}
      {group !== '' && (
        <Footer>
          <Typography variant='text310' align='center'>
            <Trans
              count={available}
              i18nKey='total_products_in_store_count'
              components={{
                bold: (
                  <Typography
                    component='span'
                    variant='inherit'
                    sx={theme => ({
                      color: theme.palette.allColors.BLACK,
                    })}
                  />
                ),
              }}
            />
          </Typography>
        </Footer>
      )}
    </Stack>
  )
}
