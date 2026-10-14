import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import LoadingButton from '@mui/lab/LoadingButton'
import { useReviewCreate } from './useReviewCreate'
import FormControl from '@mui/material/FormControl'
import { Controller, FormProvider } from 'react-hook-form'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconEditFill } from '@/assets/icons/edit-fill.svg'

export const ReviewCreate = () => {
  const { t } = useTranslation()
  const { form, value, setTrue, setFalse, isLoading, onSubmit } = useReviewCreate()

  return (
    <>
      <Button
        fullWidth
        onClick={setTrue}
        size='mediumSmall'
        variant='outlined'
        startIcon={<IconEditFill />}
        sx={{
          border: 'none',
          borderRadius: '4px !important',
          ':hover': {
            border: 'none',
          },
        }}
      >
        {t('write_a_comment')}
      </Button>
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
              <Typography variant='title30'>{t('write_a_comment')}</Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <InputTextarea
                name='comment'
                label='comment'
                labelMinimum={1000}
                control={form.control}
                sx={{ height: '208px' }}
                placeholder='enter_comment'
              />
              <Stack mt='20px' width='fit-content'>
                <FormControl>
                  <InputLabel>{t('rate')}</InputLabel>
                  <Controller
                    name='rate'
                    control={form.control}
                    render={({ field }) => (
                      <Rating
                        precision={0.5}
                        {...field}
                        sx={{
                          gap: '20px',
                          '.MuiRating-icon': {
                            svg: {
                              width: '30px',
                              height: '30px',
                            },
                          },
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Stack>
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                  {t('submit')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
