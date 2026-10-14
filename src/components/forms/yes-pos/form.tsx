import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { FormProvider } from 'react-hook-form'
import { useFormYesPos } from './useFormYesPos'
import { Input } from '@/components/inputs/input'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'
import { ReactComponent as IconDots } from '@/assets/icons/dots.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { SelectBranchYesPos } from '@/components/selects/select-branch-yes-pos'

export const FormYesPos = (props: RoboMarketAppDetaiProps) => {
  const {
    t,
    open,
    form,
    modal,
    onSubmit,
    getMerchant,
    handleImport,
    handleDelete,
    postMerchant,
    deleteMerchant,
    importMerchant,
  } = useFormYesPos()

  return (
    <>
      {getMerchant.isLoading ? (
        <Skeleton height='42px' width='100%' variant='rounded' />
      ) : (
        <LoadingButton
          onClick={modal.setTrue}
          variant='outlined-purple'
          loading={getMerchant.isLoading}
        >
          {t(getMerchant.data?.data?.yes_pos ? 'installed' : 'install')}
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
        <Box p='5px 32px 50px'>
          <Wrapper>
            <FormProvider {...form}>
              <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Typography variant='title50'>YesPOS</Typography>
                      <Typography variant='text270'>
                        {t('the_system_helps_organize_your_business')}
                      </Typography>
                    </Stack>
                    {open.value || !getMerchant.data?.data?.yes_pos ? null : (
                      <div>
                        <IconButton
                          onClick={open.setTrue}
                          sx={{
                            svg: {
                              width: '24px !important',
                              height: '24px !important',
                            },
                          }}
                        >
                          <IconDots />
                        </IconButton>
                      </div>
                    )}
                  </Stack>
                </Stack>
                {open.value || !getMerchant.data?.data?.yes_pos ? (
                  <Stack gap='15px' marginTop={'20px'}>
                    <Input
                      fullWidth
                      label='token'
                      name='api_key'
                      control={form.control}
                      placeholder='enter_token'
                    />
                    <SelectBranchYesPos />
                    <Stack gap='15px' justifyContent='flex-end' direction='row'>
                      {open.value && (
                        <LoadingButton
                          size='small'
                          variant='filled-red'
                          onClick={open.setFalse}
                          sx={{ minWidth: '130px' }}
                        >
                          {t('cancel')}
                        </LoadingButton>
                      )}
                      <LoadingButton
                        size='small'
                        type='submit'
                        variant='contained'
                        sx={{ minWidth: '130px' }}
                        loading={postMerchant.isLoading}
                      >
                        {t('save')}
                      </LoadingButton>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack gap='15px' justifyContent='flex-end' direction='row' marginTop={'20px'}>
                    <LoadingButton
                      size='small'
                      variant='filled-red'
                      onClick={handleDelete}
                      sx={{ minWidth: '130px' }}
                      loading={deleteMerchant.isLoading}
                    >
                      {t('delete')}
                    </LoadingButton>
                    <LoadingButton
                      size='small'
                      variant='contained'
                      onClick={handleImport}
                      sx={{ minWidth: '130px' }}
                      loading={importMerchant.isLoading}
                    >
                      {t('import')}
                    </LoadingButton>
                  </Stack>
                )}
              </Box>
            </FormProvider>
          </Wrapper>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
