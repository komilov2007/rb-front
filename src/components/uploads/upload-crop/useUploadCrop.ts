import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { uploadShopLogo } from '@/apis/admin/shop'
import { useMutation } from '@tanstack/react-query'
import { canvasPreview } from '@/utils/canvas-preview'
import { type UploadCropVariant } from '@/types/components'
import { useDebounceEffect } from '@/hooks/useDebounceEffect'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDragandDropListener } from '@/hooks/useDragandDropListener'
import { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const getAspect = (variant: UploadCropVariant) => (variant === 'logo' ? 16 / 9 : 1)

function centerLogoCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

function centerAvatarCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  const size = Math.floor(Math.min(mediaWidth, mediaHeight) * 0.9)
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: size,
        height: size,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export const useUploadCrop = (variant: UploadCropVariant) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const blobUrlRef = useRef('')
  const previewUrlRef = useRef('')
  const aspect = getAspect(variant)
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      setImgSrc('')
      setCompletedCrop(undefined)
      if (inputRef?.current?.value) {
        inputRef.current.value = ''
      }
    },
  })
  const [imgSrc, setImgSrc] = useState('')
  const [previewSrc, setPreviewSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const { drop, draggingValue } = useDragandDropListener()
  const hasCrop = !!completedCrop?.width && !!completedCrop?.height

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  const setPreviewValue = useCallback((value: unknown) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = ''
    }
    if (!value) {
      setPreviewSrc('')
      return
    }
    if (typeof value === 'string') {
      setPreviewSrc(value)
      return
    }
    if (value instanceof File) {
      previewUrlRef.current = URL.createObjectURL(value)
      setPreviewSrc(previewUrlRef.current)
    }
  }, [])

  const onSelectFile = (file: File) => {
    setCrop(undefined)
    setCompletedCrop(undefined)
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }
    blobUrlRef.current = URL.createObjectURL(file)
    setImgSrc(blobUrlRef.current)
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspect) {
      const { width, height } = e.currentTarget
      if (variant === 'logo') {
        setCrop(centerLogoCrop(width, height, aspect))
      } else {
        const newCrop = centerAvatarCrop(width, height, aspect)
        setCrop(newCrop)
        setCompletedCrop(newCrop)
      }
    }
  }

  useDebounceEffect(
    async () => {
      if (hasCrop && completedCrop && imgRef.current && previewCanvasRef.current) {
        void canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop)
      }
    },
    100,
    [completedCrop],
  )

  const { mutate, isLoading } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('logo', file)
      return await uploadShopLogo(formData)
    },
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const canvasToFile = async (canvas: HTMLCanvasElement) => {
    const blob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(resolve, 'image/png')
    })
    if (!blob) {
      throw new Error('Failed to create cropped image')
    }
    return new File([blob], `${dayjs().valueOf()}.png`, { type: 'image/png' })
  }

  /**
   * Renders the current crop into an off-screen canvas instead of reading the
   * debounced preview canvas, so saving right after a crop change cannot export
   * a stale (or not yet drawn) image.
   */
  const getCroppedFile = async () => {
    if (!imgRef.current || !completedCrop || !hasCrop) {
      return null
    }
    const canvas = document.createElement('canvas')
    await canvasPreview(imgRef.current, canvas, completedCrop)
    return await canvasToFile(canvas)
  }

  return {
    crop,
    drop,
    value,
    aspect,
    imgSrc,
    hasCrop,
    previewSrc,
    mutate,
    imgRef,
    setTrue,
    setCrop,
    inputRef,
    setFalse,
    isLoading,
    onImageLoad,
    onSelectFile,
    getCroppedFile,
    setPreviewValue,
    draggingValue,
    completedCrop,
    setCompletedCrop,
    previewCanvasRef,
  }
}
