import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Trans, useTranslation } from 'react-i18next'
import { type DragEvent, type ChangeEvent } from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import { type UploadImageProps } from '@/types/components'
import { Controller, type FieldValues } from 'react-hook-form'
import { ACCEPT_IMAGES, MAX_FILE_SIZE10 } from '@/constants/media'
import { useDragandDropListener } from '@/hooks/useDragandDropListener'
import { ReactComponent as IconGallery } from '@/assets/icons/gallery.svg'
import { ReactComponent as IconReplace } from '@/assets/icons/replace.svg'
import { Image, Label, Content, WrapImage, WrapIconReplace } from './style'
import { ReactComponent as IconFileDownloadUp } from '@/assets/icons/file-download-up.svg'

export const UploadImage = <T extends FieldValues>({
  name,
  size,
  control,
  variant,
}: UploadImageProps<T>) => {
  const { t } = useTranslation()
  const { drop, draggingValue } = useDragandDropListener()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => {
        const handleUpload = (file: File) => {
          if (file.size > MAX_FILE_SIZE10) {
            control.setError(name, { message: 'image_size_exceeds_10mb_limit' })
          } else {
            field.onChange(file)
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
          <>
            {field.value ? (
              <>
                <WrapImage
                  sx={{
                    maxWidth:
                      variant === 'banner' ? '100%' : variant === 'qr-code' ? '200px' : '144px',
                    maxHeight:
                      variant === 'banner' ? '225px' : variant === 'qr-code' ? '100px' : '144px',
                  }}
                >
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
                    padding: variant !== 'qr-code' ? '12px' : 0,
                    '& > svg:first-child *': {
                      stopColor: invalid ? theme.palette.allColors.RED10 : undefined,
                    },
                    maxHeight:
                      variant === 'banner' ? '225px' : variant === 'qr-code' ? '100px' : '144px',
                  })}
                >
                  <Content>
                    <Box>{variant === 'qr-code' ? <IconFileDownloadUp /> : <IconGallery />}</Box>
                    <Typography mb='5px' mt='11px' component='h5' variant='title20' align='center'>
                      <Trans
                        i18nKey={
                          variant === 'qr-code'
                            ? 'drag_your_logo_here_or_browse'
                            : 'drag_your_image_here_or_browse'
                        }
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
                    {variant !== 'qr-code' && (
                      <Typography variant='text' fontWeight='300' align='center'>
                        {size && <>{t('image_size', { value: size })}; </>}
                        {t('file_size_mb', { value: '10' })}
                      </Typography>
                    )}
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
          </>
        )
      }}
    />
  )
}
