import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import { useMedia } from '@/hooks/useMedia'
import Skeleton from '@mui/material/Skeleton'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { Trans, useTranslation } from 'react-i18next'
import FormHelperText from '@mui/material/FormHelperText'
import { useRef, type ChangeEvent, type DragEvent } from 'react'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { type UploadOnlineShopImageProps } from '@/types/components'
import { ReactComponent as IconDots } from '@/assets/icons/white-dots.svg'
import { ReactComponent as IconReupload } from '@/assets/icons/reupload.svg'
import { ACCEPT_IMAGES, ACCEPT_VIDEOS, MAX_FILE_SIZE10, VIDEO } from '@/constants/media'
import { Controller, type FieldValues, type Path, type PathValue } from 'react-hook-form'

const mediaBaseURL = import.meta.env.VITE_API_MEDIA_BASE_URL

export const UploadBannerOnlineShopImage = <T extends FieldValues>({
  variant,
  name,
  control,
  htmlFor,
  setValue,
  textSize,
  hasVideo,
}: UploadOnlineShopImageProps<T>) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { mutate, isLoading } = useMedia()
  const bannerMenu = useBoolean()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => {
        const isAllowedFile = (file: File) => {
          if (file.type.startsWith('image/')) return true
          if (hasVideo && file.type.startsWith('video/')) return true
          return false
        }

        const handleUploadFile = (file: File) => {
          const forbiddenExt = /\.(svg|ico|avif|html|htm)$/i
          const doubleExtAttack = /\.(php|jsp|jspx|asp|aspx|cgi|phtml|shtml)\.\w+$/i

          if (
            !isAllowedFile(file) ||
            forbiddenExt.test(file.name) ||
            doubleExtAttack.test(file.name)
          ) {
            const messageKey = hasVideo
              ? 'only_image_and_video_files_allowed'
              : 'only_image_files_allowed'
            toast.warning(t(messageKey))
            control.setError(name, { message: messageKey })
            return
          }

          if (file.size > MAX_FILE_SIZE10) {
            control.setError(name, { message: 'image_size_exceeds_10mb_limit' })
          } else {
            mutate(file, {
              onSuccess: res => {
                if (res?.data) {
                  field.onChange(res.data.key)
                }
                bannerMenu.setFalse()
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
                sx={{ width: '343px', height: '126px', borderRadius: '16px' }}
              />
            ) : field.value ? (
              <Stack>
                <Stack width='fit-content' position='relative'>
                  {VIDEO.some(ext => field.value?.endsWith(`.${ext}`)) ? (
                    <Stack
                      component='video'
                      src={`${mediaBaseURL}${field.value}`}
                      autoPlay
                      loop
                      muted
                      sx={{
                        width: '343px',
                        height: '126px',
                        borderRadius: '16px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Stack
                      component='img'
                      alt={htmlFor}
                      src={`${mediaBaseURL}${field.value}`}
                      sx={{
                        width: '343px',
                        height: '126px',
                        borderRadius: '16px',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                  {variant === 'mobile' ? (
                    <IconButton
                      radius='50%'
                      component='label'
                      htmlFor={htmlFor}
                      sx={{ top: '-14px', right: '-14px', position: 'absolute' }}
                    >
                      <IconReupload />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        radius='50%'
                        onClick={bannerMenu.toggle}
                        sx={{
                          width: 30,
                          height: 30,
                          top: '-14px',
                          right: '-14px',
                          position: 'absolute',
                          border: theme => `1px solid ${theme.palette.allColors.WHITE}`,
                          backgroundColor: theme => theme.palette.allColors.PURPLE,
                          '&:hover': {
                            backgroundColor: theme => theme.palette.allColors.PURPLE,
                          },
                        }}
                      >
                        <IconDots width={20} height={20} fill='#ffffff' color='#ffffff' />
                      </IconButton>
                      {bannerMenu.value && (
                        <Stack
                          sx={{
                            borderRadius: '12px',
                            top: '20px',
                            right: '-14px',
                            position: 'absolute',
                            backgroundColor: 'white',
                            boxShadow: 3,
                          }}
                        >
                          <LoadingButton
                            size='small'
                            sx={{ fontSize: 12 }}
                            component='label'
                            htmlFor={htmlFor}
                          >
                            {t('edit')}
                          </LoadingButton>
                          <LoadingButton
                            size='small'
                            onClick={() => {
                              if (setValue) {
                                setValue(name as Path<T>, '' as PathValue<T, Path<T>>, {
                                  shouldValidate: true,
                                })
                              }
                              bannerMenu.setFalse()
                            }}
                            sx={{ fontSize: 12 }}
                            variant='filled-red'
                          >
                            {t('delete')}
                          </LoadingButton>
                        </Stack>
                      )}
                    </>
                  )}
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
                    <IconPlus />
                  </Stack>
                  <Stack alignItems='center'>
                    <Typography
                      variant='text20'
                      sx={theme => ({ color: theme.palette.allColors.BLACK190 })}
                    >
                      <Trans
                        i18nKey={
                          hasVideo
                            ? 'drag_or_upload_the_image_or_video_here'
                            : 'drag_or_upload_the_image_here'
                        }
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
                      {t(hasVideo ? 'image_and_video_formats' : 'image_formats')}
                    </Typography>
                    <Typography
                      variant='text20'
                      sx={theme => ({ color: theme.palette.allColors.GRAY790 })}
                    >
                      {t(textSize)}
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
              onChange={handleOnChange}
              accept={hasVideo ? `${ACCEPT_IMAGES},${ACCEPT_VIDEOS}` : ACCEPT_IMAGES}
            />
          </>
        )
      }}
    />
  )
}
