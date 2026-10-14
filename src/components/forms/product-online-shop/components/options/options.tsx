import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import type { NameProps } from '@/types/name'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useProductStore } from '@/store/product'
import { useFieldArray, useFormContext } from 'react-hook-form'
import type { SchemaTypeProductOnlineShop } from '@/utils/schema'
import { ReactComponent as IconDelete } from '@/assets/icons/delete.svg'
import { type DropResult, Draggable, Droppable } from 'react-beautiful-dnd'
import { forwardRef, type MouseEvent, useCallback, useImperativeHandle } from 'react'
import { ReactComponent as IconMenuLineHorizontal } from '@/assets/icons/menu-line-horizontal.svg'

interface OptionsProps {
  index: number
  name: NameProps
}

export const Options = forwardRef((props: OptionsProps, ref) => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const setVariants = useProductStore(state => state.setVariants)
  const { move, append, fields, remove } = useFieldArray({
    control: form.control,
    name: `variants.${props.index}.options`,
  })
  const { groups, setGroups } = useProductStore(state => ({
    groups: state.groups,
    setGroups: state.setGroups,
  }))
  const onDragEnd = useCallback(
    (result: DropResult) => {
      move(result.source.index, Number(result.destination?.index))
    },
    [move],
  )

  const handleAppend = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    append({ name_en: '', name_ru: '', name_tr: '', name_uz: '' })
  }

  const handleRemove = (index: number) => () => {
    remove(index)
    const field = fields.find((_, i) => i === index)
    const newGroups = groups.filter(g => {
      const findOption = g.options.find(
        o =>
          (o.parentId === field?.parentId && o.variantId === field?.variantId) ||
          field?.generateId === o.generateId,
      )
      return !findOption
    })
    setGroups(newGroups)
  }

  useImperativeHandle(ref, () => {
    return {
      onDragEnd,
    }
  }, [onDragEnd])

  return (
    <Stack gap='10px'>
      <Typography>{t('variant_values')}</Typography>
      {
        // @ts-ignore
        <Droppable droppableId={`options-${props.index}`} type='OPTIONS'>
          {provided => (
            <Stack ref={provided.innerRef}>
              <Stack gap='10px' component='ul'>
                {fields.map((field, nestIndex) => {
                  const handleBlur = () => {
                    const variants = form.getValues('variants')
                    const name = form.getValues(
                      `variants.${props.index}.options.${nestIndex}.${props.name}`,
                    )
                    if (name && name?.length > 0) {
                      setVariants(
                        variants,
                        form.watch('isBeforeCreateVaraint')
                          ? 0
                          : (form.getValues('base_price') ?? 0),
                      )
                    }
                  }

                  return (
                    // @ts-ignore
                    <Draggable
                      index={nestIndex}
                      key={`${props.index}${nestIndex}`}
                      draggableId={`${props.index}${nestIndex}`}
                    >
                      {provided => (
                        <Stack
                          gap='10px'
                          key={field.id}
                          component='li'
                          direction='row'
                          alignItems='center'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <span {...provided.dragHandleProps}>
                            <IconMenuLineHorizontal />
                          </span>
                          <Input
                            fullWidth
                            control={form.control}
                            placeholder='enter_variant_value'
                            name={`variants.${props.index}.options.${nestIndex}.${props.name}`}
                            InputProps={{
                              onBlur: handleBlur,
                              endAdornment:
                                fields.length === 1 ? undefined : (
                                  <IconButton sx={{ mr: '-9px' }} onClick={handleRemove(nestIndex)}>
                                    <IconDelete />
                                  </IconButton>
                                ),
                            }}
                          />
                          <input
                            type='hidden'
                            defaultValue={field.id}
                            {...form.register(
                              `variants.${props.index}.options.${nestIndex}.generateId`,
                            )}
                          />
                          <input
                            type='hidden'
                            defaultValue={`${props.index}-${nestIndex}`}
                            {...form.register(
                              `variants.${props.index}.options.${nestIndex}.parentId`,
                            )}
                          />
                        </Stack>
                      )}
                    </Draggable>
                  )
                })}
              </Stack>
              <>
                {
                  // @ts-ignore
                  provided.placeholder
                }
              </>
            </Stack>
          )}
        </Droppable>
      }
      <Stack alignItems='flex-end'>
        <Button size='extraSmall' variant='outlined-purple' onClick={handleAppend}>
          {t('add_option')}
        </Button>
      </Stack>
    </Stack>
  )
})
