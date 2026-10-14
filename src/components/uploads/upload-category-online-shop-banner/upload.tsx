import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useMedia } from '@/hooks/useMedia'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import { useProductStore } from '@/store/product'
import FormHelperText from '@mui/material/FormHelperText'
import type { SchemaTypeBannerPhoto } from '@/utils/schema'
import { Controller, useFormContext } from 'react-hook-form'
import { ACCEPT_IMAGES, MAX_FILE_SIZE } from '@/constants/media'
import { useRef, type ChangeEvent, type DragEvent } from 'react'
import { ReactComponent as IconReupload } from '@/assets/icons/reupload.svg'
import { ReactComponent as IconPlusFill } from '@/assets/icons/plus-fill.svg'

const HTML_FOR = 'upload-category-online-shop-banner'
const mediaBaseURL = import.meta.env.VITE_API_MEDIA_BASE_URL

export const UploadCategoryOnlineShopBanner = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeBannerPhoto>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { mutate, isLoading } = useMedia()
  const setUploadLoading = useProductStore(state => state.setUploadLoading)

  return (
    <Controller
      name='banner_photo'
      control={form.control}
      render={({ field, fieldState: { error, invalid } }) => {
        const handleUploadFile = (file: File) => {
          if (file.size > MAX_FILE_SIZE) {
            form.setError('banner_photo', { message: 'image_size_exceeds_4mb_limit' })
          } else {
            setUploadLoading(true)
            mutate(file, {
              onSuccess: res => {
                setUploadLoading(false)
                if (res?.data) {
                  field.onChange(res.data.key)
                  form.setValue('banner_photo_key', res.data.key)
                }
              },
              onError: () => {
                setUploadLoading(false)
              },
            })
          }
        }

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          if (e.target.files?.[0]) {
            const file = e.target.files[0]
            handleUploadFile(file)
          }
        }

        const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
          e.preventDefault()
          e.stopPropagation()
        }

        const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
          e.preventDefault()
          e.stopPropagation()
        }

        const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
          e.preventDefault()
          e.stopPropagation()
        }

        const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
          e.preventDefault()
          e.stopPropagation()

          if (e.dataTransfer.files?.[0]) {
            const file = e.dataTransfer.files[0]

            if (file.type.startsWith('image/')) {
              handleUploadFile(file)
            }
          }
        }

        return (
          <>
            {isLoading ? (
              <Skeleton
                variant='rounded'
                sx={{ width: '343px', height: '126px', borderRadius: '18px' }}
              />
            ) : field.value ? (
              <Stack width='fit-content' position='relative'>
                <Stack
                  component='img'
                  alt={HTML_FOR}
                  src={`${mediaBaseURL}${field.value}`}
                  sx={{ width: '343px', height: '126px', borderRadius: '18px', objectFit: 'cover' }}
                />
                <IconButton
                  radius='50%'
                  component='label'
                  htmlFor={HTML_FOR}
                  sx={{ top: '-14px', right: '-14px', position: 'absolute' }}
                >
                  <IconReupload />
                </IconButton>
                {invalid && (
                  <FormHelperText error={invalid}>{t(error?.message as string)}</FormHelperText>
                )}
              </Stack>
            ) : (
              <div>
                <Button
                  variant='text'
                  component='label'
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  htmlFor={HTML_FOR}
                  onDrop={handleDrop}
                  startIcon={<IconPlusFill />}
                >
                  {t('add_banner')}
                  {invalid && (
                    <FormHelperText error={invalid}>{t(error?.message as string)}</FormHelperText>
                  )}
                </Button>
              </div>
            )}
            <input
              hidden
              id={HTML_FOR}
              type='file'
              ref={inputRef}
              accept={ACCEPT_IMAGES}
              onChange={handleOnChange}
            />
          </>
        )
      }}
    />
  )
}
