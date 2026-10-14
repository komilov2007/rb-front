import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import { Image } from '@/components/image'
import Divider from '@mui/material/Divider'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { type FormReviewProps, useFormReview } from './useFormReview'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconReviewSolid } from '@/assets/icons/review-solid.svg'

export const FormReview = (props: FormReviewProps) => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, onSubmit, isLoading } = useFormReview(props)

  return (
    <>
      <IconButton radius='8px' onClick={setTrue}>
        <IconReviewSolid />
      </IconButton>
      {value && (
        <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
          <FormProvider {...form}>
            <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
              <Box
                display='flex'
                p='7px 7px 0 32px'
                component='header'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography variant='title30'>{t('review_title')}</Typography>
                <IconButton onClick={setFalse}>
                  <IconRemove />
                </IconButton>
              </Box>
              <Box className='content'>
                <Box gap='14px' display='flex' alignItems='center'>
                  <Stack gap='15px' direction='row' alignItems='center'>
                    <Image
                      isGallery
                      radius='5px'
                      src={props.product.photo}
                      alt={props.product.title}
                      sx={{
                        width: '60px',
                        height: '60px',
                      }}
                    />
                    <Stack gap='5px'>
                      <Typography variant='title20'>{props.product.title}</Typography>
                      <Rating name='read-only' sx={{ gap: '5px' }} value={props.rating} readOnly />
                    </Stack>
                  </Stack>
                </Box>
                <Stack gap='10px' my='20px'>
                  <Stack>
                    <Divider />
                    <Typography mt='10px' variant='text210'>
                      {t('customer_comment')}
                    </Typography>
                    <Typography variant='text'>{props.comment}</Typography>
                  </Stack>
                  {props.images.length > 0 && (
                    <Stack>
                      {props.images.map((image, index) => (
                        <Image
                          key={index}
                          isGallery
                          radius='5px'
                          src={image}
                          alt={props.product.title}
                          sx={{
                            width: '40px',
                            height: '50px',
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Stack>
                {props.status === 'NEW' ? (
                  <Stack mt='20px'>
                    <InputTextarea
                      name='comment'
                      label='answer'
                      control={form.control}
                      sx={{ height: '130px' }}
                      placeholder='enter_answer'
                      labelMinimum={`${form.watch('comment')?.length}/160`}
                    />
                  </Stack>
                ) : (
                  <Stack>
                    <Divider />
                    <Typography mt='10px' variant='text210'>
                      {t('answer')}
                    </Typography>
                    <Typography variant='text'>{props.admin_review.comment}</Typography>
                  </Stack>
                )}
              </Box>
              {props.status === 'NEW' && (
                <Box className='footer'>
                  <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                    <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                      {t('cancel')}
                    </Button>
                    <LoadingButton type='submit' fullWidth variant='contained' loading={isLoading}>
                      {t('send')}
                    </LoadingButton>
                  </Stack>
                </Box>
              )}
            </Box>
          </FormProvider>
        </SwipeableDrawer>
      )}
    </>
  )
}
