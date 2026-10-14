import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import { useDescription } from './useDescription'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import { UploadImage } from '@/components/uploads/upload-image'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { ReactComponent as IconLink } from '@/assets/icons/link.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconTrash01 } from '@/assets/icons/trash-01.svg'
import Typography from '@mui/material/Typography'

const Description = () => {
  const { t } = useTranslation()
  const { form, fields, onSubmit, handleBack, handleAppend, handleRemove } = useDescription()

  return (
    <Stack
      p='20px'
      gap='20px'
      width='100%'
      height='100%'
      component='form'
      className='scrollPageLayout'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Stack>
        <Stack gap='24px'>
          <Stack maxWidth='569px'>
            <Input
              fullWidth
              name='title'
              label='mailing_name'
              control={form.control}
              placeholder='enter_name'
            />
          </Stack>
          <UploadImage name='file' control={form.control} />
          <Typography>{t('Upload_Image')}</Typography>
          <Typography fontSize={12}>
            {t('Upload_your_product_image_in_JPEG_PNG_or_WEBP_format_Max_file_size_10_MB')}
          </Typography>
          <InputTextarea
            name='text'
            labelMinimum={1000}
            label='description'
            control={form.control}
            sx={{ height: '220px' }}
            placeholder='type_description_about_your_mailing'
          />
        </Stack>
        {fields.length === 0 ? (
          <Stack mt='24px'>
            <Button
              size='large'
              onClick={handleAppend}
              startIcon={<IconPlus />}
              variant='outlined-purple'
              sx={{ maxWidth: '160px' }}
            >
              {t('add_button')}
            </Button>
          </Stack>
        ) : (
          <Stack mt='32px'>
            <Stack gap='20px' component='ul'>
              {fields.map((f, index: number) => (
                <Stack key={f.id} gap='12px'>
                  <Stack gap='20px' component='li' direction='row'>
                    <Input
                      fullWidth
                      label='name'
                      control={form.control}
                      placeholder='enter_name'
                      name={`buttons.${index}.name`}
                    />
                    <Input
                      fullWidth
                      label='link'
                      control={form.control}
                      name={`buttons.${index}.url`}
                      placeholder=''
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <IconLink />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                  <Stack gap='18px' direction='row'>
                    <Button
                      size='large'
                      variant='filled-red'
                      startIcon={<IconTrash01 />}
                      onClick={handleRemove(index)}
                    >
                      {t('delete_button')}
                    </Button>
                    {fields.length - 1 === index && (
                      <Button
                        size='large'
                        onClick={handleAppend}
                        startIcon={<IconPlus />}
                        variant='outlined-purple'
                      >
                        {t('add_button')}
                      </Button>
                    )}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
      <Stack mt='150px' alignItems='flex-end'>
        <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
          <Button fullWidth variant='outlined-transparent' onClick={handleBack}>
            {t('back')}
          </Button>
          <LoadingButton fullWidth type='submit' variant='contained'>
            {t('ready')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Description
