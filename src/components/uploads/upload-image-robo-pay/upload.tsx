import Stack from '@mui/material/Stack'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import { ACCEPT_IMAGES } from '@/constants/media'
import { type DragEvent, type ChangeEvent } from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller, type FieldValues } from 'react-hook-form'
import { type UploadImageRoboPayProps } from '@/types/components'
import { Image, Label, WrapImage, WrapIconReplace } from './style'
import { useDragandDropListener } from '@/hooks/useDragandDropListener'
import { ReactComponent as IconReplace } from '@/assets/icons/replace.svg'
import { ReactComponent as IconImageUpload } from '@/assets/icons/image-upload.svg'

export const UploadImageRoboPay = <T extends FieldValues>({
  name,
  label,
  control,
}: UploadImageRoboPayProps<T>) => {
  const { t } = useTranslation()
  const { drop, draggingValue } = useDragandDropListener()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => {
        const handleUpload = (file: File) => {
          field.onChange(file)
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
            {label && <InputLabel sx={{ mb: '3px', transform: 'none' }}>{label}</InputLabel>}
            {field.value ? (
              <WrapImage>
                <WrapIconReplace>
                  <IconButton sx={{ p: '4px' }} component='label' htmlFor={`upload_${name}`}>
                    <IconReplace />
                  </IconButton>
                </WrapIconReplace>
                <Image
                  src={
                    typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value)
                  }
                />
              </WrapImage>
            ) : (
              <>
                <Label
                  ref={drop}
                  onDrop={handleDrop}
                  dragging={draggingValue}
                  htmlFor={`upload_${name}`}
                  sx={theme => ({
                    '& > svg:first-child *': {
                      stopColor: invalid ? theme.palette.allColors.RED10 : undefined,
                    },
                  })}
                >
                  <IconImageUpload />
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
