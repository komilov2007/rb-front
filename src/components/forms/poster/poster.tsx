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
import ImagePoster from '@/assets/images/poster.jpg'
import { usePoster, type PosterProps } from './usePoster'
import { SelectSpot } from '@/components/selects/select-spot'
import { ReactComponent as IconDots } from '@/assets/icons/dots.svg'
import { SelectSources } from '@/components/selects/select-poster-sources'

export const Poster = (props: PosterProps) => {
  const { t } = useTranslation()
  const {
    form,
    token,
    poster,
    upload,
    onSubmit,
    isLoading,
    handleClick,
    handleDelete,
    deleteMutation,
  } = usePoster(props)

  return (
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
                      <img src={ImagePoster} alt='poster' />
                    </Stack>
                    <Stack justifyContent='center'>
                      <Typography variant='title50'>Poster</Typography>
                      <Typography variant='text270' maxWidth='300px'>
                        {t(
                          'you_can_download_the_attached_example_and_use_them_as_a_starting_pint_for_your_own_file',
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                  {token.data?.data.poster.token ? (
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
                  {!upload.value && token.data?.data.poster.token ? (
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
                          name='token'
                          label='token'
                          control={form.control}
                          placeholder='enter_token'
                        />
                        <SelectSources />
                        <SelectSpot branches={token.data?.data.poster.branches ?? []} />
                      </Stack>
                      <Stack gap='14px' justifyContent='flex-end' direction='row'>
                        {token.data?.data?.poster?.token &&
                          token.data?.data?.poster?.token?.length > 0 && (
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
  )
}
