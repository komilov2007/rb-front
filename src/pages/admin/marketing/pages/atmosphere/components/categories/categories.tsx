import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Delete } from '../delete'
import { FormCategory } from '../form-category'
import { Image } from '@/components/image'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { HocDroppable } from '@/hocs/hoc-droppable'
import { useMutation } from '@tanstack/react-query'
import useMediaQuery from '@mui/material/useMediaQuery'
import { type AtmosphereCategoryProps } from '@/types/atmosphere'
import { reorder, useAtmosphereCache } from '../../useAtmosphereCache'
import { Cards, StyledChip, Wrapper, WrapperHeader } from '../../style'
import { ReactComponent as IconDragAndDrop } from '@/assets/icons/drag.svg'
import { ReactComponent as IconGallery } from '@/assets/icons/gallery.svg'
import { DragDropContext, Draggable, type DropResult } from 'react-beautiful-dnd'
import { deleteAtmosphereCategory, changeAtmosphereCategoryPosition } from '@/apis/admin/atmosphere'

interface CategoriesProps {
  canEdit: boolean
  canDelete: boolean
  selected: number | null
  categories: AtmosphereCategoryProps[]
  onSelect: (id: number | null) => void
}

export const getCategoryName = (category: AtmosphereCategoryProps, language: string) =>
  category[`name_${language}` as 'name_uz'] ||
  category.name_uz ||
  category.name_ru ||
  category.name_en ||
  category.name_tr

export const Categories = ({
  canEdit,
  onSelect,
  selected,
  canDelete,
  categories,
}: CategoriesProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { update, invalidate } = useAtmosphereCache()
  const language = useProfileStore(state => state.language)
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { mutate } = useMutation({
    mutationFn: async ({ id, above }: { id: number; above: number | null }) =>
      await changeAtmosphereCategoryPosition(id, above),
    onSettled: invalidate,
  })

  const handleOnDragEnd = ({ source, destination }: DropResult) => {
    if (!destination || source.index === destination.index) return
    const { newList, moved, above } = reorder(categories, source.index, destination.index)
    update(data => ({ ...data, categories: newList }))
    mutate({ id: moved.id, above })
  }

  return (
    <Wrapper>
      <WrapperHeader>
        <Stack gap='6px' direction='row' alignItems='center'>
          <Typography variant='title30' component='h3'>
            {t('atmosphere_categories')}
          </Typography>
          <StyledChip>{categories.length}</StyledChip>
        </Stack>
        {canEdit && (
          <FormCategory
            variant='add'
            onSuccess={category => {
              onSelect(category.id)
            }}
          />
        )}
      </WrapperHeader>
      <Stack p='18px'>
        {categories.length === 0 ? (
          <Typography variant='text' align='center' py='24px'>
            {t('atmosphere_no_categories')}
          </Typography>
        ) : (
          // @ts-ignore
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <HocDroppable
              type='ATMOSPHERE_CATEGORIES'
              droppableId='atmosphere-categories'
              direction={mobile ? 'vertical' : 'horizontal'}
            >
              {provided => (
                <Cards ref={provided.innerRef} {...provided.droppableProps}>
                  {categories.map((category, index) => (
                    // @ts-ignore
                    <Draggable
                      key={category.id}
                      index={index}
                      isDragDisabled={!canEdit}
                      draggableId={String(category.id)}
                    >
                      {provided => (
                        <Stack
                          component='li'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          onClick={() => {
                            onSelect(category.id)
                          }}
                          sx={theme => ({
                            p: '12px',
                            gap: '12px',
                            cursor: 'pointer',
                            borderRadius: '12px',
                            width: mobile ? '100%' : '220px',
                            backgroundColor: theme.palette.allColors.GRAY50,
                            border: `1px solid ${
                              selected === category.id
                                ? theme.palette.allColors.GREEN
                                : theme.palette.allColors.GRAY10
                            }`,
                          })}
                        >
                          {category.image ? (
                            <Image
                              radius='10px'
                              src={category.image}
                              alt={getCategoryName(category, language)}
                              sx={{ height: '120px', img: { objectFit: 'cover !important' } }}
                            />
                          ) : (
                            <Box
                              height='120px'
                              display='flex'
                              borderRadius='10px'
                              alignItems='center'
                              justifyContent='center'
                              sx={theme => ({ backgroundColor: theme.palette.allColors.GRAY10 })}
                            >
                              <IconGallery />
                            </Box>
                          )}
                          <Stack>
                            <Typography variant='title40' fontSize='15px' noWrap>
                              {getCategoryName(category, language)}
                            </Typography>
                            <Typography
                              variant='text'
                              fontSize='13px'
                              sx={theme => ({ color: theme.palette.allColors.GRAY840 })}
                            >
                              {t('atmosphere_images_count', { value: category.images.length })}
                            </Typography>
                          </Stack>
                          {(canEdit || canDelete) && (
                            <Stack
                              direction='row'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Stack gap='8px' direction='row' alignItems='center'>
                                {canDelete && (
                                  <Delete
                                    title='atmosphere_delete_category'
                                    onDelete={async () =>
                                      await deleteAtmosphereCategory(category.id)
                                    }
                                  />
                                )}
                                {canEdit && <FormCategory variant='edit' category={category} />}
                              </Stack>
                              {canEdit && (
                                // @ts-ignore
                                <Stack {...provided.dragHandleProps}>
                                  <IconButton
                                    radius='8px'
                                    sx={{
                                      width: '37px',
                                      height: '37px',
                                      border: theme =>
                                        `1px solid ${theme.palette.allColors.GRAY850}`,
                                      backgroundColor: theme => theme.palette.allColors.WHITE,
                                    }}
                                  >
                                    <IconDragAndDrop />
                                  </IconButton>
                                </Stack>
                              )}
                            </Stack>
                          )}
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
