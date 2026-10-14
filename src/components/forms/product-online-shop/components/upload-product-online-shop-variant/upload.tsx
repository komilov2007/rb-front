import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { WrapImageContent } from './style'
import { useMedia } from '@/hooks/useMedia'
import Checkbox from '@mui/material/Checkbox'
import Skeleton from '@mui/material/Skeleton'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Trans, useTranslation } from 'react-i18next'
import { useFormContext, useWatch } from 'react-hook-form'
import { ACCEPT_IMAGES, MAX_FILE_SIZE } from '@/constants/media'
import { type SchemaTypeProductOnlineShop } from '@/utils/schema'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconUpload } from '@/assets/icons/upload.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { type DragEvent, useRef, useState, type ChangeEvent } from 'react'
import { ReactComponent as IconCheckboxTrueFill } from '@/assets/icons/checkbox-true-fill.svg'
import { ReactComponent as IconCheckboxFalseFill } from '@/assets/icons/checkbox-false-fill.svg'

interface UploadProductOnlineShopVariantProps {
  value: string
  size: 'small' | 'medium'
  onChange: (value: string) => void
}

const mediaBaseURL = import.meta.env.VITE_API_MEDIA_BASE_URL
const HTML_FOR = 'upload-product-online-shop-image-only-for-variant'

export const UploadProductOnlineShopVariant = (props: UploadProductOnlineShopVariantProps) => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const { mutate, isLoading } = useMedia()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useFormContext<SchemaTypeProductOnlineShop>()
  const images = useWatch({ name: 'images', control: form.control })
  const [selectedImage, setSelectedImage] = useState(props.value ?? '')
  const [uploadedImages, setUploadedImages] = useState<Array<{ image: string; url: string }>>([])

  const size =
    props.size === 'small'
      ? { width: '36px', height: '36px' }
      : {
          width: '48px',
          height: '48px',
        }

  const handleSelectedImage = (image: string) => (_: ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(image === selectedImage ? '' : image)
  }

  const handleUploadFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      console.log('error')
    } else {
      mutate(file, {
        onSuccess: res => {
          if (res?.data) {
            setUploadedImages([{ image: res.data.key, url: res.data.url }, ...uploadedImages])
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

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0]
      handleUploadFile(file)
    }
  }

  const handleDone = () => {
    props.onChange(selectedImage)
    modal.setFalse()
  }

  return (
    <>
      {props.value ? (
        <img
          onClick={modal.setTrue}
          style={{ ...size, borderRadius: '4px' }}
          src={props.value.includes('billz') ? props.value : `${mediaBaseURL}${props.value}`}
        />
      ) : (
        <IconButton
          radius='4px'
          onClick={modal.setTrue}
          sx={{
            svg: size,
          }}
        >
          <IconUpload />
        </IconButton>
      )}
      <Dialog fullWidth scroll='body' maxWidth='md' open={modal.value} onClose={modal.setFalse}>
        <Stack gap='24px' p='16px'>
          <Stack alignItems='center' direction='row' justifyContent='space-between'>
            <Typography component='h3' align='center' fontWeight='700' variant='title30'>
              {t('select_image')}
            </Typography>
            <IconButton onClick={modal.setFalse}>
              <IconRemove />
            </IconButton>
          </Stack>
          <Stack>
            {isLoading ? (
              <Skeleton
                variant='rounded'
                sx={{ width: '100%', height: '152px', borderRadius: '6px' }}
              />
            ) : (
              <div>
                <Stack
                  component='label'
                  htmlFor={HTML_FOR}
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
                  <Stack gap='6px' alignItems='center'>
                    <Typography
                      variant='text20'
                      sx={theme => ({ color: theme.palette.allColors.BLACK190 })}
                    >
                      <Trans
                        i18nKey='drag_and_drop_your_images_or_videos_here_or_upload'
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
                      {t('1600_x_1200_43_is_recommended_each_up_to_10_mb')}
                    </Typography>
                  </Stack>
                </Stack>
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
          </Stack>
          <Stack gap='15px' component='ul' direction='row' flexWrap='wrap'>
            {[...uploadedImages, ...images].map((image, index) => {
              return (
                <Stack key={index} component='li' position='relative'>
                  <img
                    src={image.url?.includes('billz') ? image.url : `${mediaBaseURL}${image.image}`}
                    style={{
                      width: '96px',
                      height: '128px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                    }}
                  />
                  <WrapImageContent>
                    <Stack m='-5px'>
                      <Checkbox
                        icon={<IconCheckboxFalseFill />}
                        checkedIcon={<IconCheckboxTrueFill />}
                        checked={selectedImage === image.image}
                        onChange={handleSelectedImage(image.image)}
                      />
                    </Stack>
                  </WrapImageContent>
                </Stack>
              )
            })}
          </Stack>
          <Stack width='100%' alignItems='flex-end'>
            <div>
              <Button onClick={handleDone} disabled={selectedImage === ''}>
                {t('done')}
              </Button>
            </div>
          </Stack>
        </Stack>
      </Dialog>
    </>
  )
}
