import { NOTIFICATIONS } from './constants'
import { ROUTER } from '@/constants/router'
import { useNavigate } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { useState, type MouseEvent } from 'react'
import { useProfileStore } from '@/store/profile'
import { getPaginationOffset } from '@/utils/pagination'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { type NotificationProps } from '@/types/notifications'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getNotifications, notificationRead, notificationReadAll } from '@/apis/admin/notifications'

const LIMIT = 10

export const useNotification = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()
  const [results, setResults] = useState<NotificationProps[]>([])
  const { value: hasMore, setFalse: setHasMoreFalse, setTrue: setHasMoreTrue } = useBoolean(true)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const notification = useProfileStore(state => state.notificationCount?.notification)

  const open = Boolean(anchorEl)
  const id = open ? 'notification-popover' : undefined

  const {
    data = { data: { results: [], count: 0 } },
    isLoading,
    isFetching,
  } = useQuery({
    enabled: open,
    queryFn: async () =>
      await getNotifications({
        limit: LIMIT,
        offset: getPaginationOffset({ page, limit: LIMIT }),
      }),
    queryKey: [REACT_QUERY_KEYS.NOTIFICATION_LIST, page],
    onSuccess: res => {
      if (res.data.count === 0) {
        setHasMoreFalse()
      }
      const newResults = [...results, ...res.data.results]
      setResults(newResults)
    },
  })

  const { mutate } = useMutation({
    mutationFn: notificationRead,
  })

  const { mutate: mutateReadAll, isLoading: isLoadingReadAll } = useMutation({
    mutationFn: notificationReadAll,
    onSuccess: () => {
      const newResults = results.map(c => ({ ...c, read: true }))
      setResults(newResults)
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.NOTIFICATION_COUNT])
    },
  })

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setPage(1)
    setResults([])
    setHasMoreTrue()
    setAnchorEl(null)
  }

  const handleNext = () => {
    if (!isFetching && !isLoading) {
      if (data.data.count > results.length) {
        setPage(page + 1)
      } else {
        setHasMoreFalse()
      }
    }
  }

  const handleRead = (notification: NotificationProps) => () => {
    setAnchorEl(null)
    if (notification.data.type === NOTIFICATIONS.CHAT.type) {
      navigate(`${ROUTER.ADMIN}/${ROUTER.CHAT}/${notification.data.customer}`)
    }
    if (!notification.read) {
      mutate(notification.id, {
        onSuccess: () => {
          const newContent = results.map(r => (r.id === notification.id ? { ...r, read: true } : r))
          setResults(newContent)
        },
      })
    }
  }

  const handleReadAll = () => {
    mutateReadAll()
  }

  return {
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
  }
}
