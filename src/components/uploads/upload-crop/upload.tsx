import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import ReactCrop from 'react-image-crop'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { Alert } from '@/components/alert'
import 'react-image-crop/dist/ReactCrop.css'
import { Trans, useTranslation } from 'react-i18next'
import { useUploadCrop } from './useUploadCrop'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import FormHelperText from '@mui/material/FormHelperText'
import { type UploadCropProps } from '@/types/components'
import { getDomainLogo } from '@/constants/domain-themes'
import { ACCEPT_IMAGES, MAX_FILE_SIZE10 } from '@/constants/media'
import { useEffect, useId, useState, type DragEvent, type ChangeEvent } from 'react'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconGallery } from '@/assets/icons/gallery.svg'
import { ReactComponent as IconReplace } from '@/assets/icons/replace.svg'
import { ReactComponent as IconIphoneShop } from '@/assets/icons/iphone-shop.svg'
import { ReactComponent as IconReplacePen } from '@/assets/icons/replace-pen.svg'
import {
  Controller,
  type Path,
  type FieldValues,
  type ControllerFieldState,
  type ControllerRenderProps,
} from 'react-hook-form'
import {
  Image,
  Label,
  Content,
  WrapImage,
  WrapAvatar,
  AvatarLabel,
  CropImage,
  PreviewCanvas,
  WrapCrop,
  WrapPreview,
  WrapIconIphone,
  WrapIconReplace,
  WrapMobileImage,
  AvatarIconReplace,
  WrapLogoCropPreview,
} from './style'

const FORBIDDEN_EXTENSIONS = /\.(svg|ico|avif|html|htm)$/i
const DOUBLE_EXTENSIONS = /\.(php|jsp|jspx|asp|aspx|cgi|phtml|shtml)\.\w+$/i

const isAllowedFile = (file: File) =>
  file.type.startsWith('image/') &&
  !FORBIDDEN_EXTENSIONS.test(file.name) &&
  !DOUBLE_EXTENSIONS.test(file.name)

export const UploadCrop = <T extends FieldValues>(props: UploadCropProps<T>) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <UploadCropField {...props} field={field} fieldState={fieldState} />
      )}
    />
  )
}

interface UploadCropFieldProps<T extends FieldValues> extends UploadCropProps<T> {
  field: ControllerRenderProps<T, Path<T>>
  fieldState: ControllerFieldState
}
const UploadCropField = <T extends FieldValues>({
  field,
  fieldState,
  variant,
  hasInstruction,
}: UploadCropFieldProps<T>) => {
  const { t } = useTranslation()
  const inputId = useId()
  const { IconLogo } = getDomainLogo()
  const [fileError, setFileError] = useState('')
  const {
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
    setCompletedCrop,
    previewCanvasRef,
  } = useUploadCrop(variant)
  const isLogo = variant === 'logo'
  const errorMessage = fileError || fieldState.error?.message
  const renderErrorText = (mt?: string) =>
    errorMessage ? (
      <FormHelperText error sx={mt ? { mt } : undefined}>
        {t(errorMessage)}
      </FormHelperText>
    ) : null

  useEffect(() => {
    if (!isLogo) {
      setPreviewValue(field.value)
    }
  }, [isLogo, field.value, setPreviewValue])
  const handleUpload = (file: File) => {
    setFileError('')
    const message = !isAllowedFile(file)
      ? 'only_image_files_allowed'
      : file.size > MAX_FILE_SIZE10
        ? 'image_size_exceeds_10mb_limit'
        : ''
    if (message) {
      setFileError(message)
      toast.warning(t(message))
      return
    }
    onSelectFile(file)
    setTrue()
  }
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleUpload(e.target.files[0])
      e.target.value = ''
    }
  }
  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files?.[0]) {
      handleUpload(e.dataTransfer.files[0])
    }
  }
  const handleSave = async () => {
    try {
      const file = await getCroppedFile()
      if (!file) {
        return
      }
      if (isLogo) {
        mutate(file, {
          onSuccess: res => {
            setFalse()
            field.onChange(res.data.logo)
          },
        })
        return
      }
      field.onChange(file)
      setFalse()
    } catch {
      toast.error(t('some_error_occurred_please_try_again'))
    }
  }
  return (
    <>
      {isLogo ? (
        <Stack mb='20px'>
          {field.value ? (
            <WrapImage>
              <WrapIconReplace>
                <IconButton sx={{ p: '4px' }} component='label' htmlFor={inputId}>
                  <IconReplace />
                </IconButton>
              </WrapIconReplace>
              <Image src={field.value} />
            </WrapImage>
          ) : (
            <Label ref={drop} htmlFor={inputId} dragging={draggingValue} onDrop={handleDrop}>
              <Content>
                <IconGallery />
                <Typography mb='5px' mt='11px' component='h5' variant='title20'>
                  <Trans
                    i18nKey='drag_your_logo_here_or_browse'
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
                  {t('file_size_mb', { value: '10' })}
                </Typography>
              </Content>
            </Label>
          )}
          {renderErrorText()}
        </Stack>
      ) : (
        <Stack width='fit-content'>
          <WrapAvatar>
            <AvatarLabel ref={drop} htmlFor={inputId} dragging={draggingValue} onDrop={handleDrop}>
              <Avatar alt='Logo' src={previewSrc} sx={{ width: '76px', height: '76px' }} />
            </AvatarLabel>
            <AvatarIconReplace>
              <IconButton sx={{ p: '4px' }} component='label' htmlFor={inputId}>
                <IconReplacePen />
              </IconButton>
            </AvatarIconReplace>
          </WrapAvatar>
          {renderErrorText('20px')}
        </Stack>
      )}
      <input
        hidden
        id={inputId}
        type='file'
        ref={inputRef}
        accept={ACCEPT_IMAGES}
        onChange={handleOnChange}
      />
      <Dialog fullWidth scroll='body' open={value} onClose={setFalse}>
        <Stack p='20px' direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='title30' component='h3' fontWeight='700' align='left'>
            {t('select_the_area_you_want')}
          </Typography>
          <IconButton onClick={setFalse} sx={{ m: '-4.5px -9px 0 0' }}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack gap={isLogo ? '14px' : '24px'} p='0 20px 20px'>
          {isLogo && (
            <WrapLogoCropPreview>
              <WrapIconIphone>
                <WrapMobileImage>
                  <div>{hasCrop ? <canvas ref={previewCanvasRef} /> : <IconLogo />}</div>
                </WrapMobileImage>
                <IconIphoneShop />
              </WrapIconIphone>
            </WrapLogoCropPreview>
          )}
          {!!imgSrc && (
            <WrapCrop $isLogo={isLogo}>
              <ReactCrop
                crop={crop}
                circularCrop={!isLogo}
                onChange={(pixelCrop, percentCrop) => {
                  setCrop(isLogo ? percentCrop : pixelCrop)
                }}
                onComplete={c => {
                  setCompletedCrop(c)
                }}
                aspect={aspect}
              >
                <CropImage ref={imgRef} alt='Crop me' src={imgSrc} onLoad={onImageLoad} />
              </ReactCrop>
            </WrapCrop>
          )}
          {hasCrop && !isLogo && (
            <WrapPreview>
              <PreviewCanvas ref={previewCanvasRef} />
            </WrapPreview>
          )}
          <Stack gap='20px' width='100%' direction='row' justifyContent='flex-end'>
            <Button variant='text-gray' onClick={setFalse}>
              {t('cancel')}
            </Button>
            <LoadingButton
              loading={isLogo ? isLoading : undefined}
              variant='contained'
              onClick={() => {
                void handleSave()
              }}
              disabled={!hasCrop}
            >
              {t('save')}
            </LoadingButton>
          </Stack>
        </Stack>
      </Dialog>
      {isLogo && hasInstruction && (
        <Alert>
          <Typography
            variant='text'
            lineHeight='22px'
            color={theme => theme.palette.allColors.BLACK30}
          >
            {t('we_recommend_that_you_upload_a_logo_if_you_want_it_to_be_displayed_on_the_site')}
          </Typography>
          <WrapIconIphone>
            <WrapMobileImage>
              <div>{field.value ? <Image src={field.value} /> : <IconLogo />}</div>
            </WrapMobileImage>
            <IconIphoneShop />
          </WrapIconIphone>
        </Alert>
      )}
    </>
  )
}
