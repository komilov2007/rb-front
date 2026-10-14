import { useRef, useEffect } from 'react'
import { useChatStore } from '@/store/chat'
import { useQuery } from '@tanstack/react-query'
import { geChatUsers } from '@/apis/admin/chat'
import { useDebounce } from '@/hooks/useDebounce'
import { getPaginationOffset } from '@/utils/pagination'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { CHAT_PLATFORMS } from '@/constants/chat'

const LIMIT = 10

export const useUsers = () => {
  const scrollContainerRef = useRef<HTMLUListElement | null>(null)
  const { type, page, count, users, search, hasMore, platform, setPage, setUsers, setHasMore } =
    useChatStore(state => ({
      page: state.page,
      type: state.type,
      count: state.count,
      users: state.users,
      search: state.search,
      hasMore: state.hasMore,
      setPage: state.setPage,
      platform: state.platform,
      setUsers: state.setUsers,
      setHasMore: state.setHasMore,
    }))
  const searchDebounce = useDebounce(search)

  const { isLoading, isFetching } = useQuery({
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.CHAT_USERS_LIST, page, type, platform, searchDebounce],
    queryFn: async () =>
      await geChatUsers({
        platform:
          type === 'instagram'
            ? CHAT_PLATFORMS.INSTAGRAM.value
            : platform === 'ALL'
              ? undefined
              : platform,
        limit: LIMIT,
        search: searchDebounce,
        is_new: type === 'unread',
        offset: getPaginationOffset({ page, limit: LIMIT }),
        type: type === 'review' ? 'REVIEW' : undefined,
      }),
    onSuccess: res => {
      setUsers({ count: res.data.count, users: res.data.results })
    },
  })

  const handleNext = () => {
    if (!isFetching && !isLoading) {
      if (count > users.length) {
        setPage(page + 1)
      } else {
        setHasMore(false)
      }
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }

  useEffect(() => {
    handleScroll()
    return () => {
      handleScroll()
    }
  }, [searchDebounce])

  return { type, users, hasMore, handleNext, scrollContainerRef }
}
