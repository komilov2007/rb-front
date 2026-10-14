import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TextField from '@mui/material/TextField'
import { useProfileStore } from '@/store/profile'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useProductStore } from '@/store/product'
import { useMeasuresStore } from '@/store/measures'
import InputAdornment from '@mui/material/InputAdornment'
import { useFormContext, useWatch } from 'react-hook-form'
import { InputPrice } from '@/components/inputs/input-price'
import { getPriceDisplay } from '@/utils/product-online-shop'
import type { GroupsProps } from '@/types/product-online-shop'
import type { SchemaTypeProductOnlineShop } from '@/utils/schema'
import { UploadProductOnlineShopVariant } from '../upload-product-online-shop-variant'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

interface GroupProps {
  expand: boolean
  group: GroupsProps
  onCloseExpand: () => void
}

export const Group = (props: GroupProps) => {
  const { t } = useTranslation()
  const focusInput = useBoolean()
  const expand = useBoolean(true)
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const measures = useMeasuresStore(state => state.measures)
  const tabLanguage = useProfileStore(state => state.tabLanguage)
  const mainOption = props.group.options[0]
  const { groups, updateGroup } = useProductStore(state => ({
    groups: state.groups,
    updateGroup: state.updateGroup,
  }))
  const variants = useWatch({ control: form.control, name: 'variants' })
  const price = getPriceDisplay(groups.filter(g => g.parentId === props.group.parentId))

  const options = (
    variants.length === 3 || variants.length === 2
      ? groups
          .filter(g => g.parentId === props.group.parentId)
          .map(g => {
            const options = g.options.map(o => ({
              ...o,
              photo: g.photo,
              price: g.price,
              parentId: g.parentId,
              available: g.available,
              generateId: g.generateId,
            }))

            const restOptions = options.slice(1)

            const allOptions =
              variants.length === 2
                ? restOptions
                : restOptions.reduce((prev, next) => ({
                    ...next,
                    name_translations: {
                      name_en: `${prev.name_translations?.name_en} / ${next.name_translations?.name_en}`,
                      name_ru: `${prev.name_translations?.name_ru} / ${next.name_translations?.name_ru}`,
                      name_tr: `${prev.name_translations?.name_tr} / ${next.name_translations?.name_tr}`,
                      name_uz: `${prev.name_translations?.name_uz} / ${next.name_translations?.name_uz}`,
                    },
                    value_translations: {
                      name_en: `${prev.value_translations?.name_en} / ${next.value_translations?.name_en}`,
                      name_ru: `${prev.value_translations?.name_ru} / ${next.value_translations?.name_ru}`,
                      name_tr: `${prev.value_translations?.name_tr} / ${next.value_translations?.name_tr}`,
                      name_uz: `${prev.value_translations?.name_uz} / ${next.value_translations?.name_uz}`,
                    },
                  }))

            return allOptions
          })
          .flat()
      : props.group.options.slice(1)
  ) as GroupsProps[]

  const available =
    options.length > 0
      ? options.map(o => o?.available ?? 0).reduce((prev, next) => prev + next, 0)
      : props.group?.available

  useEffect(() => {
    expand.setValue(props.expand)
  }, [props.expand])

  return (
    <>
      <TableRow>
        <TableCell sx={{ pl: '18px' }}>
          <Stack gap='16px' direction='row' alignItems='center'>
            <UploadProductOnlineShopVariant
              size='medium'
              value={props.group.photo ?? ''}
              onChange={photo => {
                updateGroup(
                  {
                    photo,
                    price: props.group.price,
                    parentId: props.group.parentId,
                    available: props.group.available,
                    generateId: props.group.generateId,
                  },
                  options.length > 0,
                )
              }}
            />
            <Stack>
              <Typography variant='text120' whiteSpace='nowrap'>
                {mainOption?.value_translations?.[`name_${tabLanguage}`]}
              </Typography>
              {props.group.options.length > 1 && (
                <Stack gap='4px' direction='row' whiteSpace='nowrap' alignItems='center'>
                  <Typography variant='text310'>
                    {t('count_variants', { count: props.group.options.length - 1 })}
                  </Typography>
                  <IconButton
                    radius='50%'
                    onClick={expand.toggle}
                    sx={{ transform: expand.value ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <IconDirectionDown />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Stack>
        </TableCell>
        <TableCell>
          {options.length > 0 ? (
            focusInput.value ? (
              <InputPrice
                fullWidth
                size='small'
                value={props.group.price}
                onBlur={focusInput.setFalse}
                placeholder={t('enter_price')}
                onChange={e => {
                  form.setValue('isBeforeCreateVaraint', true)
                  updateGroup(
                    {
                      photo: props.group.photo,
                      price: Number(e.target.value),
                      parentId: props.group.parentId,
                      available: props.group.available,
                      generateId: props.group.generateId,
                    },
                    true,
                  )
                }}
              />
            ) : (
              <TextField
                fullWidth
                size='small'
                type='string'
                value={price}
                onFocus={focusInput.setTrue}
                placeholder={t('enter_price')}
              />
            )
          ) : (
            <InputPrice
              fullWidth
              size='small'
              value={props.group.price}
              placeholder={t('enter_price')}
              onChange={e => {
                form.setValue('isBeforeCreateVaraint', true)
                updateGroup({
                  photo: props.group.photo,
                  price: Number(e.target.value),
                  parentId: props.group.parentId,
                  available: props.group.available,
                  generateId: props.group.generateId,
                })
              }}
            />
          )}
        </TableCell>
        <TableCell>
          <TextField
            fullWidth
            type='tel'
            size='small'
            value={available}
            disabled={options.length > 0}
            onChange={e => {
              const available =
                e.target.value === '' || isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
              updateGroup({
                available,
                photo: props.group.photo,
                price: props.group.price,
                parentId: props.group.parentId,
                generateId: props.group.generateId,
              })
            }}
            sx={theme => ({
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: `${theme.palette.allColors.TRANSPARENT} !important`,
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography variant='text' color={theme => theme.palette.allColors.PURPLE}>
                    {measures.find(m => m.value === form.watch('measure_id'))?.label}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </TableCell>
      </TableRow>
      {expand.value && options.length > 1 && (
        <TableRow sx={{ m: 0 }}>
          <TableCell colSpan={3} sx={{ p: 0 }}>
            <Collapse in={expand.value || props.expand} timeout='auto' unmountOnExit>
              <Box>
                <Table size='small'>
                  <TableBody>
                    {options.map((option, index) => {
                      const item = option
                      return (
                        <TableRow key={index}>
                          <TableCell sx={{ pl: '36px' }}>
                            <Stack gap='16px' direction='row' alignItems='center'>
                              <UploadProductOnlineShopVariant
                                size='small'
                                value={item.photo ?? ''}
                                onChange={photo => {
                                  updateGroup({
                                    photo,
                                    price: item.price,
                                    parentId: item.parentId,
                                    available: item.available,
                                    generateId: item.generateId,
                                  })
                                }}
                              />
                              <Stack>
                                <Typography variant='text120' whiteSpace='nowrap'>
                                  {item.value_translations?.name_en}
                                </Typography>
                              </Stack>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <InputPrice
                              fullWidth
                              size='small'
                              value={item.price}
                              placeholder={t('enter_price')}
                              onChange={e => {
                                form.setValue('isBeforeCreateVaraint', true)
                                updateGroup({
                                  photo: item.photo,
                                  parentId: item.parentId,
                                  available: item.available,
                                  generateId: item.generateId,
                                  price: Number(e.target.value),
                                })
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              size='small'
                              type='tel'
                              value={item.available}
                              onChange={e => {
                                const available =
                                  e.target.value === '' || isNaN(Number(e.target.value))
                                    ? 0
                                    : Number(e.target.value)
                                updateGroup({
                                  available,
                                  photo: item.photo,
                                  price: item.price,
                                  parentId: item.parentId,
                                  generateId: item.generateId,
                                })
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <Typography
                                      variant='text'
                                      color={theme => theme.palette.allColors.PURPLE}
                                    >
                                      {
                                        measures.find(m => m.value === form.watch('measure_id'))
                                          ?.label
                                      }
                                    </Typography>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
