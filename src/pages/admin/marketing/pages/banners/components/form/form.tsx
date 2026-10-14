import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Alert } from '@/components/alert'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { WrapIconMac, WrapIconIphone } from './style'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import ImageMacPreview from '@/assets/images/mac-preview.webp'
import { UploadImage } from '@/components/uploads/upload-image'
import ImageIphoneBanner from '@/assets/images/iphone-banner.png'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { useFormBanner, type FormBannerProps } from './useFormBanner'
import { SelectCategory } from '@/components/selects/select-category'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconEditSolid } from '@/assets/icons/edit-solid.svg'
import { SelectProductByCategoryBanner } from '@/components/selects/select-product-by-category-banner'

export const FormBanner = (props: FormBannerProps) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading, handleOpen, is_new_version } =
    useFormBanner(props)

  return (
    <>
      {props.variant === 'edit' ? (
        <IconButton radius='50%' onClick={setTrue}>
          <IconEditSolid />
        </IconButton>
      ) : (
        <Button
          onClick={handleOpen}
          startIcon={props.variant === 'add' ? <IconPlus /> : undefined}
          sx={theme => ({
            svg: {
              path: {
                stroke: theme.palette.allColors.WHITE,
              },
            },
          })}
        >
          {t(props.variant === 'add' ? 'add_banner' : 'create_banner')}
        </Button>
      )}
      <SwipeableDrawer
        open={value}
        anchor='right'
        onOpen={setTrue}
        onClose={setFalse}
        sx={theme => ({
          '.MuiPaper-root': {
            maxWidth: '653px',
            backgroundImage: 'none',
            minWidth: '653px',
            [theme.breakpoints.down('md')]: {
              width: '100%',
              maxWidth: '100%',
              minWidth: '100%',
            },
          },
        })}
      >
        <FormProvider {...form}>
          <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
            <Box
              display='flex'
              p='7px 7px 0 32px'
              component='header'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='title30'>
                {t(props.variant === 'edit' ? 'edit_banner' : 'add_banner')}
              </Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack mb='20px'>
                <Alert>
                  <Typography
                    variant='text'
                    lineHeight='22px'
                    color={theme => theme.palette.allColors.BLACK30}
                  >
                    {t('the_banner_you_added_looks_like_this_example')}
                  </Typography>
                  <Stack
                    width='100%'
                    margin='12px 0 -22px -20px'
                    direction={{ xs: 'column', md: 'row' }}
                    alignItems={{ xs: 'flex-start', md: 'flex-end' }}
                  >
                    <WrapIconIphone>
                      <img src={ImageIphoneBanner} />
                    </WrapIconIphone>
                    <WrapIconMac>
                      <img src={ImageMacPreview} />
                    </WrapIconMac>
                  </Stack>
                </Alert>
              </Stack>
              <Typography variant='text160' mb='5px' component='h3'>
                {t('mobile_banner')}
              </Typography>
              <UploadImage
                size='850:375'
                variant='banner'
                name='mobile_photo'
                control={form.control}
              />
              <Typography>{t('Upload_Image')}</Typography>
              <Typography fontSize={12}>
                {t('Upload_your_product_image_in_JPEG_PNG_or_WEBP_format_Max_file_size_10_MB')}
              </Typography>
              <Typography variant='text160' m='40px 0 5px' component='h3'>
                {t('web_banner')}
              </Typography>
              <UploadImage name='desktop_photo' variant='banner' control={form.control} />
              <Typography>{t('Upload_Image')}</Typography>
              <Typography fontSize={12}>
                {t('Upload_your_product_image_in_JPEG_PNG_or_WEBP_format_Max_file_size_10_MB')}
              </Typography>
              <Stack mt='15px' gap='25px'>
                <InputCheckbox
                  name='have_url'
                  sx={{ ml: '-9px' }}
                  control={form.control}
                  label='a_link_will_be_posted'
                />
                {form.watch('have_url') && (
                  <SelectCategory
                    name='category'
                    label='category'
                    control={form.control}
                    placeholder='select_category'
                  />
                )}
                {is_new_version && <SelectProductByCategoryBanner />}
              </Stack>
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton type='submit' fullWidth variant='contained' loading={isLoading}>
                  {t(props.variant === 'edit' ? 'edit' : 'add')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
