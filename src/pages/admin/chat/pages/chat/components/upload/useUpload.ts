import { getUser } from '@/utils/user'
import { useChatStore } from '@/store/chat'
import { sendFile } from '@/apis/admin/chat'
import { useParams } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'
import { type ParamProps } from '@/types/params'
import { useForm, useWatch } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { type EmojiClickData } from 'emoji-picker-react'
import { mixed, object, number, string, type InferType } from 'yup'
import { useRef, type Ref, type ChangeEvent, type FormEvent } from 'react'

const schema = object().shape({
  file: mixed().test('required', 'you_need_to_provide_a_file', file => {
    if (file) return true
    return false
  }),
  cursor: number().required().default(0),
  message: string()
    .notRequired()
    .nonNullable()
    .matches(/^(?!\s+$).*/, 'This field cannot contain only blankspaces')
    .default(''),
})

export type SchemaType = InferType<typeof schema>

export const useUpload = () => {
  const user = getUser()
  const { chatId } = useParams<ParamProps>()
  const refInput = useRef<HTMLInputElement | null>(null)
  const inputRef: Ref<HTMLTextAreaElement> = useRef(null)

  const {
    value: modalValue,
    setTrue: setModalValueTrue,
    setFalse: setModalValueFalse,
  } = useBoolean()
  const { value, toggle } = useBoolean(false, {
    onToggle: () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
  })
  const { currenUser, sendJsonMessage } = useChatStore(state => ({
    currenUser: state.currenUser,
    sendJsonMessage: state.sendJsonMessage,
  }))

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}),
  })
  const hasError = Object.keys(form.formState.errors).length > 0
  const file = useWatch({ name: 'file', control: form.control }) as File
  const url = file ? URL.createObjectURL(file) : ''

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => {
      const formData = new FormData()
      formData.append('file', data.file as File)
      if (data.message) formData.append('message', data.message)
      formData.append('platform', 'TELEGRAM')
      formData.append('customer', String(chatId))
      formData.append('is_bot', String(true))
      return await sendFile(formData)
    },
    onSuccess: (res, context) => {
      sendJsonMessage({
        type: 'CHAT',
        data: {
          chat_created: true,
          customer: Number(chatId),
          message: context.message,
          platform: currenUser.platform,
          shop: user.shop,
          is_bot: true,
          file: res.data.file,
        },
      })
      setModalValueFalse()
      form.reset(schema.cast({}))
    },
  })

  const handleSubmit = (data: SchemaType) => {
    const message = data.message.trimEnd().trimStart()
    mutate({ ...data, message })
  }

  const onSubmit = (e: FormEvent<HTMLElement>) => {
    e.stopPropagation()
    e.preventDefault()
    void form.handleSubmit(handleSubmit)(e)
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setModalValueTrue()
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      form.setValue('file', file)
    }
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
    url,
    file,
    form,
    value,
    toggle,
    inputRef,
    hasError,
    refInput,
    onSubmit,
    isLoading,
    modalValue,
    handleUpload,
    handleChange,
    setModalValueFalse,
  }
}
