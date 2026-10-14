import { Wrapper } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import { FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDizgo, type DizgoProps } from './useDizgo'
import { ReactComponent as IconDots } from '@/assets/icons/dots.svg'

export const Dizgo = (props: DizgoProps) => {
  const { t } = useTranslation()
  const {
    form,
    dizgoData,
    dizgo,
    upload,
    onSubmit,
    isLoading,
    handleClick,
    handleDelete,
    deleteMutation,
    roboMarket,
  } = useDizgo(props)

  return (
    <Box className='content'>
      <Wrapper>
        <FormProvider {...form}>
          <Stack component='form' onSubmit={form.handleSubmit(onSubmit)}>
            {dizgoData.isLoading ? (
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
                      <img src={roboMarket.data?.data.icon} alt={roboMarket.data?.data.name} />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Typography variant='title50'>Dizgo</Typography>
                    </Stack>
                  </Stack>
                  {dizgoData.data?.data?.dizgo?.username ? (
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
                  {!upload.value && dizgoData.data?.data?.dizgo?.username ? (
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
                          name='username'
                          label='username'
                          control={form.control}
                          placeholder='enter_username'
                        />
                        <Input
                          fullWidth
                          name='password'
                          label='password'
                          control={form.control}
                          placeholder='enter_password'
                        />
                      </Stack>
                      <Stack gap='14px' justifyContent='flex-end' direction='row'>
                        {dizgoData.data?.data?.dizgo?.username && (
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
                          loading={dizgo.isLoading || isLoading}
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
  )
}
