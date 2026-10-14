import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import { FormProvider } from 'react-hook-form'
import { Input } from '@/components/inputs/input'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { ReactComponent as IconDots } from '@/assets/icons/dots.svg'
import { useFormSmartUp, type FormSmartUpProps } from './useFormSmartUp'
import { SelectSmartUpPrice } from '@/components/selects/select-smart-up-price'

export const FormSmartUp = (props: FormSmartUpProps) => {
  const {
    t,
    form,
    data,
    upload,
    smartUp,
    onSubmit,
    isLoading,
    handleClick,
    handleDelete,
    importSmartUpData,
    deleteMutationSmartUp,
  } = useFormSmartUp(props)

  return (
    <FormProvider {...form}>
      <Box component='form' onSubmit={form.handleSubmit(onSubmit)}>
        <Box>
          {isLoading ? (
            <Skeleton height='100px' width='100%' variant='rounded' />
          ) : (
            <>
              <Stack direction='row' justifyContent='space-between'>
                <Stack gap='10px' direction='row'>
                  <img
                    src={props.icon}
                    alt={props.name}
                    style={{ width: '36px', height: '36px', borderRadius: '4px' }}
                  />
                  <Stack justifyContent='center'>
                    <Typography variant='title50'>Smart up</Typography>
                    <Typography variant='text270' maxWidth='300px'>
                      {props.desc}
                    </Typography>
                  </Stack>
                </Stack>
                {data?.data.login ? (
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
                {!upload.value && data?.data.login ? (
                  <Stack gap='14px' justifyContent='flex-end' direction='row'>
                    <LoadingButton
                      size='small'
                      variant='filled-red'
                      sx={{ minWidth: '130px' }}
                      onClick={handleDelete}
                      loading={deleteMutationSmartUp.isLoading}
                    >
                      {t('delete')}
                    </LoadingButton>
                    <LoadingButton
                      size='small'
                      variant='contained'
                      onClick={handleClick}
                      sx={{ minWidth: '130px' }}
                      loading={importSmartUpData.isLoading}
                    >
                      {t('import')}
                    </LoadingButton>
                  </Stack>
                ) : (
                  <>
                    <Stack gap='15px'>
                      <Input
                        fullWidth
                        name='login'
                        label='Login'
                        control={form.control}
                        placeholder='Enter login'
                      />
                      <Input
                        fullWidth
                        name='password'
                        label='password'
                        control={form.control}
                        placeholder='enter_password'
                      />
                      <Input
                        fullWidth
                        name='fillial'
                        label='<Организация ID>'
                        control={form.control}
                        placeholder='enter_organization'
                      />
                      <Input
                        fullWidth
                        name='warehouse'
                        label='<Склад kod>'
                        control={form.control}
                        placeholder='enter_warehouse_code'
                      />
                      <Input
                        fullWidth
                        name='robot'
                        label='<Штат kod>'
                        control={form.control}
                        placeholder='Enter robot'
                      />
                      <SelectSmartUpPrice />
                    </Stack>
                    <Stack gap='14px' justifyContent='flex-end' direction='row'>
                      {data?.data.login && (
                        <LoadingButton
                          size='small'
                          variant='filled-red'
                          sx={{ minWidth: '130px' }}
                          onClick={handleDelete}
                          loading={deleteMutationSmartUp.isLoading}
                        >
                          {t('delete')}
                        </LoadingButton>
                      )}
                      <LoadingButton
                        size='small'
                        type='submit'
                        variant='contained'
                        sx={{ minWidth: '130px' }}
                        loading={smartUp.isLoading}
                      >
                        {t('install')}
                      </LoadingButton>
                    </Stack>
                  </>
                )}
              </Stack>
            </>
          )}
        </Box>
      </Box>
    </FormProvider>
  )
}
