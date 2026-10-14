import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useMedia } from '@/hooks/useMedia'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Trans, useTranslation } from 'react-i18next'
import { type DragEvent, type ChangeEvent } from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller, useFormContext } from 'react-hook-form'
import type { SchemaTypeTelegramPost } from '@/utils/schema'
import { ACCEPT_IMAGES, MAX_FILE_SIZE10 } from '@/constants/media'
import { useDragandDropListener } from '@/hooks/useDragandDropListener'
import { ReactComponent as IconGallery } from '@/assets/icons/gallery.svg'
import { ReactComponent as IconReplace } from '@/assets/icons/replace.svg'
import { Image, Label, Content, WrapImage, WrapIconReplace } from './style'

export const UploadTelegramPost = () => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useMedia()
  const form = useFormContext<SchemaTypeTelegramPost>()
  const { drop, draggingValue } = useDragandDropListener()

  return (
    <Controller
      name='photo'
      control={form.control}
      render={({ field, fieldState: { error, invalid } }) => {
        const handleUpload = (file: File) => {
          if (file.size > MAX_FILE_SIZE10) {
            form.setError('photo', { message: 'image_size_exceeds_10mb_limit' })
          } else {
            mutate(file, {
              onSuccess: res => {
                form.clearErrors()
                if (res?.data) {
                  field.onChange(res.data.url)
                }
              },
            })
          }
        }

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          if (e.target.files?.[0]) {
            const file = e.target.files[0]
            handleUpload(file)
          }
        }

        const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
          e.preventDefault()
          e.stopPropagation()
          if (e.dataTransfer.files?.[0]) {
            const file = e.dataTransfer.files[0]
            handleUpload(file)
          }
        }

        return (
          <Stack>
            {isLoading ? (
              <Skeleton
                variant='rounded'
                sx={{ width: '144px', height: '144px', borderRadius: '9px' }}
              />
            ) : field.value ? (
              <>
                <WrapImage>
                  <WrapIconReplace>
                    <IconButton sx={{ p: '4px' }} component='label' htmlFor={`upload_${name}`}>
                      <IconReplace />
                    </IconButton>
                  </WrapIconReplace>
                  <Image
                    src={
                      typeof field.value === 'string'
                        ? field.value
                        : URL.createObjectURL(field.value)
                    }
                  />
                </WrapImage>
                <FormHelperText error={invalid}>{t(error?.message as string)}</FormHelperText>
              </>
            ) : (
              <>
                <Label
                  ref={drop}
                  onDrop={handleDrop}
                  dragging={draggingValue}
                  htmlFor={`upload_${name}`}
                  sx={theme => ({
                    padding: '12px',
                    '& > svg:first-child *': {
                      stopColor: invalid ? theme.palette.allColors.RED10 : undefined,
                    },
                    maxHeight: '144px',
                  })}
                >
                  <Content>
                    <Box>
                      <IconGallery />
                    </Box>
                    <Typography mb='5px' mt='11px' component='h5' variant='title20' align='center'>
                      <Trans
                        i18nKey={'drag_your_image_here_or_browse'}
                        components={{
                          linkTag: (
                            <Typography
                              component='span'
                              variant='inherit'
                              fontWeight='500'
                              color={theme => theme.palette.allColors.PURPLE}
                            />
                          ),
                        }}
                      />
                    </Typography>
                    <Typography variant='text' fontWeight='300' align='center'>
                      {t('image_size', { value: '10MB' })}
                    </Typography>
                  </Content>
                </Label>
                <FormHelperText error={invalid}>{t(error?.message as string)}</FormHelperText>
              </>
            )}
            <input
              hidden
              type='file'
              id={`upload_${name}`}
              accept={ACCEPT_IMAGES}
              onChange={handleOnChange}
            />
          </Stack>
        )
      }}
    />
  )
}
