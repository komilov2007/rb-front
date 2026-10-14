import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useMedia } from '@/hooks/useMedia'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { useMutation } from '@tanstack/react-query'
import { MAX_FILE_SIZE10, ACCEPT_EXCEL } from '@/constants/media'
import { object, string, type InferType } from 'yup'
import { productsExcel } from '@/apis/admin/product'
import { Trans, useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, Label, Content, Conatiner } from './style'
import FormHelperText from '@mui/material/FormHelperText'
import { useRef, type DragEvent, type ChangeEvent } from 'react'
import { ReactComponent as IconExcel } from '@/assets/icons/excel.svg'
import { useDragandDropListener } from '@/hooks/useDragandDropListener'
import { ReactComponent as IconFileList } from '@/assets/icons/file-list.svg'
import { ReactComponent as IconUploadFile } from '@/assets/icons/upload-file.svg'
import { ReactComponent as IconTrashBinLine } from '@/assets/icons/trash-bin-line.svg'

const schema = object().shape({
  source_url: string().required('you_need_to_provide_a_file').default(''),
})

type SchemaType = InferType<typeof schema>

interface ProductsExcelProps {
  handleUpdate: () => void
}

export const ProductsExcel = (props: ProductsExcelProps) => {
  const { t } = useTranslation()
  const media = useMedia()
  const { drop, draggingValue } = useDragandDropListener()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<SchemaType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.cast({}, { assert: true }),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: SchemaType) => await productsExcel(data),
    onSuccess: () => {
      form.reset(schema.cast({}, { assert: true }))
      media.reset?.()
      if (inputRef.current) inputRef.current.value = ''
      props.handleUpdate()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const validateFileSize = (file: File) => {
    if (file.size > MAX_FILE_SIZE10) {
      form.setError('source_url', {
        type: 'manual',
        message: 'file_size_must_be_less_than_10_mb',
      })
      return false
    }
    return true
  }

  const onSubmit = (data: SchemaType) => {
    mutate(data)
  }

  return (
    <Stack component='form' onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name='source_url'
        control={form.control}
        render={({ field, fieldState: { error, invalid } }) => {
          const handleUpload = (file: File) => {
            if (!validateFileSize(file)) return

            form.clearErrors('source_url')

            media.mutate(file, {
              onSuccess: res => {
                field.onChange(res?.data.url)
              },
            })
          }

          const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            const input = e.target
            const file = input.files?.[0]

            if (!file) return

            handleUpload(file)
            input.value = ''
          }

          const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
            e.preventDefault()
            e.stopPropagation()

            const file = e.dataTransfer.files?.[0]
            if (!file) return

            handleUpload(file)

            if (inputRef.current) inputRef.current.value = ''
          }

          const handleDelete = () => {
            field.onChange('')
            form.clearErrors('source_url')
            media.reset?.()
            if (inputRef.current) inputRef.current.value = ''
          }

          return (
            <>
              {media.isLoading ? (
                <Skeleton height='130px' width='100%' variant='rounded' />
              ) : field.value ? (
                <Card>
                  <Stack gap='10px' direction='row' alignItems='center'>
                    <IconFileList />
                    <Stack gap='5px'>
                      <Typography variant='title50'>{media.fileName}</Typography>
                      <Typography variant='text' fontSize='12px'>
                        {media.size}
                      </Typography>
                    </Stack>
                  </Stack>
                  <IconButton onClick={handleDelete}>
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
                      <Typography component='h5' variant='title20' align='center'>
                        <Trans
                          i18nKey='drag_your_file_here_or_browse'
                          components={{
                            linkTag: <Typography component='span' fontWeight='500' />,
                          }}
                        />
                      </Typography>
                      <Typography variant='text' align='center'>
                        {t('file_size_mb', { value: 10 })}
                      </Typography>
                    </Content>
                  </Label>
                  {invalid && (
                    <FormHelperText error={Boolean(error)}>
                      {t(error?.message ?? '')}
                    </FormHelperText>
                  )}
                </>
              )}

              <input
                ref={inputRef}
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

      <Conatiner>
        <Stack gap='10px'>
          <IconExcel />
          <Typography>{t('table_example')}</Typography>
          <Typography variant='text'>
            {t(
              'you_can_download_the_attached_example_and_use_them_as_a_starting_pint_for_your_own_file',
            )}
          </Typography>
        </Stack>
        <div>
          <Button
            component='a'
            target='_blank'
            variant='outlined-white'
            href='https://robosell.ams3.digitaloceanspaces.com/robosell/f8dcc9e2-402d-4839-b7fe-0b36d9f8e71d.xlsx'
          >
            {t('download')}
          </Button>
        </div>
      </Conatiner>
      <Stack direction='row' justifyContent='flex-end'>
        <div>
          <LoadingButton type='submit' variant='contained' loading={isLoading}>
            {t('import')}
          </LoadingButton>
        </div>
      </Stack>
    </Stack>
  )
}
