import QRCode from 'react-qr-code'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { ROUTER } from '@/constants/router'
import { Controller } from 'react-hook-form'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { COLORS, BANNER_SIZE } from './constants'
import Typography from '@mui/material/Typography'
import RadioGroup from '@mui/material/RadioGroup'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { usePage, type PageProps } from './usePage'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { UploadImage } from '@/components/uploads/upload-image'
import { ReactComponent as IconTable } from '@/assets/icons/table.svg'
import { ReactComponent as IconTableA5 } from '@/assets/icons/table-a5.svg'
import { ReactComponent as IconEmptyBot } from '@/assets/icons/empty-bot.svg'
import { ReactComponent as IconTableLogo } from '@/assets/icons/table-logo.svg'
import { ReactComponent as IconTableContent } from '@/assets/icons/table-content.svg'
import { ReactComponent as IconPrint } from '@/assets/icons/invoice-active.svg'
import { ReactComponent as IconFileDownload } from '@/assets/icons/file-download.svg'
import { ReactComponent as IconTableContentA5 } from '@/assets/icons/table-content-a5.svg'
import {
  Footer,
  Content,
  Wrapper,
  WrapImage,
  WrapQrCode,
  ControlLabel,
  WrapTableContent,
  CustomRadioGroup,
  WrapControlLabel,
} from './style'

const baseURL = import.meta.env.VITE_API_QR_MENU

const Page = ({ variant }: PageProps) => {
  const { t } = useTranslation()
  const {
    data,
    form,
    shop,
    website,
    mutation,
    onSubmit,
    isLoading,
    isFetching,
    componentRef,
    handleSubmit,
    handlePrint,
    business_type,
  } = usePage({ variant })

  if (variant === 'MENU' && business_type === 'ONLINE_SHOP') {
    if (website.isLoading) {
      return <Spinner center />
    }
    if (typeof website.data?.data === 'string' && website.data?.data === '') {
      return (
        <Box display='flex' height='100%' width='100%' flexGrow={1} alignItems='center'>
          <Stack alignItems='center' width='100%'>
            <Stack mb='68px'>
              <IconEmptyBot />
            </Stack>
            <Typography variant='title30' fontWeight='700'>
              {t('it_s_time_to_launch_your_own_website')}
            </Typography>
            <Typography m='13px 0 27px' align='center' maxWidth='470px'>
              {t('build_your_site_quickly_and_begin_taking_orders')}
            </Typography>
            <Button
              fullWidth
              component={Link}
              size='mediumSmall'
              sx={{
                maxWidth: '147px',
              }}
              to={`${ROUTER.ADMIN}/${ROUTER.PLATFORMS}/${ROUTER.WEBSITE}/${ROUTER.PLATFORM_CREATE}`}
            >
              {t('create_website')}
            </Button>
          </Stack>
        </Box>
      )
    }
  }

  return (
    <Stack
      gap='18px'
      width='100%'
      flexGrow={1}
      height='100%'
      direction='row'
      component='form'
      overflow='hidden'
      className='transparent'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {isLoading || isFetching ? (
        <Spinner center />
      ) : (
        <>
          <Wrapper>
            <Stack sx={{ p: '24px', overflowY: 'auto' }}>
              <Typography variant='title10' component='h2'>
                {t('banner_size')}
              </Typography>
              <Controller
                name='banner_size'
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormControl sx={{ m: '21px 0 32px' }}>
                    <CustomRadioGroup row error={fieldState.invalid} {...field}>
                      {BANNER_SIZE.map(({ label, value, icon, checkedIcon }) => (
                        <FormControlLabel
                          key={value}
                          value={value}
                          label={t(label)}
                          sx={{ gap: '6px' }}
                          labelPlacement='bottom'
                          control={<Radio icon={icon} checkedIcon={checkedIcon} />}
                        />
                      ))}
                    </CustomRadioGroup>
                  </FormControl>
                )}
              />
              <Divider />
              <Stack my='32px'>
                <Typography mb='12px' variant='title10' component='h2'>
                  {t('background_color')}
                </Typography>
                <Controller
                  name='background'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormControl>
                      <RadioGroup
                        sx={{
                          gap: '16px',
                        }}
                        {...field}
                        error={fieldState.invalid}
                      >
                        <WrapControlLabel>
                          {COLORS.map(c => (
                            <ControlLabel
                              key={c}
                              label=''
                              value={c}
                              active={c === form.watch('background')}
                              control={<Radio icon={<div />} checkedIcon={<div />} />}
                            />
                          ))}
                        </WrapControlLabel>
                        <FormControlLabel
                          value='custom'
                          label={t('custom')}
                          control={<Radio />}
                          sx={{
                            '.MuiRadio-root': {
                              padding: '0 9px 0 0',
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
                {form.watch('background') === 'custom' && (
                  <Stack mt='14px'>
                    <Input
                      type='color'
                      control={form.control}
                      name='backgroundCustom'
                      className='input-color'
                    />
                  </Stack>
                )}
              </Stack>
              <Divider />
              <Stack my='32px'>
                <Typography mb='12px' variant='title10' component='h2'>
                  {t('qr_code_color')}
                </Typography>
                <Controller
                  name='qr'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormControl>
                      <RadioGroup
                        error={fieldState.invalid}
                        {...field}
                        sx={{
                          gap: '16px',
                        }}
                      >
                        <WrapControlLabel>
                          {COLORS.map(c => (
                            <ControlLabel
                              key={c}
                              label=''
                              value={c}
                              active={c === form.watch('qr')}
                              control={<Radio icon={<div />} checkedIcon={<div />} />}
                            />
                          ))}
                        </WrapControlLabel>
                        <FormControlLabel
                          value='custom'
                          label={t('custom')}
                          control={<Radio />}
                          sx={{
                            '.MuiRadio-root': {
                              padding: '0 9px 0 0',
                            },
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
                {form.watch('qr') === 'custom' && (
                  <Stack mt='14px'>
                    <Input
                      type='color'
                      name='qrCustom'
                      className='input-color'
                      control={form.control}
                    />
                  </Stack>
                )}
              </Stack>
              <Divider />
              <Stack my='32px'>
                <Typography mb='12px' variant='title10' component='h2'>
                  {t('text')}
                </Typography>
                <Stack gap='32px'>
                  <Stack>
                    <Stack mb='16px' gap='20px' direction='row'>
                      <Input
                        fullWidth
                        name='primary_text'
                        label='primary_text'
                        control={form.control}
                        placeholder='enter_text'
                        sx={{
                          maxWidth: '440px',
                        }}
                      />
                      <Input
                        fullWidth
                        type='tel'
                        label='text_size'
                        control={form.control}
                        name='primary_text_size'
                        placeholder='enter_size'
                        sx={{
                          maxWidth: '170px',
                        }}
                      />
                    </Stack>
                    <Input
                      type='color'
                      label='text_color'
                      control={form.control}
                      className='input-color'
                      name='primary_text_color'
                    />
                  </Stack>
                  <Stack>
                    <Stack mb='16px' gap='20px' direction='row'>
                      <Input
                        fullWidth
                        name='secondary_text'
                        label='secondary_text'
                        control={form.control}
                        placeholder='enter_text'
                        sx={{
                          maxWidth: '440px',
                        }}
                      />
                      <Input
                        fullWidth
                        type='tel'
                        label='text_size'
                        control={form.control}
                        placeholder='Enter size'
                        name='secondary_text_size'
                        sx={{
                          maxWidth: '170px',
                        }}
                      />
                    </Stack>
                    <Input
                      type='color'
                      label='text_color'
                      control={form.control}
                      className='input-color'
                      name='secondary_text_color'
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Divider />
              <Stack gap='12px' my='32px'>
                <Typography variant='title10' component='h2'>
                  {t('logo')}
                </Typography>
                <UploadImage variant='qr-code' name='logo' control={form.control} />
                <Typography>{t('Upload_Image')}</Typography>
                <Typography fontSize={12}>
                  {t('Upload_your_product_image_in_JPEG_PNG_or_WEBP_format_Max_file_size_10_MB')}
                </Typography>
              </Stack>
            </Stack>
            <Footer>
              <LoadingButton type='submit' variant='contained' loading={mutation.isLoading}>
                {t('save')}
              </LoadingButton>
            </Footer>
          </Wrapper>
          <Wrapper
            sx={{
              p: '24px',
              overflowY: 'auto',
              maxWidth: form.watch('banner_size') === 'A5' ? '430px' : '395px',
            }}
          >
            <Typography mb='20px' variant='title10' component='h2'>
              {t('live_preview')}
            </Typography>
            <Stack mb='10px' position='relative'>
              {form.watch('banner_size') === 'A5' ? <IconTableA5 /> : <IconTable />}
              <WrapTableContent
                ref={componentRef}
                sx={{
                  left: form.watch('banner_size') === 'A5' ? '54px' : '50px',
                  'svg defs linearGradient stop': {
                    'stop-color':
                      form.watch('background') === 'custom'
                        ? form.watch('backgroundCustom')
                        : form.watch('background'),
                  },
                }}
              >
                <Stack position='relative'>
                  {form.watch('banner_size') === 'A5' ? (
                    <IconTableContentA5 />
                  ) : (
                    <IconTableContent />
                  )}
                  <Content>
                    <WrapImage>
                      {form.watch('logo') ? (
                        <img
                          src={
                            typeof form.watch('logo') === 'string'
                              ? (form.watch('logo') as string)
                              : (URL.createObjectURL(form.watch('logo') as MediaSource) ?? '')
                          }
                        />
                      ) : (
                        <IconTableLogo />
                      )}
                    </WrapImage>
                    <Typography
                      variant='title150'
                      align='center'
                      component='h2'
                      sx={{
                        color: form.watch('primary_text_color'),
                        fontSize: `${form.watch('primary_text_size')}px`,
                      }}
                    >
                      {form.watch('primary_text')}
                    </Typography>
                    <Typography
                      variant='text280'
                      m='3px 0 18px'
                      align='center'
                      component='h3'
                      sx={{
                        color: form.watch('secondary_text_color'),
                        fontSize: `${form.watch('secondary_text_size')}px`,
                      }}
                    >
                      {form.watch('secondary_text')}
                    </Typography>
                    <WrapQrCode>
                      <QRCode
                        size={150}
                        viewBox='0 0 150 150'
                        value={
                          variant === 'MENU'
                            ? `${
                                business_type === 'ONLINE_SHOP'
                                  ? website.data?.data.domain
                                  : baseURL
                              }?shop=${shop}`
                            : variant === 'TELEGRAM'
                              ? (data?.bot ?? '')
                              : variant === 'WEBSITE'
                                ? (data?.website ?? '')
                                : location.origin
                        }
                        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                        fgColor={
                          form.watch('qr') === 'custom' ? form.watch('qrCustom') : form.watch('qr')
                        }
                      />
                    </WrapQrCode>
                  </Content>
                </Stack>
              </WrapTableContent>
            </Stack>
            <Stack direction='row' gap='12px' justifyContent='center'>
              <LoadingButton
                fullWidth
                onClick={handleSubmit}
                variant='contained-light'
                loading={mutation.isLoading}
                startIcon={<IconFileDownload />}
              >
                {t('download_pdf')}
              </LoadingButton>
              <LoadingButton
                fullWidth
                onClick={handlePrint}
                variant='contained-light'
                startIcon={<IconPrint />}
              >
                {t('print')}
              </LoadingButton>
            </Stack>
          </Wrapper>
        </>
      )}
    </Stack>
  )
}

export default Page
