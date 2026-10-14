import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import { useMedia } from '@/hooks/useMedia'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Trans, useTranslation } from 'react-i18next'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller, useFormContext } from 'react-hook-form'
import { useRef, type ChangeEvent, type DragEvent } from 'react'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'
import { ACCEPT_VIDEOS, MAX_FILE_SIZE10 } from '@/constants/media'
import { ReactComponent as IconVideoUpload } from '@/assets/icons/video-upload.svg'
import { ReactComponent as IconReupload } from '@/assets/icons/reupload.svg'
import { ReactComponent as IconTrashOutline } from '@/assets/icons/trash-outline.svg'

const mediaBaseURL = import.meta.env.VITE_API_MEDIA_BASE_URL
const htmlFor = 'upload-product-video'

export const UploadProductVideo = () => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useMedia()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useFormContext<SchemaTypeProductOnlineShop>()

  const handleDelete = () => {
    form.setValue('video', null)
  }

  return (
    <Controller
      name='video'
      control={form.control}
      render={({ field, fieldState: { error, invalid } }) => {
        const isAllowedFile = (file: File) => {
          const allowedExts = /\.(mp4|webm)$/i
          if (!allowedExts.test(file.name)) return false
          if (!file.type.startsWith('video/') || file.type === 'video/avif') return false
          return true
        }

        const handleUploadFile = (file: File) => {
          const doubleExtAttack = /\.(php|jsp|jspx|asp|aspx|cgi|phtml|shtml)\.\w+$/i

          if (!isAllowedFile(file) || doubleExtAttack.test(file.name)) {
            const messageKey = 'only_video_files_allowed'

            toast.warning(t(messageKey))
            form.control.setError('video', { message: messageKey })
            return
          }

          if (file.size > MAX_FILE_SIZE10) {
            form.control.setError('video', { message: 'video_size_exceeds_10mb_limit' })
          } else {
            mutate(file, {
              onSuccess: res => {
                if (res?.data) {
                  field.onChange(res.data.key)
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
            handleUploadFile(file)
          }
        }

        return (
          <>
            {isLoading ? (
              <Skeleton
                variant='rounded'
                sx={{ width: '200px', height: '128px', borderRadius: '6px' }}
              />
            ) : field.value ? (
              <Stack>
                <Stack width='fit-content' position='relative'>
                  <Stack
                    controls={true}
                    component='video'
                    src={`${mediaBaseURL}${field.value}`}
                    loop
                    muted
                    sx={{
                      width: '200px',
                      height: '128px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    radius='50%'
                    component='label'
                    htmlFor={htmlFor}
                    sx={{ top: '-14px', left: '-14px', position: 'absolute' }}
                  >
                    <IconReupload width={28} height={28} />
                  </IconButton>
                  <IconButton
                    radius='50%'
                    onClick={handleDelete}
                    sx={{
                      p: '4px',
                      top: '-14px',
                      right: '-14px',
                      position: 'absolute',
                      background: theme => theme.palette.allColors.RED,
                      ':hover': {
                        background: theme => theme.palette.allColors.RED,
                      },
                      path: {
                        fill: theme => theme.palette.allColors.WHITE,
                      },
                    }}
                  >
                    <IconTrashOutline width={20} height={20} />
                  </IconButton>
                </Stack>
              </Stack>
            ) : (
              <div>
                <Stack
                  component='label'
                  htmlFor={htmlFor}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
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
                    <IconVideoUpload width={28} height={28} />
                  </Stack>
                  <Stack alignItems='center'>
                    <Typography
                      variant='text20'
                      sx={theme => ({ color: theme.palette.allColors.BLACK190 })}
                    >
                      <Trans
                        i18nKey='drag_or_upload_video_here'
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
                      {t('video_formats_webm_mp4')}
                    </Typography>
                    <Typography
                      variant='text20'
                      sx={theme => ({ color: theme.palette.allColors.GRAY790 })}
                    >
                      {t('file_size_must_be_less_than_10_mb')}
                    </Typography>
                    {invalid && (
                      <FormHelperText sx={{ textAlign: 'center' }} error={invalid}>
                        {t(error?.message as string)}
                      </FormHelperText>
                    )}
                  </Stack>
                </Stack>
              </div>
            )}
            <input
              hidden
              type='file'
              id={htmlFor}
              ref={inputRef}
              accept={ACCEPT_VIDEOS}
              onChange={handleOnChange}
            />
          </>
        )
      }}
    />
  )
}
