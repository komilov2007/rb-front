import { Card } from './style'
import { lazy, Suspense } from 'react'
import Box from '@mui/material/Box'
import { PickUp } from '../pick-up'
import { Delivery } from '../delivery'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { FormProvider } from 'react-hook-form'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
// import { Schedules } from '@/components/forms/schedules'
import { TabLanguages } from '@/components/tab-languages'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { useFormBranch, type FormBranchProps } from './useFormBranch'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
const Map = lazy(async () => await import('@/components/forms/map').then(m => ({ default: m.Map })))

export const FormBranch = (props: FormBranchProps) => {
  const { t } = useTranslation()
  const {
    form,
    value,
    fields,
    panels,
    detail,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleOpen,
    serviceRef,
  } = useFormBranch(props)

  const PANELS = panels.map(p => ({
    value: p.value,
    panel: (
      <Input
        fullWidth
        name={p.name}
        label={p.label}
        control={form.control}
        placeholder='enter_branch_name'
      />
    ),
  }))

  const PICKUP_DELIVERY_OPTIONS = [fields[0], fields[1]]
  const isRestaurant = useProfileStore(state => state.me?.business_type === 'RESTAURANT')
  const reservationIndex = fields.findIndex(f => f.type === 'RESERVATION')

  return (
    <>
      {props.variant === 'add' ? (
        <>
          <Button
            onClick={handleOpen}
            startIcon={<IconPlus />}
            sx={theme => ({
              svg: {
                path: {
                  stroke: theme.palette.allColors.WHITE,
                },
              },
            })}
          >
            {t('add_branch')}
          </Button>
        </>
      ) : props.variant === 'create' ? (
        <Button variant='text' size='small' startIcon={<IconPlus />} onClick={handleOpen}>
          {t('add_branch')}
        </Button>
      ) : (
        <IconButton radius='8px' onClick={setTrue}>
          <IconEdit />
        </IconButton>
      )}
      {value && (
        <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
          {props.variant === 'edit' && (detail.isLoading || detail.isFetching) ? (
            <Spinner center />
          ) : (
            <FormProvider {...form}>
              <Box
                className='container'
                component='form'
                onSubmit={onSubmit}
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <Box
                  display='flex'
                  p='7px 7px 0 32px'
                  component='header'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Typography variant='title30'>
                    {t(
                      props.variant === 'add' || props.variant === 'create'
                        ? 'add_branch'
                        : 'edit_branch',
                    )}
                  </Typography>
                  <IconButton onClick={setFalse}>
                    <IconRemove />
                  </IconButton>
                </Box>
                <Box
                  className='content'
                  sx={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    px: '32px',
                    pb: '20px',
                  }}
                >
                  <TabLanguages panels={PANELS} />
                  <Suspense
                    fallback={
                      <Skeleton width='100%' height='350px' variant='rounded' sx={{ mt: '32px' }} />
                    }
                  >
                    <Map isEdit={props.variant === 'edit'} />
                  </Suspense>
                  {props.variant !== 'create' && (
                    <Stack
                      ref={serviceRef}
                      mt='15px'
                      gap='18px'
                      direction='row'
                      sx={{
                        width: '100%',
                        '& > label': {
                          flex: 1,
                          minWidth: 0,
                        },
                      }}
                    >
                      {PICKUP_DELIVERY_OPTIONS.map((f, index) => (
                        <Card key={f.id} htmlFor={`service.${index}.checked`}>
                          <Stack direction='row' alignItems='center'>
                            <Typography
                              p='9px'
                              variant='text'
                              color={theme => theme.palette.allColors.BLACK30}
                            >
                              {t(f.title)}
                            </Typography>
                            {f.type === 'DELIVERY' ? <Delivery status /> : <PickUp status />}
                          </Stack>
                          <InputCheckbox
                            label=''
                            control={form.control}
                            id={`service.${index}.checked`}
                            name={`service.${index}.checked`}
                            error={!!form.formState.errors.service}
                          />
                        </Card>
                      ))}
                    </Stack>
                  )}
                  {props.variant !== 'create' && isRestaurant && reservationIndex > -1 && (
                    <Stack mt='18px'>
                      <Card htmlFor={`service.${reservationIndex}.checked`}>
                        <Typography
                          p='9px'
                          variant='text'
                          color={theme => theme.palette.allColors.BLACK30}
                        >
                          {t(fields[reservationIndex].title)}
                        </Typography>
                        <InputCheckbox
                          label=''
                          control={form.control}
                          id={`service.${reservationIndex}.checked`}
                          name={`service.${reservationIndex}.checked`}
                          error={!!form.formState.errors.service}
                        />
                      </Card>
                    </Stack>
                  )}
                  {/* <Box mt='20px'>
                    <Schedules />
                  </Box> */}
                </Box>
                <Box
                  className='footer'
                  sx={{
                    p: '16px 32px',
                    borderTop: '1px solid #E5EAF2',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexShrink: 0,
                  }}
                >
                  <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                    <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                      {t('cancel')}
                    </Button>
                    <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                      {t(
                        props.variant === 'add'
                          ? 'add'
                          : props.variant === 'create'
                            ? 'save'
                            : 'edit',
                      )}
                    </LoadingButton>
                  </Stack>
                </Box>
              </Box>
            </FormProvider>
          )}
        </SwipeableDrawer>
      )}
    </>
  )
}
