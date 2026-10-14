import { useCallback } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { HocDroppable } from '@/hocs/hoc-droppable'
import type { LanguageTypes } from '@/types/language'
import { TabLanguages } from '@/components/tab-languages'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'
import { ReactComponent as IconDrag } from '@/assets/icons/drag.svg'
import { ReactComponent as IconPlusFill } from '@/assets/icons/plus-fill.svg'
import { Draggable, type DropResult, DragDropContext } from 'react-beautiful-dnd'
import { ReactComponent as IconEditIconOutline } from '@/assets/icons/edit-icon-outline.svg'
import { defaultLanguages } from '@/utils/languages'

type PanelsProps = Array<{
  value: LanguageTypes
  name: 'name_en' | 'name_ru' | 'name_uz' | 'name_tr'
  text: 'text_en' | 'text_ru' | 'text_uz' | 'text_tr'
}>

export const AdditionalInformation = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const { move, fields, append, update, remove } = useFieldArray({
    name: 'properties',
    control: form.control,
  })

  const handleAddCharacteristic = () => {
    append({
      name_en: '',
      name_ru: '',
      name_tr: '',
      name_uz: '',
      text_en: '',
      text_ru: '',
      text_tr: '',
      text_uz: '',
      isEdit: true,
    })
  }

  const handleOnDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return
      }

      move(result.source.index, result.destination.index)
    },
    [move],
  )

  const handleDelete = useCallback(
    (index: number) => () => {
      remove(index)
    },
    [remove],
  )

  const handleEdit = useCallback(
    (index: number) => () => {
      const currentField = form.getValues(`properties.${index}`)
      update(index, { ...currentField, isEdit: true })
    },
    [form, update],
  )

  const panels: PanelsProps = [
    {
      value: 'uz',
      name: 'name_uz',
      text: 'text_uz',
    },
    {
      value: 'ru',
      name: 'name_ru',
      text: 'text_ru',
    },
    {
      value: 'en',
      name: 'name_en',
      text: 'text_en',
    },
    {
      value: 'tr',
      name: 'name_tr',
      text: 'text_tr',
    },
  ]

  return (
    <>
      {
        // @ts-ignore
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <HocDroppable droppableId='properties' type='PROPERTIES'>
            {provided => (
              <Stack
                gap='18px'
                component='ul'
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  '.MuiTabs-root': {
                    margin: '18px 0 0 18px !important',
                  },
                }}
              >
                {fields.length > 0 && (
                  <TabLanguages
                    panels={panels.map(p => {
                      return {
                        value: p.value,
                        panel: (
                          <>
                            {fields.map((field, index: number) => {
                              const handleSubmit = (index: number) => async () => {
                                const properties = await Promise.all([
                                  form.trigger(`properties.${index}.${p.name}`),
                                  form.trigger(`properties.${index}.${p.text}`),
                                ])
                                const isValid = properties.every(item => item)

                                const property = form.getValues(`properties.${index}`)
                                const name_translations = defaultLanguages('name', property, true)
                                const text_translations = defaultLanguages('text', property, true)

                                if (isValid) {
                                  const currentField = form.getValues(`properties.${index}`)
                                  update(index, {
                                    ...currentField,
                                    ...name_translations,
                                    ...text_translations,
                                    isEdit: false,
                                  })
                                }
                              }
                              return (
                                // @ts-ignore
                                <Draggable key={field.id} index={index} draggableId={field.id}>
                                  {provided => (
                                    <Stack
                                      p='18px'
                                      gap='24px'
                                      width='100%'
                                      component='li'
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      sx={theme => ({
                                        borderBottom: `1px solid ${theme.palette.divider}`,
                                      })}
                                    >
                                      <>
                                        {
                                          // @ts-ignore
                                          field.isEdit ? (
                                            <Stack gap='10px' direction='row'>
                                              <Stack mt='22px' {...provided.dragHandleProps}>
                                                <IconDrag />
                                              </Stack>
                                              <Stack gap='24px' width='100%'>
                                                <Input
                                                  fullWidth
                                                  control={form.control}
                                                  label='characteristic_name'
                                                  placeholder='enter_character_name'
                                                  name={`properties.${index}.${p.name}`}
                                                />
                                                <Input
                                                  fullWidth
                                                  control={form.control}
                                                  label='characteristic_value'
                                                  name={`properties.${index}.${p.text}`}
                                                  placeholder='enter_the_characteristic_value'
                                                />
                                              </Stack>
                                            </Stack>
                                          ) : (
                                            <Stack
                                              gap='10px'
                                              width='100%'
                                              direction='row'
                                              alignItems='center'
                                              justifyContent='space-between'
                                            >
                                              <Stack
                                                justifyContent='center'
                                                {...provided.dragHandleProps}
                                              >
                                                <IconDrag />
                                              </Stack>
                                              <Stack
                                                flexGrow={1}
                                                direction='row'
                                                alignItems='center'
                                                justifyContent='space-between'
                                              >
                                                <Typography component='h3'>
                                                  {form.watch(`properties.${index}.${p.name}`)}
                                                </Typography>
                                                <Typography component='h4'>
                                                  {form.watch(`properties.${index}.${p.text}`)}
                                                </Typography>
                                              </Stack>
                                              <IconButton onClick={handleEdit(index)}>
                                                <IconEditIconOutline />
                                              </IconButton>
                                            </Stack>
                                          )
                                        }
                                        {form.watch(`properties.${index}.isEdit`) && (
                                          <Stack direction='row' justifyContent='space-between'>
                                            <Button
                                              size='extraSmall'
                                              variant='outlined-red'
                                              onClick={handleDelete(index)}
                                            >
                                              {t('delete')}
                                            </Button>
                                            <Button size='extraSmall' onClick={handleSubmit(index)}>
                                              {t('completed')}
                                            </Button>
                                          </Stack>
                                        )}
                                      </>
                                    </Stack>
                                  )}
                                </Draggable>
                              )
                            })}
                          </>
                        ),
                      }
                    })}
                  />
                )}
                <>
                  {
                    // @ts-ignore
                    provided.placeholder
                  }
                </>
              </Stack>
            )}
          </HocDroppable>
        </DragDropContext>
      }
      <Stack width='fit-content' p='18px'>
        <Button variant='text' startIcon={<IconPlusFill />} onClick={handleAddCharacteristic}>
          {t('add_characteristic')}
        </Button>
      </Stack>
    </>
  )
}
