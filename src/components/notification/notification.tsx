import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import { NOTIFICATIONS } from './constants'
import { Card, Cards, Header } from './style'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { useNotification } from './useNotification'
import relativeTime from 'dayjs/plugin/relativeTime'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ReactComponent as IconNotification } from '@/assets/icons/notification.svg'
import { useTranslation } from 'react-i18next'

dayjs.extend(relativeTime)

const loader = (
  <Stack>
    {Array.from({ length: 5 }).map((_, i) => (
      <Stack
        key={i}
        px='22px'
        gap='10px'
        component='li'
        direction='row'
        minHeight='72px'
        alignItems='center'
      >
        <Skeleton
          width='36px'
          height='36px'
          variant='rounded'
          sx={{ borderRadius: '6px !important' }}
        />
        <Stack gap='9px' flexGrow={1}>
          <Skeleton width='100%' height={12} variant='rounded' sx={{ borderRadius: 10 }} />
          <Skeleton height={12} width='134px' variant='rounded' sx={{ borderRadius: 10 }} />
        </Stack>
      </Stack>
    ))}
  </Stack>
)

export const Notification = () => {
  const { t } = useTranslation()
  const {
    id,
    open,
    results,
    hasMore,
    anchorEl,
    isLoading,
    isFetching,
    handleNext,
    handleRead,
    handleClick,
    handleClose,
    notification,
    handleReadAll,
    isLoadingReadAll,
  } = useNotification()

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        sx={theme => ({
          p: 0,
          'svg circle:last-child': {
            fill: notification === 0 ? theme.palette.allColors.GRAY30 : undefined,
          },
        })}
      >
        <IconNotification />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          zIndex: 200000,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: theme => ({
              mt: '13px',
              minWidth: '400px',
              overflow: 'visible',
              borderRadius: '12px',
              background: theme.palette.colors['L-WHITE-D-GRAY40'],
              border: `1px solid ${theme.palette.allColors.GRAY70}`,
              boxShadow: `0px 2px 30px 0px ${theme.palette.allColors.GRAY80}`,
              '&:before': {
                top: 0,
                right: 10,
                width: 15,
                height: 15,
                content: '""',
                display: 'block',
                position: 'absolute',
                backgroundColor: 'inherit',
                transform: 'translateY(-50%) rotate(45deg)',
                borderTop: `1px solid ${theme.palette.allColors.GRAY70}`,
                borderLeft: `1px solid ${theme.palette.allColors.GRAY70}`,
                boxShadow: `0px 2px 30px 0px ${theme.palette.allColors.GRAY80}`,
              },
            }),
          },
        }}
      >
        <Header>
          <Typography variant='title10' component='h3'>
            {t('notifications')}
          </Typography>
          <LoadingButton loading={isLoadingReadAll} onClick={handleReadAll}>
            {t('mark_all_as_read')}
          </LoadingButton>
        </Header>
        <Cards id='scrollableNotificationDiv'>
          <InfiniteScroll
            loader={loader}
            next={handleNext}
            hasMore={hasMore}
            dataLength={results.length}
            scrollableTarget='scrollableNotificationDiv'
            style={{ display: 'flex', flexDirection: 'column' }}
            endMessage={
              isLoading || isFetching
                ? loader
                : results.length === 0 && (
                    <Stack height='300px' alignItems='center'>
                      <Typography mt='25px' variant='title20'>
                        There is no notification
                      </Typography>
                    </Stack>
                  )
            }
          >
            {results.map(n => {
              const Icon = NOTIFICATIONS[n.data.type].Icon
              return (
                <Card
                  key={n.id}
                  onClick={handleRead(n)}
                  sx={theme => ({
                    background: n.read
                      ? theme.palette.allColors.WHITE
                      : theme.palette.allColors.PURPLE30,
                  })}
                >
                  <Avatar
                    variant='rounded'
                    sx={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      svg: {
                        path: {
                          stroke: 'white',
                        },
                      },
                    }}
                  >
                    <Icon />
                  </Avatar>
                  <Stack gap='2px'>
                    <Typography>{t(NOTIFICATIONS[n.data.type].text)}</Typography>
                    <Typography>{dayjs(n.created_at).fromNow()}</Typography>
                  </Stack>
                </Card>
              )
            })}
          </InfiniteScroll>
        </Cards>
      </Popover>
    </>
  )
}
