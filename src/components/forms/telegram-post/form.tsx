import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { Select } from '@/components/selects/select'
import type { OverridableStringUnion } from '@mui/types'
import { useFormTelegramPost } from './useFormTelegramPost'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import Button, { type ButtonPropsSizeOverrides } from '@mui/material/Button'
import { InputTextEditor } from '@/components/inputs/input-text-editor/input'
import { SelectProductsPost } from '@/components/selects/select-products-post'
import { UploadTelegramPost } from '@/components/uploads/upload-telegram-post'

interface FormTelegramPostProps {
  size?: OverridableStringUnion<'small' | 'medium' | 'large', ButtonPropsSizeOverrides>
}
export const FormTelegramPost = (props: FormTelegramPostProps) => {
  const { t, form, modal, product, channels, onSubmit, isLoading } = useFormTelegramPost()

  return (
    <>
      <Button
        size={props.size}
        onClick={modal.setTrue}
        startIcon={<IconPlus />}
        sx={theme => ({
          svg: {
            path: {
              stroke: theme.palette.allColors.WHITE,
            },
          },
        })}
      >
        {t('create_post')}
      </Button>
      <SwipeableDrawer
        anchor='right'
        open={modal.value}
        onOpen={modal.setTrue}
        onClose={modal.setFalse}
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
              <Typography variant='title30'>{t('create_new_post')}</Typography>
              <IconButton onClick={modal.setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            <Box className='content'>
              <Stack gap='20px'>
                <SelectProductsPost />
                <Select
                  name='chat'
                  options={channels}
                  label='telegram_channel'
                  control={form.control}
                  placeholder='select_telegram_channel'
                />
                <Stack position='relative'>
                  <InputTextEditor
                    name='content'
                    label='description'
                    control={form.control}
                    placeholder='type_post_description'
                    maxLength={`${form.watch('content')?.length ?? 0}/1024`}
                  />
                </Stack>
                {product && (
                  <Input
                    fullWidth
                    name='button_title'
                    label='button_name'
                    control={form.control}
                    placeholder='enter_button_name'
                  />
                )}
                <UploadTelegramPost />
              </Stack>
            </Box>
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Button fullWidth variant='outlined-transparent' onClick={modal.setFalse}>
                  {t('cancel')}
                </Button>
                <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                  {t('send')}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
