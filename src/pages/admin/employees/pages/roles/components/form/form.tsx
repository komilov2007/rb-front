import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import MuiTable from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import { Spinner } from '@/components/spinner'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Input } from '@/components/inputs/input'
import LoadingButton from '@mui/lab/LoadingButton'
import TableContainer from '@mui/material/TableContainer'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormRole, type FormRoleProps } from './useFormRole'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { ReactComponent as IconEdit } from '@/assets/icons/edit.svg'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconCheckboxClear } from '@/assets/icons/checkbox-clear.svg'

export const Form = (props: FormRoleProps) => {
  const { t } = useTranslation()
  const {
    form,
    value,
    fields,
    values,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    dataDetail,
    isFetching,
    handleOpen,
    handleChange,
    isLoadingDetail,
    handleChangeUpdate,
  } = useFormRole(props)

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
            {t('add_role')}
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
                {t(props.variant === 'add' ? 'add_role' : 'edit_role')}
              </Typography>
              <IconButton onClick={setFalse}>
                <IconRemove />
              </IconButton>
            </Box>
            {(isLoadingDetail || isFetching) && props.variant === 'edit' ? (
              <Spinner center />
            ) : (
              <>
                <Box
                  className='content'
                  sx={{
                    p: '0 !important',
                    overflow: 'hidden',
                    height: dataDetail?.data.is_admin ? '100% !important' : undefined,
                  }}
                >
                  <Stack px='32px'>
                    <Input
                      fullWidth
                      name='name'
                      label='name'
                      control={form.control}
                      placeholder='enter_name'
                    />
                  </Stack>
                  <TableContainer>
                    <MuiTable
                      aria-label='menu-table'
                      sx={{ m: '28px 0', width: '100%', overflowX: 'auto' }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>{t('menu')}</TableCell>
                          <TableCell>
                            <FormControlLabel
                              label={t('view')}
                              control={
                                <Checkbox
                                  name='view'
                                  onChange={handleChange}
                                  checked={values.allView || values.oneView}
                                  checkedIcon={values.oneView ? <IconCheckboxClear /> : undefined}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              disabled={
                                form.watch('menu_permissions').filter(m => m.can_view).length === 0
                              }
                              label={t('edit')}
                              control={
                                <Checkbox
                                  name='edit'
                                  onChange={handleChange}
                                  checked={values.allEdit || values.oneEdit}
                                  checkedIcon={values.oneEdit ? <IconCheckboxClear /> : undefined}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              disabled={
                                form.watch('menu_permissions').filter(m => m.can_view).length === 0
                              }
                              label={t('delete')}
                              control={
                                <Checkbox
                                  name='delete'
                                  onChange={handleChange}
                                  checked={values.allDelete || values.oneDelete}
                                  checkedIcon={values.oneDelete ? <IconCheckboxClear /> : undefined}
                                />
                              }
                            />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {fields.map((f, index) => (
                          <TableRow key={f.id}>
                            <TableCell>
                              <Typography>{t(f.slug)}</Typography>
                            </TableCell>
                            <TableCell>
                              <InputCheckbox
                                label=''
                                control={form.control}
                                id={`can_view.${index}`}
                                onChange={handleChangeUpdate('view', index)}
                                name={`menu_permissions.${index}.can_view`}
                              />
                            </TableCell>
                            <TableCell>
                              <InputCheckbox
                                label=''
                                control={form.control}
                                id={`can_view.${index}`}
                                onChange={handleChangeUpdate('edit', index)}
                                name={`menu_permissions.${index}.can_edit`}
                                disabled={!form.watch(`menu_permissions.${index}.can_view`)}
                              />
                            </TableCell>
                            <TableCell>
                              <InputCheckbox
                                label=''
                                control={form.control}
                                id={`can_view.${index}`}
                                onChange={handleChangeUpdate('delete', index)}
                                name={`menu_permissions.${index}.can_delete`}
                                disabled={!form.watch(`menu_permissions.${index}.can_view`)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </MuiTable>
                  </TableContainer>
                </Box>
                {!dataDetail?.data.is_admin && (
                  <Box className='footer'>
                    <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                      <Button fullWidth variant='outlined-transparent' onClick={setFalse}>
                        {t('cancel')}
                      </Button>
                      <LoadingButton
                        fullWidth
                        type='submit'
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
