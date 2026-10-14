import { create } from '@/configs/zustand'
import { CHAT_PLATFORMS } from '@/constants/chat'
import type { PlatformsProps } from '@/types/busniness'
import type { SendJsonMessage } from 'react-use-websocket/dist/lib/types'
import type {
  MessageProps,
  ChatUserProps,
  ChatPlatformProps,
  ChatUserTypesProps,
} from '@/types/chat'

interface CurrentUserProps {
  page: number
  count: number
  photo?: string
  phone?: string
  hasMore: boolean
  username?: string
  firstname?: string
  messages: MessageProps[]
  platform: PlatformsProps[]
}

interface ChatStoreValuesProps {
  page: number
  count: number
  search: string
  hasMore: boolean
  users: ChatUserProps[]
  type: ChatUserTypesProps
  platform: ChatPlatformProps
  currenUser: CurrentUserProps
  isLoadingAdminMessage: boolean
}

interface ChatStateProps extends ChatStoreValuesProps {
  setResetValues: () => void
  setPage: (p: number) => void
  setSearch: (s: string) => void
  setHasMore: (h: boolean) => void
  handleUpdateCurrentUser: () => void
  setType: (t: ChatUserTypesProps) => void
  setPlatform: (p: ChatPlatformProps) => void
  setUsersCount: (u: ChatUserProps[]) => void
  setCurrentUser: (c: CurrentUserProps) => void
  sendJsonMessage: SendJsonMessage | (() => void)
  setUpdateUsers: (users: ChatUserProps[]) => void
  setSendJsonMessage: (sendJsonMessage: SendJsonMessage) => void
  setUsers: (u: { count: number; users: ChatUserProps[] }) => void
  setIsLoadingAdminMessage: (isLoadingAdminMessage: boolean) => void
}

const defaultCurrentUser: CurrentUserProps = {
  page: 1,
  count: 0,
  messages: [],
  hasMore: true,
  platform: [],
}

const defaultChatStore: ChatStoreValuesProps = {
  page: 1,
  users: [],
  count: 0,
  search: '',
  type: 'all',
  hasMore: true,
  isLoadingAdminMessage: false,
  currenUser: defaultCurrentUser,
  platform: CHAT_PLATFORMS.ALL.value,
}

export const useChatStore = create<ChatStateProps>((set, get) => ({
  ...defaultChatStore,
  setIsLoadingAdminMessage: isLoadingAdminMessage => {
    set({ isLoadingAdminMessage })
  },
  setResetValues: () => {
    set(defaultChatStore)
  },
  sendJsonMessage: () => {},
  setHasMore: hasMore => {
    set({ hasMore })
  },
  setPage: page => {
    set({ page })
  },
  setSearch: search => {
    set({ search, page: 1, users: [], hasMore: true })
  },
  setUpdateUsers: users => {
    set({ users })
  },
  setUsers: ({ count, users }) => {
    const newUsers = [...get().users, ...users]
    if (newUsers.length === count) {
      set({ count, users: newUsers, hasMore: false })
      return
    }
    set({ count, users: newUsers })
  },
  setUsersCount: users => {
    set({ users })
  },
  setType: type => {
    set({ type, page: 1, users: [], hasMore: true })
  },
  setPlatform: platform => {
    set({ platform, page: 1, users: [], search: '', type: 'all', hasMore: true })
  },
  setSendJsonMessage: sendJsonMessage => {
    set({ sendJsonMessage })
  },
  setCurrentUser: currenUser => {
    set({ currenUser })
  },
  handleUpdateCurrentUser: () => {
    set({ currenUser: defaultCurrentUser })
  },
}))
