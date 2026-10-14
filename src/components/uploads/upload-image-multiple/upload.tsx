import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { ACCEPT_IMAGES } from '@/constants/media'
import { Trans, useTranslation } from 'react-i18next'
import FormHelperText from '@mui/material/FormHelperText'
import { type SchemaTypeProductImages } from '@/utils/schema'
import { useRef, type DragEvent, type ChangeEvent } from 'react'
import { useDragandDropListener } from '@/hooks/useDragandDropListener'
import { ReactComponent as IconGallery } from '@/assets/icons/gallery.svg'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { ReactComponent as IconImageAdd } from '@/assets/icons/image-add.svg'
import { ReactComponent as IconRemoveCircle } from '@/assets/icons/remove-circle.svg'
import { ReactComponent as IconUploadRectangleSmall } from '@/assets/icons/upload-rectangle-small.svg'
import {
  Image,
  Label,
  Content,
  WrapImage,
  WrapImages,
  SmallLabel,
  WrapImageAdd,
  WrapIconDelete,
} from './style'

export const UploadImageMultiple = () => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useFormContext<SchemaTypeProductImages>()
  const { drop, draggingValue } = useDragandDropListener()
  const { fields, append, remove } = useFieldArray({ name: 'images', control: form.control })

  const handleUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      append({ image: file })
    })
    if (inputRef?.current?.value) {
      inputRef.current.value = ''
    }
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files?.[0]) {
      const files = e.target.files
      handleUpload(files)
    }
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files?.[0]) {
      const files = e.dataTransfer.files
      handleUpload(files)
    }
  }

  const handleRemove = (index: number) => () => {
    remove(index)
  }

  return (
    <>
      {fields.length === 0 && (
        <Controller
          name='images'
          control={form.control}
          render={({ fieldState: { error, invalid } }) => {
            return (
              <>
                <div>
                  <Label
                    ref={drop}
                    htmlFor='upload'
                    dragging={draggingValue}
                    onDrop={handleDrop}
                    sx={theme => ({
                      '& > svg:first-child *': {
                        stopColor: invalid ? theme.palette.allColors.RED10 : undefined,
                      },
                    })}
                  >
                    <Content>
                      <Box>
                        <IconGallery />
                      </Box>
                      <Typography
                        mb='5px'
                        mt='11px'
                        component='h5'
                        align='center'
                        variant='title20'
                      >
                        <Trans
                          i18nKey='drag_your_image_here_or_browse'
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
                        {t('image_size', { value: '240:320' })} ; {t('file_size_mb', { value: 10 })}
                      </Typography>
                    </Content>
                  </Label>
                </div>
                <FormHelperText error={invalid}>{t(error?.message as string)}</FormHelperText>
              </>
            )
          }}
        />
      )}
      {fields.length > 0 && (
        <Typography mb='20px' variant='title20' fontWeight='500' component='h4'>
          {t('uploaded_images')}
        </Typography>
      )}
      <WrapImages>
        {fields.map((item, index) => (
          <WrapImage key={item.id}>
            <WrapIconDelete>
              <IconButton sx={{ p: '4px' }} onClick={handleRemove(index)}>
                <IconRemoveCircle />
              </IconButton>
            </WrapIconDelete>
            <Image
              src={
                typeof item.image === 'string'
                  ? item.image
                  : URL.createObjectURL(item.image as MediaSource)
              }
            />
          </WrapImage>
        ))}
        {fields.length > 0 && (
          <WrapImage>
            <SmallLabel ref={drop} htmlFor='upload' dragging={draggingValue} onDrop={handleDrop}>
              <WrapImageAdd>
                <IconImageAdd />
              </WrapImageAdd>
              <IconUploadRectangleSmall />
            </SmallLabel>
          </WrapImage>
        )}
      </WrapImages>
      <input
        hidden
        multiple
        type='file'
        id='upload'
        name='images'
        ref={inputRef}
        accept={ACCEPT_IMAGES}
        onChange={handleOnChange}
      />
    </>
  )
}
