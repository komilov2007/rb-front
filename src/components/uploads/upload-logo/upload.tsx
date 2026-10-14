import Avatar from '@mui/material/Avatar'
import { Label, WrapIconReplace } from './style'
import IconButton from '@mui/material/IconButton'
import { ACCEPT_IMAGES } from '@/constants/media'
import { type DragEvent, type ChangeEvent } from 'react'
import { type UploadLogoProps } from '@/types/components'
import { Controller, type FieldValues } from 'react-hook-form'
import { useDragandDropListener } from '@/hooks/useDragandDropListener'
import { ReactComponent as IconReplacePen } from '@/assets/icons/replace-pen.svg'

export const UploadLogo = <T extends FieldValues>({ name, control }: UploadLogoProps<T>) => {
  const { drop, draggingValue } = useDragandDropListener()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
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
          <>
            <Label ref={drop} htmlFor={name} dragging={draggingValue} onDrop={handleDrop}>
              <WrapIconReplace>
                <IconButton sx={{ p: '4px' }} component='label' htmlFor={name}>
                  <IconReplacePen />
                </IconButton>
              </WrapIconReplace>
              <Avatar
                alt='Logo'
                src={
                  field.value
                    ? typeof field.value === 'string' || field.value === ''
                      ? field.value
                      : URL.createObjectURL(field.value)
                    : ''
                }
                sx={{ width: '76px', height: '76px' }}
              />
            </Label>
            <input hidden type='file' accept={ACCEPT_IMAGES} id={name} onChange={handleOnChange} />
          </>
        )
      }}
    />
  )
}
