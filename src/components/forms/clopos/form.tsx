import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import { useFormClopos } from './useFormClopos'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { type RoboMarketAppDetaiProps } from '@/types/robo-market'
import { ReactComponent as IconDots } from '@/assets/icons/dots.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { SelectCloposSpot } from '@/components/selects/select-clopos-spot'

export const FormClopos = (props: RoboMarketAppDetaiProps) => {
  const { t } = useTranslation()
  const {
    modal,
    form,
    token,
    poster,
    upload,
    hasToken,
    onSubmit,
    isLoading,
    handleClick,
    handleDelete,
    deleteMutation,
  } = useFormClopos()

  return (
    <>
      {token.isLoading ? (
        <Skeleton height='42px' width='100%' variant='rounded' />
      ) : (
        <LoadingButton onClick={modal.setTrue} variant='outlined-purple'>
          {t(hasToken ? 'installed' : 'install')}
        </LoadingButton>
      )}
      <SwipeableDrawer
        anchor='right'
        open={modal.value}
        onOpen={modal.setTrue}
        onClose={modal.setFalse}
      >
        <Box
          display='flex'
          p='7px 7px 0 32px'
          component='header'
          alignItems='center'
          justifyContent='flex-end'
        >
          <IconButton onClick={modal.setFalse}>
            <IconRemove />
          </IconButton>
        </Box>
        <Box className='content'>
          <Wrapper>
            <FormProvider {...form}>
              <Stack component='form' onSubmit={form.handleSubmit(onSubmit)}>
                {token.isLoading ? (
                  <Skeleton height='100px' width='100%' variant='rounded' />
                ) : (
                  <>
                    <Stack direction='row' justifyContent='space-between'>
                      <Stack gap='10px' direction='row'>
                        <Stack
                          sx={{
                            img: {
                              width: '36px',
                              height: '36px',
                            },
                          }}
                        >
                          <img src={props.icon} alt={props.name} />
                        </Stack>
                        <Stack justifyContent='center'>
                          <Typography variant='title50'>{props.name}</Typography>
                          <Typography variant='text270' maxWidth='300px'>
                            {t('restaurant_pos_system_to_simplify_business_management')}
                          </Typography>
                        </Stack>
                      </Stack>
                      {hasToken ? (
                        upload.value ? null : (
                          <div>
                            <IconButton
                              onClick={upload.setTrue}
                              sx={{
                                m: '-12px -16px 0 0',
                                svg: {
                                  width: '24px !important',
                                  height: '24px !important',
                                },
                              }}
                            >
                              <IconDots />
                            </IconButton>
                          </div>
                        )
                      ) : null}
                    </Stack>
                    <Stack gap='10px' mt='20px'>
                      {!upload.value && hasToken ? (
                        <Stack gap='14px' justifyContent='flex-end' direction='row'>
                          <LoadingButton
                            size='small'
                            variant='filled-red'
                            onClick={handleDelete}
                            sx={{ minWidth: '130px' }}
                            loading={deleteMutation.isLoading}
                          >
                            {t('delete')}
                          </LoadingButton>
                          <LoadingButton
                            size='small'
                            variant='contained'
                            loading={isLoading}
                            onClick={handleClick}
                            sx={{ minWidth: '130px' }}
                          >
                            {t('import')}
                          </LoadingButton>
                        </Stack>
                      ) : (
                        <>
                          <Stack gap='15px'>
                            <Input
                              fullWidth
                              label='Client secret'
                              name='client_secret'
                              control={form.control}
                              placeholder='enter_client_secret'
                            />
                            <Input
                              fullWidth
                              label='Client id'
                              name='client_id'
                              control={form.control}
                              placeholder='enter_client_id'
                            />
                            <Input
                              fullWidth
                              name='brand'
                              label='brand'
                              control={form.control}
                              placeholder='enter_brand'
                            />
                            <SelectCloposSpot branches={token.data?.data?.clopos?.branches ?? []} />
                          </Stack>
                          <Stack gap='14px' justifyContent='flex-end' direction='row'>
                            {hasToken && (
                              <LoadingButton
                                size='small'
                                variant='filled-red'
                                onClick={handleDelete}
                                sx={{ minWidth: '130px' }}
                                loading={deleteMutation.isLoading}
                              >
                                {t('delete')}
                              </LoadingButton>
                            )}
                            <LoadingButton
                              size='small'
                              type='submit'
                              variant='contained'
                              sx={{ minWidth: '130px' }}
                              loading={poster.isLoading || isLoading}
                            >
                              {t('save')}
                            </LoadingButton>
                          </Stack>
                        </>
                      )}
                    </Stack>
                  </>
                )}
              </Stack>
            </FormProvider>
          </Wrapper>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
