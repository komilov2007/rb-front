import Stack from '@mui/material/Stack'
import { useMedia } from '@/hooks/useMedia'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Trans, useTranslation } from 'react-i18next'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller, useFormContext } from 'react-hook-form'
import { ACCEPT_IMAGES, MAX_FILE_SIZE } from '@/constants/media'
import { useRef, type ChangeEvent, type DragEvent } from 'react'
import { type SchemaTypeCategoryOnlineShop } from '@/utils/schema'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconReupload } from '@/assets/icons/reupload.svg'

const HTML_FOR = 'upload-category-online-shop-image'
const mediaBaseURL = import.meta.env.VITE_API_MEDIA_BASE_URL

export const UploadCategoryOnlineShopImage = () => {
  const { t } = useTranslation()
  const form = useFormContext<SchemaTypeCategoryOnlineShop>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { mutate, isLoading } = useMedia()

  return (
    <Controller
      name='photo'
      control={form.control}
      render={({ field, fieldState: { error, invalid } }) => {
        const handleUploadFile = (file: File) => {
          if (file.size > MAX_FILE_SIZE) {
            form.setError('photo', { message: 'image_size_exceeds_4mb_limit' })
          } else {
            mutate(file, {
              onSuccess: res => {
                if (res?.data) {
                  field.onChange(res.data.key)
                  form.setValue('photo_key', res.data.key)
                }
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
                sx={{ width: '56px', height: '56px', borderRadius: '16px' }}
              />
            ) : field.value ? (
              <Stack>
                <Stack width='fit-content' position='relative'>
                  <Stack
                    component='img'
                    alt={HTML_FOR}
                    src={`${mediaBaseURL}${field.value}`}
                    sx={{ width: '56px', height: '56px', borderRadius: '16px' }}
                  />
                  <IconButton
                    radius='50%'
                    component='label'
                    htmlFor={HTML_FOR}
                    sx={{ top: '-14px', right: '-14px', position: 'absolute' }}
                  >
                    <IconReupload />
                  </IconButton>
                </Stack>
                {invalid && (
                  <FormHelperText error={invalid}>{t(error?.message as string)}</FormHelperText>
                )}
              </Stack>
            ) : (
              <div>
                <Stack
                  component='label'
                  htmlFor={HTML_FOR}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  sx={theme => ({
                    gap: '10px',
                    p: '34px 0',
                    display: 'flex',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: `1px dashed ${theme.palette.allColors.GRAY790}`,
                  })}
                >
                  <Stack
                    sx={theme => ({ 'svg path': { stroke: theme.palette.allColors.GRAY790 } })}
                  >
                    <IconPlus />
                  </Stack>
                  <Stack gap='6px' alignItems='center' px='8px'>
                    <Typography
                      variant='text20'
                      sx={theme => ({ color: theme.palette.allColors.BLACK190 })}
                    >
                      <Trans
                        i18nKey='drag_or_upload_the_image_here'
                        components={{
                          bold: (
                            <Typography
                              component='span'
                              variant='inherit'
                              sx={theme => ({
                                textDecorationLine: 'underline',
                                color: theme.palette.allColors.PURPLE,
                              })}
                            />
                          ),
                        }}
                      />
                    </Typography>
                    <Typography
                      variant='text20'
                      sx={theme => ({ color: theme.palette.allColors.GRAY790 })}
                    >
                      {t('56px_x_56px_is_recommended_file_size_up_to_4_mb')}
                    </Typography>
                  </Stack>
                </Stack>
                {invalid && (
                  <FormHelperText error={invalid}>{t(error?.message as string)}</FormHelperText>
                )}
              </div>
            )}
            <input
              hidden
              type='file'
              id={HTML_FOR}
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
