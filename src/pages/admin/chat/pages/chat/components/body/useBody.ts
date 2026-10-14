import { useRef } from 'react'
import { useChatStore } from '@/store/chat'
import { useParams } from 'react-router-dom'
import { type ParamProps } from '@/types/params'
import { getUserMessages } from '@/apis/admin/chat'
import { getPaginationOffset } from '@/utils/pagination'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const LIMIT = 20

export const useBody = () => {
  const queryClient = useQueryClient()
  const { chatId } = useParams<ParamProps>()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const { users, currenUser, setCurrentUser, setUsersCount } = useChatStore(state => ({
    users: state.users,
    currenUser: state.currenUser,
    setUsersCount: state.setUsersCount,
    setCurrentUser: state.setCurrentUser,
  }))

  const { isLoading, isFetching } = useQuery({
    queryKey: [REACT_QUERY_KEYS.CHAT_USER_MESSAGES_LIST, chatId, currenUser.page],
    queryFn: async () =>
      await getUserMessages(
        { limit: LIMIT, offset: getPaginationOffset({ limit: LIMIT, page: currenUser.page }) },
        chatId,
      ),
    onSuccess: res => {
      const messages = [...currenUser.messages, ...res.data.results]
      setCurrentUser({
        ...currenUser,
        messages,
        count: res.data.count,
        hasMore: messages.length !== res.data.count,
      })

      const newUsers = users.map(u =>
        u.id === Number(chatId) ? { ...u, chat: { ...u.chat, new_chats_count: 0 } } : u,
      )
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.NOTIFICATION_COUNT])
      setUsersCount(newUsers)
    },
  })

  const handleNext = () => {
    if (!isFetching && !isLoading) {
      if (currenUser.count > currenUser.messages.length) {
        setCurrentUser({ ...currenUser, page: currenUser.page + 1 })
      } else {
        setCurrentUser({ ...currenUser, hasMore: false })
      }
    }
  }

  return { currenUser, handleNext, scrollContainerRef }
}
