import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useFormWolt } from './useFormWolt'
import { Empty } from '@/components/empty'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { Controller, FormProvider } from 'react-hook-form'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Wrapper, RadioGroup, FormControlLabel } from './style'
import type { RoboMarketAppDetaiProps } from '@/types/robo-market'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

export const FormWolt = (props: RoboMarketAppDetaiProps) => {
  const {
    t,
    open,
    form,
    creds,
    modal,
    branches,
    onSubmit,
    saveCreds,
    hasAccess,
    integrate,
    branchList,
    handleDelete,
    handleImport,
    importProduct,
    deleteMutation,
    handleIntegrate,
    isBranchesEmpty,
    handleNavigateToBranches,
  } = useFormWolt()

  return (
    <>
      {creds.isLoading ? (
        <Skeleton height='42px' width='100%' variant='rounded' />
      ) : (
        <LoadingButton
          onClick={handleIntegrate}
          variant='outlined-purple'
          loading={integrate.isLoading}
        >
          {t(hasAccess ? 'installed' : 'install')}
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
                      <Typography variant='title50'>{props.name}</Typography>
                      <Typography variant='text270'>
                        {t(
                          'wolt_is_a_leading_on_demand_delivery_platform_that_connects_restaurants_and_stores_with_customers_enabling_fast_and_reliable_food_and_product_delivery',
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                {open.value || !hasAccess ? (
                  <Stack gap='15px' marginTop={'20px'}>
                    <Typography variant='title20' fontWeight={500}>
                      {t('select_branch')}
                    </Typography>
                    {branches.isLoading ? (
                      <Stack gap='12px'>
                        <Skeleton height='60px' width='100%' variant='rounded' />
                        <Skeleton height='60px' width='100%' variant='rounded' />
                      </Stack>
                    ) : isBranchesEmpty ? (
                      <Stack gap='16px' alignItems='center' py='20px'>
                        <Empty title='no_branches' text='create_branch_to_continue' />
                        <Button variant='contained' onClick={handleNavigateToBranches}>
                          {t('create_branch')}
                        </Button>
                      </Stack>
                    ) : (
                      <Controller
                        name='branch_id'
                        control={form.control}
                        render={({ field }) => (
                          <RadioGroup
                            {...field}
                            value={field.value ?? ''}
                            onChange={e => {
                              field.onChange(Number(e.target.value))
                            }}
                          >
                            {branchList.map(branch => (
                              <FormControlLabel
                                key={branch.id}
                                value={branch.id}
                                active={field.value === branch.id}
                                control={<Radio />}
                                label={
                                  <Stack gap='4px'>
                                    <Typography
                                      variant='title20'
                                      fontWeight={500}
                                      color={theme => theme.palette.allColors.BLACK}
                                    >
                                      {branch.name}
                                    </Typography>
                                    <Typography variant='text'>{branch.address}</Typography>
                                  </Stack>
                                }
                              />
                            ))}
                          </RadioGroup>
                        )}
                      />
                    )}
                    <Stack width='100%' alignItems='flex-end'>
                      <LoadingButton
                        size='small'
                        type='submit'
                        variant='contained'
                        sx={{ minWidth: '130px' }}
                        loading={saveCreds.isLoading}
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
                      loading={deleteMutation.isLoading}
                    >
                      {t('delete')}
                    </LoadingButton>
                    <LoadingButton
                      size='small'
                      variant='contained'
                      onClick={handleImport}
                      sx={{ minWidth: '130px' }}
                      loading={importProduct.isLoading}
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
