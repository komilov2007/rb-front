import Box from '@mui/material/Box'
import { DOMAINS } from './constants'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import { Input } from '@/components/inputs/input'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import { DeleteWebsite } from '@/components/deletes/website'
import FormControlLabel from '@mui/material/FormControlLabel'
import { InstructionWebsite } from '@/components/instructions/website'
import { type FormWebsiteProps, useFormWebsite } from './useFormWebsite'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'

const Page = (props: FormWebsiteProps) => {
  const { t } = useTranslation()
  const { form, detail, onSubmit, isLoading, SUB_DOMAIN, isVariantAdmin } = useFormWebsite(props)
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))

  return (
    <Stack
      component='form'
      onSubmit={form.handleSubmit(onSubmit)}
      className={isVariantAdmin ? '' : 'scrollPageLayout'}
      sx={{
        padding: isVariantAdmin ? { xs: '0', md: '24px' } : 0,
        alignItems: isVariantAdmin ? 'flex-start' : 'center',
      }}
    >
      <>
        {detail.isLoading || detail.isFetching ? (
          <Spinner center />
        ) : (
          <Box width='100%' maxWidth='598px' mt={props.variant === 'auth' ? '50px' : ''}>
            <FormControl fullWidth component='fieldset' sx={{ mb: '30px' }}>
              <FormLabel component='legend'>{t('do_you_have_your_own_domain')}</FormLabel>
              <Controller
                name='is_sub'
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    sx={{
                      gap: '0 120px',
                    }}
                    row
                    {...field}
                  >
                    {subscription?.tariff === 'START' ? (
                      <>
                        <FormControlLabel value={'NO'} control={<Radio />} label={t('no')} />
                        <FormControlLabel
                          onClick={() => {
                            setSubscriptionModal(true)
                          }}
                          control={
                            <IconButton>
                              <Box
                                sx={theme => ({
                                  border: `1px solid ${theme.palette.colors['L-GRAY30-D-WHITE20']}`,
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                })}
                              />
                            </IconButton>
                          }
                          label={t('i_have')}
                        />
                      </>
                    ) : (
                      Object.values(DOMAINS).map(({ value, label }) => {
                        return (
                          <FormControlLabel
                            key={value}
                            value={value}
                            control={<Radio />}
                            label={t(label)}
                          />
                        )
                      })
                    )}
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Stack mb='21px' width='100%' direction='row'>
              {form.watch('is_sub') === 'YES' && (
                <Input
                  fullWidth
                  name='domain'
                  label='domain'
                  control={form.control}
                  placeholder='enter_domain'
                  sx={{
                    input: {
                      textTransform: 'lowercase',
                    },
                  }}
                />
              )}
              {form.watch('is_sub') === 'NO' && (
                <>
                  <Input
                    fullWidth
                    name='sub_domain'
                    label='sub_domain'
                    control={form.control}
                    placeholder='enter_sub_domain'
                    sx={{
                      input: {
                        textTransform: 'lowercase',
                      },
                    }}
                  />
                  <Typography ml='10px' mt='35px'>
                    {SUB_DOMAIN}
                  </Typography>
                </>
              )}
            </Stack>
            {form.watch('is_sub') === 'YES' && <InstructionWebsite />}
            {!isVariantAdmin && (
              <Box
                mt='100px'
                gap='20px'
                width='100%'
                display='flex'
                alignItems='center'
                justifyContent='flex-end'
              >
                <Button
                  size='large'
                  component={Link}
                  variant='text-gray'
                  startIcon={<IconArrowLeft />}
                  to={`${ROUTER.SIGN_UP}${ROUTER.BUSINESS_DETAILS}`}
                >
                  {t('back')}
                </Button>
                <LoadingButton
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isLoading}
                  sx={{ maxWidth: '190px' }}
                >
                  {t('next')}
                </LoadingButton>
              </Box>
            )}
            {isVariantAdmin && (
              <Stack width='100%' maxWidth='1110px' alignItems='flex-end'>
                <Stack
                  mt='122px'
                  gap='14px'
                  width='100%'
                  direction='row'
                  maxWidth={props.noDelete ? '316px' : '481px'}
                  sx={theme => ({
                    [theme.breakpoints.down('md')]: {
                      mt: '22px',
                      display: 'grid',
                      maxWidth: '100%',
                      gridTemplateColumns: '1fr 1fr',
                      'button:nth-child(2)': {
                        gridRow: 2,
                      },
                      'button:nth-child(3)': {
                        gridRow: 'span 2',
                      },
                    },
                  })}
                >
                  <Button
                    fullWidth
                    component={Link}
                    variant='outlined-transparent'
                    to={`${ROUTER.ADMIN}/${ROUTER.PLATFORMS}/${ROUTER.WEBSITE}`}
                  >
                    {t('cancel')}
                  </Button>
                  {!props.noDelete && <DeleteWebsite variant='website' />}
                  <LoadingButton fullWidth type='submit' variant='contained' loading={isLoading}>
                    {t('save')}
                  </LoadingButton>
                </Stack>
              </Stack>
            )}
          </Box>
        )}
      </>
    </Stack>
  )
}

export default Page
