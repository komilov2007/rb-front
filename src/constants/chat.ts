import { PLATFORMS } from '@/constants/busniness'
import { type ChatPlatformsOptionsProps } from '@/types/chat'

export const CHAT_PLATFORMS: ChatPlatformsOptionsProps = {
  ALL: {
    value: 'ALL',
    label: 'all',
    title: 'all_chats',
  },
  ...(Object.values(PLATFORMS)
    .filter(
      p =>
        p.value !== 'YANDEX' &&
        p.value !== 'CLICK' &&
        p.value !== 'ZOOMRAD' &&
        p.value !== 'GORGONA',
    )
    .reduce((p, n) => ({ [n.value]: n, ...p }), {}) as Omit<ChatPlatformsOptionsProps, 'ALL'>),
}
