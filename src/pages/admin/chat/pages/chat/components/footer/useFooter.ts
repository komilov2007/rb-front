import { getUser } from '@/utils/user'
import { useRef, type Ref } from 'react'
import { useChatStore } from '@/store/chat'
import { useParams } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { useFormContext } from 'react-hook-form'
import { type ParamProps } from '@/types/params'
import { type SchemaTypeChat } from '@/utils/schema'
import { type EmojiClickData } from 'emoji-picker-react'

export const useFooter = () => {
  const user = getUser()
  const form = useFormContext<SchemaTypeChat>()
  const { chatId } = useParams<ParamProps>()
  const inputRef: Ref<HTMLTextAreaElement> = useRef(null)
  const { currenUser, sendJsonMessage, isLoadingAdminMessage, setIsLoadingAdminMessage } =
    useChatStore(state => ({
      currenUser: state.currenUser,
      sendJsonMessage: state.sendJsonMessage,
      isLoadingAdminMessage: state.isLoadingAdminMessage,
      setIsLoadingAdminMessage: state.setIsLoadingAdminMessage,
    }))

  const { value, toggle } = useBoolean(false, {
    onToggle: () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
  })

  const hasError = Object.keys(form.formState.errors).length > 0

  const onSubmit = (data: SchemaTypeChat) => {
    const message = data.message.trimEnd().trimStart()
    sendJsonMessage({
      type: 'CHAT',
      data: {
        message,
        customer: Number(chatId),
        platform: currenUser.platform.includes('INSTAGRAM') ? 'INSTAGRAM' : 'TELEGRAM',
        shop: user.shop,
        is_bot: true,
      },
    })
    setIsLoadingAdminMessage(true)
  }

  const handleChange = (data: EmojiClickData) => {
    if (inputRef?.current) {
      const textRef = inputRef.current
      const value = form.getValues('message')
      textRef.focus()
      const start = value.substring(0, textRef.selectionStart)
      const end = value.substring(textRef.selectionStart)
      const text = start + data.emoji + end
      form.setValue('message', text)
      form.setValue('cursor', start.length + data.emoji.length)
    }
  }

  return {
    form,
    value,
    toggle,
    inputRef,
    hasError,
    onSubmit,
    handleChange,
    isLoadingAdminMessage,
  }
}
