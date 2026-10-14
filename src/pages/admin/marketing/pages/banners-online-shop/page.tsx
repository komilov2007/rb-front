import Box from '@mui/material/Box'
import { Skeleton } from './skeleton'
import Stack from '@mui/material/Stack'
import { useBanner } from './useBanner'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Cards, StyledChip } from './style'
import { ROUTER } from '@/constants/router'
import { Card } from './components/card/card'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { HocDroppable } from '@/hocs/hoc-droppable'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Draggable, DragDropContext } from 'react-beautiful-dnd'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconEmpty } from '@/assets/icons/empty.svg'

const Page = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    can_edit,
    catBanner,
    mainBanner,
    catLoading,
    can_delete,
    mainLoading,
    isDataEmpty,
    subscription,
    handleOnDragEnd,
    handleSubscription,
  } = useBanner()

  const CreateFormButton = () => {
    return (mainBanner.data.length === 1 && subscription?.tariff === 'START') ||
      (mainBanner.data.length === 5 && subscription?.tariff === 'BASIC') ? (
      <Button
        onClick={handleSubscription}
        startIcon={<IconPlus />}
        sx={theme => ({
          svg: {
            path: {
              stroke: theme.palette.allColors.WHITE,
            },
          },
        })}
      >
        {t('add_banner')}
      </Button>
    ) : (
      <Button
        component={Link}
        startIcon={<IconPlus />}
        to={`${ROUTER.ADMIN}/${ROUTER.MARKETING}/${ROUTER.BANNERS}/${ROUTER.CREATE}`}
        sx={theme => ({
          svg: {
            path: {
              stroke: theme.palette.allColors.WHITE,
            },
          },
        })}
      >
        {t('add_banner')}
      </Button>
    )
  }

  return (
    <Stack p='20px' height='100%' overflow='auto'>
      <Stack mb={mainBanner?.data.length ? '56px' : '0px'}>
        {mainLoading ? (
          <Skeleton size='medium' />
        ) : (
          <>
            {mainBanner?.data.length && mainBanner?.data.length > 0 ? (
              <Stack mb='16px' direction='row' alignItems='center' justifyContent='space-between'>
                <Stack gap='6px' direction='row' alignItems='center'>
                  <Typography variant='title30' component='h3'>
                    {t('main_banner')}
                  </Typography>
                  <StyledChip>{mainBanner?.data.length}</StyledChip>
                </Stack>
                {can_edit && <CreateFormButton />}
              </Stack>
            ) : null}
            {
              // @ts-ignore
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <HocDroppable
                  droppableId='banners'
                  type='BANNERS'
                  direction={mobile ? 'vertical' : 'horizontal'}
                >
                  {provided => (
                    <Cards ref={provided.innerRef} {...provided.droppableProps}>
                      {mainBanner?.data.map((banner, index) => (
                        // @ts-ignore
                        <Draggable key={banner.id} index={index} draggableId={String(banner.id)}>
                          {provided => (
                            <Card
                              // @ts-ignore
                              provided={provided}
                              type='MAIN'
                              size='medium'
                              banner={banner}
                              canDelete={can_delete}
                              canEdit={can_edit}
                            />
                          )}
                        </Draggable>
                      ))}
                    </Cards>
                  )}
                </HocDroppable>
              </DragDropContext>
            }
          </>
        )}
      </Stack>

      {isDataEmpty && (
        <Stack p='20px' height='100%'>
          <Box display='flex' height='100%' width='100%' flexGrow={1} alignItems='center'>
            <Stack alignItems='center' width='100%'>
              <Stack mb='68px'>
                <IconEmpty />
              </Stack>
              <Typography align='center' width={'60%'} mb='27px' variant='title30' fontWeight='700'>
                {t('you_have_not_added_a_banner_yet')}
              </Typography>
              {can_edit && <CreateFormButton />}
            </Stack>
          </Box>
        </Stack>
      )}

      <Stack>
        {catLoading ? (
          <Skeleton size='small' />
        ) : (
          <>
            {catBanner?.data.length && catBanner?.data.length > 0 ? (
              <Stack mb='16px' direction='row' alignItems='center' justifyContent='space-between'>
                <Stack gap='6px' direction='row' alignItems='center'>
                  <Typography variant='title30' component='h3'>
                    {t('category_banner')}
                  </Typography>
                  <StyledChip>{catBanner?.data.length}</StyledChip>
                </Stack>
                {mainBanner?.data.length === 0 && can_edit && <CreateFormButton />}
              </Stack>
            ) : null}

            <Cards>
              {catBanner?.data.map((banner, index) => (
                <Card
                  key={banner.id}
                  type='CATEGORY'
                  size='small'
                  banner={banner}
                  canDelete={can_delete}
                  canEdit={can_edit}
                />
              ))}
            </Cards>
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default Page
