import { toast } from 'react-toastify'
import { Delete } from '../delete'
import { getUser } from '@/utils/user'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Image } from '@/components/image'
import { useTranslation } from 'react-i18next'
import { getCategoryName } from '../categories'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { HocDroppable } from '@/hocs/hoc-droppable'
import { useMutation } from '@tanstack/react-query'
import { ACCEPT_IMAGES } from '@/constants/media'
import { validateAtmosphereFile } from '../../constants'
import { reorder, useAtmosphereCache } from '../../useAtmosphereCache'
import { Cards, StyledChip, Wrapper, WrapperHeader } from '../../style'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconDragAndDrop } from '@/assets/icons/drag.svg'
import { DragDropContext, Draggable, type DropResult } from 'react-beautiful-dnd'
import type { AtmosphereCategoryProps, AtmosphereImageProps } from '@/types/atmosphere'
import {
  deleteAtmosphereImage,
  createAtmosphereImages,
  changeAtmosphereImagePosition,
} from '@/apis/admin/atmosphere'

interface ImagesProps {
  canEdit: boolean
  canDelete: boolean
  selected: number | null
  images: AtmosphereImageProps[]
  categories: AtmosphereCategoryProps[]
  onSelect: (id: number | null) => void
}

const ACTION_BUTTON_SX = {
  width: '32px',
  height: '32px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
}

export const Images = ({
  images,
  canEdit,
  onSelect,
  selected,
  canDelete,
  categories,
}: ImagesProps) => {
  const user = getUser()
  const { t } = useTranslation()
  const { update, invalidate } = useAtmosphereCache()
  const language = useProfileStore(state => state.language)

  const upload = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData()
      formData.append('shop', String(user.shop))
      if (selected) {
        formData.append('category', String(selected))
      }
      files.forEach(file => {
        formData.append('images', file)
      })
      return await createAtmosphereImages(formData)
    },
    onSuccess: async () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      await invalidate()
    },
  })

  const position = useMutation({
    mutationFn: async ({ id, above }: { id: number; above: number | null }) =>
      await changeAtmosphereImagePosition(id, above),
    onSettled: invalidate,
  })

  const handleUpload = (fileList: FileList | null) => {
    const files = Array.from(fileList ?? [])
    if (files.length === 0) return
    const errors = new Set<string>()
    const validFiles = files.filter(file => {
      const error = validateAtmosphereFile(file)
      if (error) errors.add(error)
      return !error
    })
    errors.forEach(error => {
      toast.error(t(error))
    })
    if (validFiles.length > 0) {
      upload.mutate(validFiles)
    }
  }

  const handleOnDragEnd = ({ source, destination }: DropResult) => {
    if (!destination || source.index === destination.index) return
    const { newList, moved, above } = reorder(images, source.index, destination.index)
    update(data =>
      selected
        ? {
            ...data,
            categories: data.categories.map(c =>
              c.id === selected ? { ...c, images: newList } : c,
            ),
          }
        : { ...data, images: newList },
    )
    position.mutate({ id: moved.id, above })
  }

  const filters = [
    { id: null, name: t('atmosphere_without_category') },
    ...categories.map(c => ({ id: c.id, name: getCategoryName(c, language) })),
  ]

  return (
    <Wrapper>
      <WrapperHeader>
        <Stack gap='6px' direction='row' alignItems='center'>
          <Typography variant='title30' component='h3'>
            {t('atmosphere_gallery')}
          </Typography>
          <StyledChip>{images.length}</StyledChip>
        </Stack>
        {canEdit && (
          <>
            <LoadingButton
              size='small'
              component='label'
              variant='contained'
              startIcon={<IconPlus />}
              loading={upload.isLoading}
              htmlFor='upload_atmosphere_images'
              sx={theme => ({
                svg: {
                  path: {
                    stroke: theme.palette.allColors.WHITE,
                  },
                },
              })}
            >
              {t('atmosphere_upload_images')}
            </LoadingButton>
            <input
              hidden
              multiple
              type='file'
              accept={ACCEPT_IMAGES}
              id='upload_atmosphere_images'
              onChange={e => {
                handleUpload(e.target.files)
                e.target.value = ''
              }}
            />
          </>
        )}
      </WrapperHeader>
      <Stack p='18px' gap='18px'>
        <Stack gap='8px' direction='row' flexWrap='wrap'>
          {filters.map(f => (
            <Button
              key={f.id ?? 'none'}
              size='small'
              variant={selected === f.id ? 'contained' : 'outlined-transparent'}
              onClick={() => {
                onSelect(f.id)
              }}
            >
              {f.name}
            </Button>
          ))}
        </Stack>
        {images.length === 0 ? (
          <Typography variant='text' align='center' py='24px'>
            {t('atmosphere_no_images')}
          </Typography>
        ) : (
          // @ts-ignore
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <HocDroppable
              direction='horizontal'
              type='ATMOSPHERE_IMAGES'
              droppableId={`atmosphere-images-${selected ?? 'none'}`}
            >
              {provided => (
                <Cards ref={provided.innerRef} {...provided.droppableProps}>
                  {images.map((image, index) => (
                    // @ts-ignore
                    <Draggable
                      key={image.id}
                      index={index}
                      isDragDisabled={!canEdit}
                      draggableId={String(image.id)}
                    >
                      {provided => (
                        <Stack
                          component='li'
                          position='relative'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{ width: '180px', height: '180px' }}
                        >
                          <Image
                            radius='12px'
                            src={image.image}
                            alt={image.created_at}
                            sx={{ height: '180px', img: { objectFit: 'cover !important' } }}
                          />
                          <Stack
                            p='8px'
                            top={0}
                            left={0}
                            right={0}
                            direction='row'
                            position='absolute'
                            justifyContent='space-between'
                          >
                            {canEdit ? (
                              // @ts-ignore
                              <Stack {...provided.dragHandleProps}>
                                <IconButton radius='8px' sx={ACTION_BUTTON_SX}>
                                  <IconDragAndDrop />
                                </IconButton>
                              </Stack>
                            ) : (
                              <span />
                            )}
                            <Stack gap='6px' direction='row'>
                              {canDelete && (
                                <Delete
                                  size='32px'
                                  title='atmosphere_delete_image'
                                  onDelete={async () => await deleteAtmosphereImage(image.id)}
                                />
                              )}
                            </Stack>
                          </Stack>
                        </Stack>
                      )}
                    </Draggable>
                  ))}
                </Cards>
              )}
            </HocDroppable>
          </DragDropContext>
        )}
      </Stack>
    </Wrapper>
  )
}
