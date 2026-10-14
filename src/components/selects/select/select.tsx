import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import type { MouseEvent } from 'react'
import Stack from '@mui/material/Stack'
import MuiSelect from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { type SelectProps } from '@/types/components'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller, type FieldValues } from 'react-hook-form'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

export const Select = <T extends FieldValues>({
  id,
  name,
  label,
  control,
  options,
  loading,
  multiple,
  onChange,
  placeholder,
  ...props
}: SelectProps<T>) => {
  const { value, setTrue, setFalse } = useBoolean()
  const { t } = useTranslation()

  return (
    <FormControl
      fullWidth
      sx={{
        '.MuiOutlinedInput-input': {
          paddingLeft: '20px !important',
          paddingRight: '45px !important',
        },
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { invalid, error } }) => {
          return (
            <>
              {label && (
                <InputLabel id={id} error={invalid} sx={{ textTransform: 'capitalize' }}>
                  {t(label as string)}
                </InputLabel>
              )}
              <MuiSelect
                {...props}
                {...field}
                open={value}
                onOpen={setTrue}
                onClose={setFalse}
                onChange={(...e) => {
                  field.onChange(...e)
                  if (!multiple) {
                    setFalse()
                  }
                  if (onChange) {
                    onChange(...e)
                  }
                }}
                labelId={id}
                label={label}
                error={invalid}
                multiple={multiple}
                value={field.value || (multiple ? [] : '')}
                disabled={props.disabled || loading}
                displayEmpty={props.displayEmpty ?? true}
                sx={{
                  minHeight: '46px',
                  height: multiple ? 'fit-content' : undefined,
                }}
                IconComponent={p =>
                  loading ? (
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
                  ) : (
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
                  )
                }
                renderValue={selected => {
                  if (multiple) {
                    const option = options.filter(({ value }) => selected.includes(value as never))

                    if (!option || selected?.length === 0 || !selected) {
                      return <span className='placeholder'>{t(placeholder as string)}</span>
                    }

                    const handleDelete = (value: string | number) => () => {
                      const newOption = field.value.filter((e: string) => e !== value)
                      field.onChange(newOption)
                    }

                    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation()
                    }

                    return (
                      <Stack gap='8px' direction='row' flexWrap='wrap'>
                        {option.map(v => (
                          <Chip
                            key={v.value}
                            variant='outlined'
                            label={t(v.label as string)}
                            onMouseDown={handleMouseDown}
                            onClick={handleDelete(v.value)}
                            onDelete={handleDelete(v.value)}
                          />
                        ))}
                      </Stack>
                    )
                  }
                  if (selected?.length === 0 || !selected) {
                    return <span className='placeholder'>{t(placeholder as string)}</span>
                  }
                  const option = options.find(({ value }) => value === (selected as unknown))
                  return t(option?.label as string)
                }}
              >
                {options.map(option => {
                  const isSelected =
                    multiple && Array.isArray(field.value)
                      ? field.value.includes(option.value)
                      : field.value === option.value

                  return (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      {multiple && <Checkbox checked={isSelected} sx={{ mr: 1 }} color='primary' />}
                      <Typography variant='inherit'>{t(option.label as string)}</Typography>
                      {option.description && (
                        <Typography
                          ml='6px'
                          component='span'
                          variant='inherit'
                          className='description'
                        >
                          ({option.description})
                        </Typography>
                      )}
                    </MenuItem>
                  )
                })}
              </MuiSelect>
              <FormHelperText error={invalid}>{t(error?.message as string)}</FormHelperText>
            </>
          )
        }}
      />
    </FormControl>
  )
}
