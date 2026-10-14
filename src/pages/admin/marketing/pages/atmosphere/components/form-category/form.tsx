import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { TabLanguages } from '@/components/tab-languages'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { UploadImage } from '@/components/uploads/upload-image'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconEditSolid } from '@/assets/icons/edit-solid2.svg'
import { useFormCategory, type FormCategoryProps } from './useFormCategory'

export const FormCategory = (props: FormCategoryProps) => {
  const { t } = useTranslation()
  const { form, value, panels, setTrue, setFalse, onSubmit, isLoading } = useFormCategory(props)

  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <Input
        fullWidth
        name={p.name}
        label={p.label}
        control={form.control}
        placeholder='atmosphere_category_placeholder'
      />
    ),
  }))

  return (
    <>
      {props.variant === 'add' ? (
        <Button
          size='small'
          onClick={setTrue}
          startIcon={<IconPlus />}
          sx={theme => ({
            svg: {
              path: {
                stroke: theme.palette.allColors.WHITE,
              },
            },
          })}
        >
          {t('add_category')}
        </Button>
      ) : (
        <IconButton
          radius='8px'
          sx={{
            width: '37px',
            height: '37px',
            border: theme => `1px solid ${theme.palette.allColors.GREEN}`,
            backgroundColor: theme => theme.palette.allColors.GREEN20,
          }}
          onClick={e => {
            e.stopPropagation()
            setTrue()
          }}
        >
          <IconEditSolid />
        </IconButton>
      )}
      {value && (
        <SwipeableDrawer
          open={value}
          anchor='right'
          onOpen={setTrue}
          onClose={setFalse}
          onClick={e => {
            e.stopPropagation()
          }}
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
                  {t(props.variant === 'add' ? 'add_category' : 'edit_category')}
                </Typography>
                <IconButton onClick={setFalse}>
                  <IconRemove />
                </IconButton>
              </Box>
              <Box className='content'>
                <Stack mt='20px' mb='40px'>
                  <UploadImage name='image' control={form.control} />
                  <Typography fontSize={12} mt='6px'>
                    {t('atmosphere_category_image_optional')}
                  </Typography>
                </Stack>
                <TabLanguages panels={PANELS} />
              </Box>
              <Box className='footer'>
                <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                  <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                    {t('cancel')}
                  </Button>
                  <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                    {t(props.variant === 'add' ? 'add' : 'edit')}
                  </LoadingButton>
                </Stack>
              </Box>
            </Box>
          </FormProvider>
        </SwipeableDrawer>
      )}
    </>
  )
}
