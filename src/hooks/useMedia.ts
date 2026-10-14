import { getSize } from '@/utils/media'
import { uploadMedia, uploadMedias } from '@/apis/media'
import { useMutation } from '@tanstack/react-query'
import { useRef, useState, useCallback } from 'react'

export const useMedia = () => {
  const [url, setUrl] = useState('')
  const [type, setType] = useState('')
  const [size, setSize] = useState('')
  const [percent, setPercent] = useState(0)
  const [fileName, setFileName] = useState('')
  const [uploadedSize, setUploadedSize] = useState('0')
  const abortControllerRef = useRef<AbortController | null>(null)

  const { reset, mutate, isLoading } = useMutation({
    mutationFn: async (data: File | FileList) => {
      abortControllerRef.current = new AbortController()

      if (data instanceof FileList && data.length > 1) {
        const formData = new FormData()

        Array.from(data).forEach(file => {
          formData.append('files', file)
        })
        return await uploadMedias<FormData>(formData)
      } else if ((data instanceof FileList && data.length === 1) || data instanceof File) {
        const file = data instanceof FileList ? data[0] : data

        const size = getSize(file.size)
        const fileuUrl = URL.createObjectURL(file)
        const type = file.name.split('.').at(-1) as string
        setUrl(fileuUrl)
        setFileName(file.name)
        setType(type)
        setSize(size)
        const formData = new FormData()
        formData.append('file', file)
        return await uploadMedia<FormData>(formData)
      }
    },
  })

  const cancelUpload = useCallback(() => {
    abortControllerRef.current?.abort()
    reset()
    setPercent(0)
    setUrl('')
    setType('')
    setSize('')
    setFileName('')
    setUploadedSize('')
  }, [reset, setPercent])

  return {
    url,
    type,
    size,
    reset,
    mutate,
    percent,
    fileName,
    isLoading,
    cancelUpload,
    uploadedSize,
  }
}
