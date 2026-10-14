import { Otp } from './otp'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Alert } from '@/components/alert'
import { ROUTER } from '@/constants/router'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { Trans, useTranslation } from 'react-i18next'
import { CREDIT_CARDS } from '@/constants/credit-card'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { InputCheckbox } from '@/components/inputs/input-checkbox'
import { ReactComponent as IconPlus } from '@/assets/icons/plus.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { useAddCreditCard, type AddCreditCardProps } from './useAddCreditCard'
import { ReactComponent as IconArrowLeft } from '@/assets/icons/arrow-left.svg'
import { InputCreditCardNumber } from '@/components/inputs/input-credit-card-number'
import { InputCreditCardExpiry } from '@/components/inputs/input-credit-card-expiry'

export const AddCreditCard = (props: AddCreditCardProps) => {
  const { t } = useTranslation()
  const {
    form,
    value,
    otpRef,
    setTrue,
    setFalse,
    onSubmit,
    isLoading,
    handleClose,
    handleClick,
    handleUpdate,
    transactionId,
  } = useAddCreditCard(props)

  const examples = () => {
    const cards = Object.values(CREDIT_CARDS).filter(c => c.value !== 'DEFAULT')
    return (
      <Alert>
        <Typography variant='title20'>
          {t('you_can_only_connect_these_cards_at_this_time')}
        </Typography>
        <Stack mt='15px' direction='row' gap='20px'>
          {cards.map(({ Icon, value }) => (
            <Icon key={value} />
          ))}
        </Stack>
      </Alert>
    )
  }

  return (
    <>
      {props.variant === 'header' ? (
        <Stack onClick={setTrue}>{props.children}</Stack>
      ) : props.variant === 'profile' || props.variant === 'profile-empty' ? (
        <Button
          onClick={setTrue}
          startIcon={props.variant === 'profile' ? <IconPlus /> : undefined}
          sx={theme => ({
            svg: {
              path: {
                stroke: theme.palette.allColors.WHITE,
              },
            },
          })}
        >
          {t('add_new_card')}
        </Button>
      ) : (
        <Button
          variant='text'
          onClick={setTrue}
          startIcon={<IconPlus />}
          sx={theme => ({
            svg: {
              path: {
                stroke: theme.palette.allColors.PURPLE,
              },
            },
          })}
        >
          {t('add_new_card')}
        </Button>
      )}
      <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={handleClose}>
        <Box className='container' component='form' onSubmit={onSubmit}>
          <Box
            display='flex'
            p='7px 7px 0 32px'
            component='header'
            alignItems='center'
            justifyContent='space-between'
          >
            <Button onClick={handleClose} variant='text-gray' startIcon={<IconArrowLeft />}>
              {t('back')}
            </Button>
            <IconButton onClick={handleClose}>
              <IconRemove />
            </IconButton>
          </Box>
          <Box className='content'>
            <Stack mb='20px' mt='24px' gap='20px'>
              <InputCreditCardNumber name='card_number' control={form.control} />
              <Stack width='100%' maxWidth='50%'>
                <InputCreditCardExpiry name='expiry' control={form.control} />
              </Stack>
            </Stack>
            <Stack mb='10px'>
              <InputCheckbox
                name='policy'
                control={form.control}
                sx={{
                  '.MuiButtonBase-root': {
                    marginTop: '-9px !important',
                  },
                }}
                label={
                  <Typography variant='text'>
                    <Trans
                      i18nKey='i_have_read_and_agree_to_the_public_offer_and_the_privacy_policy'
                      components={{
                        publicOffer: (
                          <Typography
                            target='_blank'
                            component={Link}
                            to={`${ROUTER.ADMIN}/${ROUTER.PUBLIC_OFFER}`}
                            variant='inherit'
                            sx={theme => ({
                              fontWeight: 500,
                              textDecorationLine: 'underline',
                              color: theme.palette.allColors.PURPLE,
                            })}
                          />
                        ),
                        privacyPolicy: (
                          <Typography
                            target='_blank'
                            component={Link}
                            variant='inherit'
                            to={`${ROUTER.ADMIN}/${ROUTER.PRIVACY_POLICY}`}
                            sx={theme => ({
                              fontWeight: 500,
                              textDecorationLine: 'underline',
                              color: theme.palette.allColors.PURPLE,
                            })}
                          />
                        ),
                      }}
                    />
                  </Typography>
                }
              />
            </Stack>
            {examples()}
          </Box>
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
                onClick={handleClick}
              >
                {t('add')}
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </SwipeableDrawer>
      <Otp ref={otpRef} handleUpdate={handleUpdate} transaction_id={transactionId} />
    </>
  )
}
