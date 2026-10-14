import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { getSize } from '@/utils/media'
import { Card, Label, Content } from './style'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Trans, useTranslation } from 'react-i18next'
import { type DragEvent, type ChangeEvent } from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import { type UploadExcelProps } from '@/types/components'
import { Controller, type FieldValues } from 'react-hook-form'
import { useDragandDropListener } from '@/hooks/useDragandDropListener'
import { ReactComponent as IconFileList } from '@/assets/icons/file-list.svg'
import { ReactComponent as IconUploadFile } from '@/assets/icons/upload-file.svg'
import { ReactComponent as IconTrashBinLine } from '@/assets/icons/trash-bin-line.svg'
import { ACCEPT_EXCEL } from '@/constants/media'

export const UploadExcel = <T extends FieldValues>({ name, control }: UploadExcelProps<T>) => {
  const { t } = useTranslation()
  const { drop, draggingValue } = useDragandDropListener()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => {
        const value = field.value as File
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
            {value ? (
              <Card>
                <Stack gap='10px' direction='row' alignItems='center'>
                  <Stack>
                    <IconFileList />
                  </Stack>
                  <Stack gap='5px'>
                    <Typography variant='title50' lineHeight='normal'>
                      {value.name}
                    </Typography>
                    <Typography variant='text' fontSize='12px' whiteSpace='nowrap'>
                      {getSize(value.size)}
                    </Typography>
                  </Stack>
                </Stack>
                <IconButton component='label' htmlFor='upload-excel'>
                  <IconTrashBinLine />
                </IconButton>
              </Card>
            ) : (
              <>
                <Label
                  ref={drop}
                  onDrop={handleDrop}
                  htmlFor='upload-excel'
                  dragging={draggingValue}
                >
                  <Content>
                    <Box>
                      <IconUploadFile />
                    </Box>
                    <Typography mb='5px' mt='11px' component='h5' variant='title20' align='center'>
                      <Trans
                        i18nKey='drag_your_file_here_or_browse'
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
                      {t('file_size_mb', { value: 10 })}
                    </Typography>
                  </Content>
                </Label>
                <FormHelperText error={invalid}>{t(error?.message as string)}</FormHelperText>
              </>
            )}
            <input
              hidden
              type='file'
              id='upload-excel'
              onChange={handleOnChange}
              accept={ACCEPT_EXCEL}
            />
          </>
        )
      }}
    />
  )
}
