import { Groups } from '../groups'
import { Options } from '../options'
import { PANELS } from './constants'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { HocDroppable } from '@/hocs/hoc-droppable'
import { defaultLanguages } from '@/utils/languages'
import { useProductStore } from '@/store/product'
import { TabLanguages } from '@/components/tab-languages'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'
import { ReactComponent as IconDrag } from '@/assets/icons/drag.svg'
import { ReactComponent as IconPlusFill } from '@/assets/icons/plus-fill.svg'
import { Draggable, type DropResult, DragDropContext } from 'react-beautiful-dnd'
import { ReactComponent as IconEditIconOutline } from '@/assets/icons/edit-icon-outline.svg'

interface AnswersDragEnddRefProps {
  onDragEnd?: (result: DropResult) => void
}

export const Variants = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const answersDragEnddRef = useRef<AnswersDragEnddRefProps>()
  const tabLanguage = useProfileStore(state => state.tabLanguage)
  const { group, setGroup, setVariants } = useProductStore(state => ({
    group: state.group,
    setGroup: state.setGroup,
    setVariants: state.setVariants,
  }))
  const { move, fields, append, remove, update } = useFieldArray({
    name: 'variants',
    control: form.control,
  })

  const handleAddCharacteristic = () => {
    form.setValue('isBeforeCreateVaraint', false)
    document.querySelectorAll('[id^="btn"]').forEach(btn => {
      ;(btn as HTMLButtonElement).click()
    })
    append({
      isEdit: true,
      name_en: '',
      name_ru: '',
      name_tr: '',
      name_uz: '',
      options: [
        {
          name_en: '',
          name_ru: '',
          name_tr: '',
          name_uz: '',
        },
      ],
    })
  }

  const handleOnDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return
      }
      if (result.type === 'VARIANTS') {
        move(result.source.index, result.destination.index)
      }
      if (result.type === 'OPTIONS' && answersDragEnddRef.current?.onDragEnd) {
        answersDragEnddRef.current?.onDragEnd(result)
      }
    },
    [move, answersDragEnddRef],
  )

  const handleDelete = useCallback(
    (index: number) => () => {
      remove(index)
      const findVariant = fields.find((_, i) => i === index)
      const variants = fields.filter((_, i) => i !== index)
      setGroup(
        variants.length === 0
          ? ''
          : findVariant?.generateId === group
            ? (variants[0].generateId as string)
            : group,
      )
      setVariants(variants)
    },
    [fields, remove, setVariants],
  )

  const handleEdit = useCallback(
    (index: number) => () => {
      const currentField = form.getValues(`variants.${index}`)
      update(index, { ...currentField, isEdit: true })
    },
    [form, update],
  )

  return (
    <>
      {
        // @ts-ignore
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <HocDroppable droppableId='variants' type='VARIANTS'>
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
                    panels={PANELS.map(p => {
                      return {
                        value: p.value,
                        panel: (
                          <>
                            {fields.map((field, index: number) => {
                              const handleSubmit = async () => {
                                const properties = await Promise.all([
                                  form.trigger(`variants.${index}.${p.name}`),
                                  form.trigger(`variants.${index}.options`),
                                ])
                                const isValid = properties.every(item => item)

                                if (isValid) {
                                  const currentField = form.getValues(`variants.${index}`)
                                  const name_translations = defaultLanguages(
                                    'name',
                                    currentField,
                                    true,
                                  )

                                  const options = currentField.options?.map(option => ({
                                    ...option,
                                    ...defaultLanguages('name', option, true),
                                  }))

                                  const values = {
                                    ...currentField,
                                    ...name_translations,
                                    options,
                                    isEdit: false,
                                  }
                                  update(index, values)
                                  const variants = form
                                    .getValues('variants')
                                    .map((variant, i) => (index === i ? values : variant))
                                  setVariants(
                                    variants,
                                    form.watch('isBeforeCreateVaraint')
                                      ? 0
                                      : (form.getValues('base_price') ?? 0),
                                  )
                                }
                              }

                              const handleBlur = () => {
                                if (
                                  group === '' &&
                                  form.getValues(`variants.${index}.${p.name}`).length > 0
                                ) {
                                  const varaints = form.getValues('variants')
                                  setGroup(varaints[0].generateId ?? '')
                                }
                              }

                              return (
                                <Stack key={field.id}>
                                  {
                                    // @ts-ignore
                                    <Draggable index={index} draggableId={field.id}>
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
                                          {field.isEdit ? (
                                            <>
                                              <Stack gap='10px' direction='row'>
                                                <Stack mt='22px' {...provided.dragHandleProps}>
                                                  <IconDrag />
                                                </Stack>
                                                <Stack gap='24px' width='100%'>
                                                  <Input
                                                    fullWidth
                                                    label='variant_name'
                                                    control={form.control}
                                                    placeholder='enter_variant_name'
                                                    name={`variants.${index}.${p.name}`}
                                                    InputProps={{
                                                      onBlur: handleBlur,
                                                    }}
                                                  />
                                                  <input
                                                    type='hidden'
                                                    defaultValue={field.id}
                                                    {...form.register(
                                                      `variants.${index}.generateId`,
                                                    )}
                                                  />
                                                  <Options
                                                    name={p.name}
                                                    index={index}
                                                    ref={answersDragEnddRef}
                                                  />
                                                </Stack>
                                              </Stack>
                                              <Stack direction='row' justifyContent='space-between'>
                                                <Button
                                                  size='extraSmall'
                                                  variant='outlined-red'
                                                  onClick={handleDelete(index)}
                                                >
                                                  {t('delete')}
                                                </Button>
                                                <Button
                                                  id='btn'
                                                  size='extraSmall'
                                                  onClick={handleSubmit}
                                                >
                                                  {t('completed')}
                                                </Button>
                                              </Stack>
                                            </>
                                          ) : (
                                            <Stack>
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
                                                >
                                                  <Typography component='h3'>
                                                    {field[`name_${tabLanguage}`]}
                                                  </Typography>
                                                </Stack>
                                                <IconButton onClick={handleEdit(index)}>
                                                  <IconEditIconOutline />
                                                </IconButton>
                                              </Stack>
                                              <Stack
                                                ml='30px'
                                                gap='10px'
                                                component='ul'
                                                flexWrap='wrap'
                                                direction='row'
                                              >
                                                {field.options?.map((option, index) => (
                                                  <Chip
                                                    size='small'
                                                    key={index}
                                                    component='li'
                                                    variant='filled'
                                                    label={option[`name_${tabLanguage}`]}
                                                  />
                                                ))}
                                              </Stack>
                                            </Stack>
                                          )}
                                        </Stack>
                                      )}
                                    </Draggable>
                                  }
                                </Stack>
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
      {fields.length < 3 && (
        <Stack width='fit-content' p='18px'>
          <Button variant='text' startIcon={<IconPlusFill />} onClick={handleAddCharacteristic}>
            {t('add_variants_like_size_or_color')}
          </Button>
        </Stack>
      )}
      <Groups />
    </>
  )
}
