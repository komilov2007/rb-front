import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import { useMemo, useState } from 'react'
import { Image } from '@/components/image'
import { stripHtml } from '@/utils/truncate'
import { useQuery } from '@tanstack/react-query'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import { useMarketingStore } from '@/store/marketing'
import type { ColumnDef } from '@tanstack/react-table'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getTelegramBotSettings } from '@/apis/admin/telegram-bot'
import type { TelegramPublicationsProps } from '@/types/marketing'
import { getPostChannels, getTelegramPublications } from '@/apis/admin/post'

export const usePage = () => {
  const [search, setSearch] = useState('')
  const setChannels = useMarketingStore(state => state.setChannels)
  const { can_edit, can_edit_post } = useProfileStore(state => ({
    can_edit: state.getPermission('telegram_bot', 'can_edit'),
    can_edit_post: state.getPermission('channel_mailing', 'can_edit'),
  }))

  const channels = useQuery({
    queryFn: getPostChannels,
    queryKey: [REACT_QUERY_KEYS.POST_CHANNELS],
    onSuccess: res => {
      setChannels(res.data)
    },
  })

  const {
    data = { data: [] },
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: getTelegramPublications,
    queryKey: [REACT_QUERY_KEYS.TELEGRAM_PUBLICATIONS],
  })

  const telegram = useQuery({
    queryKey: [REACT_QUERY_KEYS.TELEGRAM_BOT_SETTINGS],
    queryFn: getTelegramBotSettings,
  })

  const hasTelegram = telegram.data?.data?.username
  const channelsLength = channels.data?.data.length ?? 0

  const columns = useMemo<Array<ColumnDef<TelegramPublicationsProps>>>(() => {
    return [
      {
        header: 'post',
        accessorFn: row => row.content,
        cell: cell => {
          const text = cell.row.original.content
          return (
            <Box gap='14px' display='flex' alignItems='center'>
              <div>
                <Image
                  isGallery
                  alt={text}
                  radius='5px'
                  src={cell.row.original.photo}
                  sx={{ height: '37px', width: '42px' }}
                />
              </div>
              <Typography variant='inherit'>{stripHtml(text)}</Typography>
            </Box>
          )
        },
      },
      {
        header: 'button_title',
        accessorFn: row => row.button_title ?? '-',
        meta: {
          getCellContext: () => {
            return {
              sx: {
                minWidth: '150px',
                whiteSpace: 'nowrap',
              },
            }
          },
        },
      },
      {
        header: 'clicks',
        accessorFn: row => row.click_count,
        meta: {
          getCellContext: () => {
            return {
              sx: {
                minWidth: '100px',
              },
            }
          },
        },
      },
      {
        header: 'sent_date_time',
        accessorFn: row => dayjs(row.created_at).format('DD.MM.YYYY, HH:mm'),
        meta: {
          getCellContext: () => {
            return {
              sx: {
                minWidth: '200px',
              },
            }
          },
        },
      },
    ]
  }, [])

  return {
    data,
    search,
    columns,
    can_edit,
    telegram,
    channels,
    setSearch,
    isLoading,
    isFetching,
    hasTelegram,
    can_edit_post,
    channelsLength,
  }
}
