import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { WrapImageContent } from './style'
import { useMedia } from '@/hooks/useMedia'
import Skeleton from '@mui/material/Skeleton'
import Checkbox from '@mui/material/Checkbox'
import { type MediaProps } from '@/types/media'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { HocDroppable } from '@/hocs/hoc-droppable'
import { Trans, useTranslation } from 'react-i18next'
import FormHelperText from '@mui/material/FormHelperText'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'
import { ACCEPT_IMAGES, MAX_FILE_SIZE10 } from '@/constants/media'
import { useRef, useCallback, type DragEvent, type ChangeEvent } from 'react'
import { ReactComponent as IconImageAdd } from '@/assets/icons/image-add.svg'
import { Draggable, type DropResult, DragDropContext } from 'react-beautiful-dnd'
import { ReactComponent as IconDragAndDrop } from '@/assets/icons/drag-and-drop.svg'
import { ReactComponent as IconCheckboxTrueFill } from '@/assets/icons/checkbox-true-fill.svg'
import { ReactComponent as IconCheckboxFalseFill } from '@/assets/icons/checkbox-false-fill.svg'

const HTML_FOR = 'upload-multiple-product-online-shop-image'

export const UploadMultipleProductOnlineShopImage = () => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useMedia()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const { move, fields, append, update } = useFieldArray({
    name: 'images',
    control: form.control,
  })

  const hasDelete = fields.filter(f => f.isDelete)
  const errorMessage = form.formState.errors.images?.message

  const handleUploadFile = (file: File | FileList) => {
    const nonImageFiles = Array.from(file as FileList).filter(f => !f.type.startsWith('image/'))
    if (nonImageFiles.length > 0) {
      form.setError('images', { message: 'only_image_files_allowed' })
      return
    }

    if (file instanceof FileList && file.length === 1 && file[0].size > MAX_FILE_SIZE10) {
      form.setError('images', { message: 'image_size_exceeds_10mb_limit' })
    } else if (file instanceof FileList) {
      const validFiles = Array.from(file).filter(f => f.size <= MAX_FILE_SIZE10)
      const oversizedFiles = Array.from(file).filter(f => f.size > MAX_FILE_SIZE10)
      const dataTransfer = new DataTransfer()
      validFiles.forEach(validFile => dataTransfer.items.add(validFile))
      const filteredFileList = dataTransfer.files

      if (oversizedFiles.length > 0) {
        form.setError('images', { message: 'image_size_exceeds_10mb_limit' })
      } else {
        mutate(filteredFileList, {
          onSuccess: res => {
            if (res?.data) {
              if (Array.isArray(res.data) && res.data.length > 1) {
                res.data.forEach((img: MediaProps) => {
                  append({ image: img.key, url: img.url, isDelete: false })
                })
              } else {
                append({ image: res.data.key, url: res.data.url, isDelete: false })
              }
            }
            form.clearErrors('images')
          },
        })
      }
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files
    if (files?.length) {
      handleUploadFile(files)
    }
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files) {
      const files = e.dataTransfer.files
      handleUploadFile(files)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleChangeCheck = useCallback(
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const currentField = form.getValues(`images.${index}`)
      update(index, { ...currentField, isDelete: e.target.checked })
    },
    [form, update],
  )

  const handleDelete = () => {
    const images = form.getValues('images').filter(image => !image.isDelete)
    form.setValue('images', images)
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

  return (
    <div>
      <Stack>
        {fields.length === 0 &&
          (isLoading ? (
            <Skeleton
              variant='rounded'
              sx={{ width: '100%', height: '152px', borderRadius: '6px' }}
            />
          ) : (
            <div>
              <Stack
                component={'label'}
                htmlFor={HTML_FOR}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={theme => ({
                  gap: '10px',
                  p: '34px 0',
                  display: 'flex',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  border: `1px dashed ${theme.palette.allColors.GRAY790}`,
                })}
              >
                <Stack sx={theme => ({ 'svg path': { stroke: theme.palette.allColors.GRAY790 } })}>
                  <IconImageAdd width={28} height={28} />
                </Stack>
                <Stack gap='6px' alignItems='center'>
                  <Typography
                    variant='text20'
                    sx={theme => ({ color: theme.palette.allColors.BLACK190 })}
                  >
                    <Trans
                      i18nKey='drag_and_drop_your_images_or_videos_here_or_upload'
                      components={{
                        bold: (
                          <Typography
                            component='span'
                            variant='inherit'
                            sx={theme => ({
                              textDecorationLine: 'underline',
                              color: theme.palette.allColors.PURPLE,
                            })}
                          />
                        ),
                      }}
                    />
                  </Typography>
                  <Typography
                    variant='text20'
                    sx={theme => ({ color: theme.palette.allColors.GRAY790 })}
                  >
                    {t('1600_x_1200_43_is_recommended_each_up_to_10_mb')}
                  </Typography>
                </Stack>
                {!!errorMessage && (
                  <FormHelperText error={!!errorMessage}>{t(errorMessage)}</FormHelperText>
                )}
              </Stack>
            </div>
          ))}
      </Stack>
      {fields.length > 0 && (
        <>
          <Stack gap='16px'>
            {hasDelete.length > 0 ? (
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography>{t('count_files_selected', { count: hasDelete.length })}</Typography>
                <Button
                  variant='text'
                  size='extraSmall'
                  onClick={handleDelete}
                  sx={theme => ({ color: theme.palette.allColors.RED })}
                >
                  {t('delete')}
                </Button>
              </Stack>
            ) : (
              <Typography>{t('uploaded_files')}</Typography>
            )}
            {
              // @ts-ignore
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <HocDroppable droppableId='images' type='IMAGES' direction='horizontal'>
                  {provided => (
                    <Stack
                      gap='16px'
                      component='ul'
                      flexWrap='wrap'
                      direction='row'
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {fields.map((f, index) => (
                        // @ts-ignore
                        <Draggable key={f.id} index={index} draggableId={f.id}>
                          {provided => (
                            <Stack
                              component='li'
                              position='relative'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <img
                                src={`${f.url}`}
                                style={{
                                  width: '96px',
                                  height: '128px',
                                  borderRadius: '6px',
                                  objectFit: 'cover',
                                }}
                              />
                              <WrapImageContent sx={f.isDelete ? { opacity: 1 } : {}}>
                                <Stack m='-5px'>
                                  <Checkbox
                                    checked={f.isDelete}
                                    icon={<IconCheckboxFalseFill />}
                                    onChange={handleChangeCheck(index)}
                                    checkedIcon={<IconCheckboxTrueFill />}
                                  />
                                </Stack>
                                <Stack m='-5px' {...provided.dragHandleProps}>
                                  <IconButton>
                                    <IconDragAndDrop />
                                  </IconButton>
                                </Stack>
                              </WrapImageContent>
                            </Stack>
                          )}
                        </Draggable>
                      ))}
                      {isLoading ? (
                        <Skeleton
                          variant='rounded'
                          sx={{ width: '96px', height: '128px', borderRadius: '6px' }}
                        />
                      ) : (
                        <Stack
                          component='label'
                          htmlFor={HTML_FOR}
                          onDragOver={handleDragOver}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          sx={theme => ({
                            p: '34px 0',
                            width: '96px',
                            height: '128px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            border: `1px dashed ${theme.palette.allColors.GRAY790}`,
                            ':hover': {
                              backgroundColor: theme.palette.allColors.GRAY770,
                            },
                            transition: 'background-color 0.3s ease',
                          })}
                        >
                          <IconImageAdd width={46} height={46} />
                        </Stack>
                      )}
                    </Stack>
                  )}
                </HocDroppable>
              </DragDropContext>
            }
            <Stack gap='6px'>
              <Typography
                variant='text20'
                sx={theme => ({ color: theme.palette.allColors.BLACK190 })}
              >
                <Trans
                  i18nKey='drag_and_drop_your_images_or_videos_here_or_upload'
                  components={{
                    bold: (
                      <Typography
                        component='span'
                        variant='inherit'
                        sx={theme => ({
                          color: theme.palette.allColors.PURPLE,
                        })}
                      />
                    ),
                  }}
                />
              </Typography>
              <Typography
                variant='text20'
                sx={theme => ({ color: theme.palette.allColors.GRAY790 })}
              >
                {t('1600_x_1200_43_is_recommended_each_up_to_10_mb')}
              </Typography>
              {!!errorMessage && (
                <FormHelperText error={!!errorMessage}>{t(errorMessage)}</FormHelperText>
              )}
            </Stack>
          </Stack>
        </>
      )}

      <input
        multiple
        hidden
        type='file'
        id={HTML_FOR}
        ref={inputRef}
        accept={ACCEPT_IMAGES}
        onChange={handleOnChange}
      />
    </div>
  )
}
