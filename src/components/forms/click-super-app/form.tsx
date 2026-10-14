import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { Controller } from 'react-hook-form'
import { Spinner } from '@/components/spinner'
import { Input } from '@/components/inputs/input'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormClickSuperApp, type FormClickSuperAppProps } from './useFormClickSuperApp'

export const FormClickSuperApp = (props: FormClickSuperAppProps) => {
  const { t, form, onSubmit, isLoading, clickSuperApp } = useFormClickSuperApp(props)

  return (
    <Box className='container' component='form' onSubmit={form.handleSubmit(onSubmit)}>
      <Box className='content'>
        {isLoading ? (
          <Spinner center />
        ) : (
          <Stack gap='15px'>
            <Controller
              name='natural'
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <RadioGroup error={fieldState.invalid} {...field}>
                    <Stack>
                      <Typography component='h2'>{t('activity_type')}</Typography>
                      <Stack direction='row' sx={{ ml: '-9px', gap: '25px', flexWrap: 'nowrap' }}>
                        <FormControlLabel
                          value='legal'
                          control={<Radio />}
                          label={t('legal_entity')}
                        />
                        <FormControlLabel
                          value='individual'
                          control={<Radio />}
                          label={t('individual')}
                        />
                      </Stack>
                    </Stack>
                  </RadioGroup>
                )
              }}
            />
            <Input
              fullWidth
              name='name'
              control={form.control}
              placeholder='enter_name'
              label={form.watch('natural') === 'individual' ? 'name' : 'company_name'}
            />
            <Input
              fullWidth
              name='tin_or_pinfl'
              control={form.control}
              placeholder='enter_tinpinfl'
              label={form.watch('natural') === 'individual' ? 'PINFL' : 'TIN'}
            />
            <Input fullWidth name='mfo' label='MFO' control={form.control} placeholder='MFO' />
            <Input
              fullWidth
              name='bank_account'
              label='bank_account'
              control={form.control}
              placeholder='enter_bank_account'
            />
            <Input
              fullWidth
              name='address'
              label='address'
              control={form.control}
              placeholder='enter_address'
            />
            <Input
              fullWidth
              name='phone'
              label='phone_number'
              control={form.control}
              placeholder='enter_phone'
            />
          </Stack>
        )}
      </Box>
      <Box className='footer'>
        <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
          <Button fullWidth variant='outlined-transparent' onClick={props.onClose}>
            {t('cancel')}
          </Button>
          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            loading={clickSuperApp.isLoading}
          >
            {t('send')}
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  )
}
