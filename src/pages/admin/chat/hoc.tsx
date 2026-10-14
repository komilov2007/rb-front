import dayjs from 'dayjs'
import { useState } from 'react'
import Box from '@mui/material/Box'
import { getUser } from '@/utils/user'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { type HocProps } from '@/types/hoc'
import { useChatStore } from '@/store/chat'
import { useParams } from 'react-router-dom'
import useWebSocket from 'react-use-websocket'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useFormContext } from 'react-hook-form'
import { type ParamProps } from '@/types/params'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { type SchemaTypeChat } from '@/utils/schema'
import { useQueryClient } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { ReactComponent as IconError } from '@/assets/icons/error.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import type { MessageProps, ChatUserProps, ChatMessageReturnProps } from '@/types/chat'

const socketBaseURL = import.meta.env.VITE_API_SOCKET_BASE_URL

const prioritizeUser = (users: ChatUserProps[], data: ChatMessageReturnProps) => {
  const newUser = {
    chat: {
      last_chat: data.customer_detail.last_chat,
      new_chats_count: data.customer_detail.new_chats_count,
    },
    firstname: data.customer_detail.firstname,
    id: data.customer_detail.id,
    last_chat_time: data.customer_detail.last_chat_time,
    photo: data.customer_detail.photo,
  }

  const newUsers = users.map(u => (u.id === Number(data.data.customer) ? newUser : u))

  const index = newUsers.findIndex(user => user.id === Number(data.data.customer))
  if (index !== -1) {
    const user = newUsers.splice(index, 1)[0]
    newUsers.unshift(user)
    return newUsers
  } else {
    return [newUser, ...newUsers]
  }
}

export const Hoc = ({ children }: HocProps) => {
  const user = getUser()
  const modal = useBoolean()
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const params = useParams<ParamProps>()
  const queryClient = useQueryClient()
  const form = useFormContext<SchemaTypeChat>()
  const {
    users,
    currenUser,
    setResetValues,
    setUpdateUsers,
    setCurrentUser,
    setSendJsonMessage,
    setIsLoadingAdminMessage,
  } = useChatStore(state => ({
    users: state.users,
    setUsers: state.setUsers,
    currenUser: state.currenUser,
    setUpdateUsers: state.setUpdateUsers,
    setCurrentUser: state.setCurrentUser,
    setResetValues: state.setResetValues,
    setSendJsonMessage: state.setSendJsonMessage,
    setIsLoadingAdminMessage: state.setIsLoadingAdminMessage,
  }))

  const { sendJsonMessage } = useWebSocket(`${socketBaseURL}${user.shop}`, {
    onOpen: () => {
      setSendJsonMessage(sendJsonMessage)
    },
    onClose: () => {
      setResetValues()
    },
    onMessage: e => {
      const data: ChatMessageReturnProps = JSON.parse(e.data)
      if (data.customer_detail.code === '071') {
        modal.setTrue()
        setError(data.customer_detail.message)
      } else {
        if (data.type === 'CHAT') {
          if (Number(Object.values(params)[0]) === Number(data.data.customer)) {
            form.reset({})
            const messages = [
              {
                file: data.data.file,
                text: data.data.message,
                is_bot: data.data.is_bot,
                platform: data.data.platform,
                id: dayjs().valueOf(),
                shop: data.data.shop,
                botuser: data.data.customer,
                is_hidden: data.data.is_hidden,
              },
              ...currenUser.messages,
            ] as MessageProps[]
            setCurrentUser({ ...currenUser, messages })
            setIsLoadingAdminMessage(false)

            const scrollableMessagesDiv = document.getElementById('scrollableMessagesDiv')
            if (scrollableMessagesDiv) {
              scrollableMessagesDiv.scrollTop = 0
            }
          }

          void queryClient.invalidateQueries([REACT_QUERY_KEYS.NOTIFICATION_COUNT])
          const newUsers = prioritizeUser(users, data)
          setUpdateUsers(newUsers)
        }
      }
    },
    /**
     * A phone backgrounds constantly (app switch, call, screen lock) and iOS
     * WKWebView tears the socket down each time. With reconnect disabled the
     * socket died permanently on the first cycle and onClose wiped
     * sendJsonMessage from the store, leaving chat silently broken.
     */
    shouldReconnect: () => true,
    reconnectAttempts: 20,
    reconnectInterval: attempt => Math.min(1000 * 2 ** attempt, 30000),
  })

  return (
    <>
      {children}
      <Dialog scroll='body' open={modal.value} onClose={modal.setFalse}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={modal.setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack gap='30px' mb='57px' p='0 78px' maxWidth='551px' alignItems='center'>
          <Stack alignItems='center'>
            <IconError />
          </Stack>
          <Typography variant='title30' component='h3' fontWeight='600' align='center'>
            {error}
          </Typography>
          <Box
            width='100%'
            display='flex'
            maxWidth='150px'
            alignItems='center'
            justifyContent='center'
          >
            <Button fullWidth size='small' variant='contained' onClick={modal.setFalse}>
              {t('close')}
            </Button>
          </Box>
        </Stack>
      </Dialog>
    </>
  )
}
