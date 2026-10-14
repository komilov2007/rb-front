import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Spinner } from '@/components/spinner'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Input } from '@/components/inputs/input'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { Select } from '@/components/selects/select'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputPhone } from '@/components/inputs/input-phone'
import { InputPassword } from '@/components/inputs/input-password'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { useFormEmployee, type FormEmployeeProps } from './useFormEmployee'
import { pastedPhone } from '@/utils/clipboard'

export const Form = (props: FormEmployeeProps) => {
  const { t } = useTranslation()
  const {
    data,
    form,
    value,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    isFetching,
    handleOpen,
    isLoadingDetail,
  } = useFormEmployee(props)

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
            {t('add_employee')}
          </Button>
        </>
      ) : (
        <IconButton radius='8px' onClick={setTrue}>
          <IconEdit />
        </IconButton>
      )}
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
              <Typography variant='title30'>
                {t(props.variant === 'add' ? 'add_employee' : 'edit_employee')}
              </Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            {props.variant === 'edit' && isFetching && isLoadingDetail ? (
              <Spinner center />
            ) : (
              <>
                <Box
                  className='content'
                  sx={{
                    height: data?.data.is_admin ? '100% !important' : undefined,
                  }}
                >
                  <Stack gap='24px'>
                    <Input
                      fullWidth
                      name='firstname'
                      label='first_name'
                      control={form.control}
                      placeholder='enter_first_name'
                    />
                    <InputPhone
                      fullWidth
                      name='phone'
                      label='phone_number'
                      control={form.control}
                      placeholder='enter_phone_number'
                      onPaste={async event => {
                        form.setValue('phone', await pastedPhone(event))
                      }}
                    />
                    {props.variant === 'add' && (
                      <>
                        <InputPassword
                          fullWidth
                          name='password'
                          control={form.control}
                          placeholder='password'
                          label='create_new_password'
                          onChange={e => {
                            const cleaned = e.target.value.replace(/\s/g, '')
                            form.setValue('password', cleaned, { shouldValidate: true })
                          }}
                        />
                        <InputPassword
                          fullWidth
                          name='confirm_password'
                          placeholder='password'
                          control={form.control}
                          label='repeat_new_password'
                          onChange={e => {
                            const cleaned = e.target.value.replace(/\s/g, '')
                            form.setValue('confirm_password', cleaned, { shouldValidate: true })
                          }}
                        />
                      </>
                    )}
                    <Select
                      name='role'
                      label='role'
                      control={form.control}
                      placeholder='select_role'
                      options={props.data.map(({ id, name }) => ({ value: id, label: name }))}
                    />
                  </Stack>
                </Box>
                {!data?.data.is_admin && (
                  <Box className='footer'>
                    <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                      <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                        {t('cancel')}
                      </Button>
                      <LoadingButton
                        type='submit'
                        fullWidth
                        variant='contained'
                        loading={isLoading}
                      >
                        {t(props.variant === 'add' ? 'add' : 'edit')}
                      </LoadingButton>
                    </Stack>
                  </Box>
                )}
              </>
            )}
          </Box>
        </FormProvider>
      </SwipeableDrawer>
    </>
  )
}
