import dayjs from 'dayjs'
import { Reject } from '../reject'
import { Status } from '../status'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useDetail } from './useDetail'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import type { ReservationProps } from '@/types/reservation'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import AccordionDetails from '@mui/material/AccordionDetails'
import { InputTextarea } from '@/components/inputs/input-textarea'
import { forwardRef, useImperativeHandle, type ReactNode } from 'react'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { Wrapper, WrapItem, Accordion, FooterItem, AccordionSummary } from './style'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'

interface ItemProps {
  label: string
  children: ReactNode
}

const Item = ({ label, children }: ItemProps) => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Typography component='h4' variant='text110'>
        {t(label)}
      </Typography>
      <Typography
        align='right'
        component='div'
        maxWidth='300px'
        variant='text110'
        sx={{ wordBreak: 'break-word' }}
        color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
      >
        {children}
      </Typography>
    </Wrapper>
  )
}

interface SectionProps {
  title: string
  children: ReactNode
}

const Section = ({ title, children }: SectionProps) => {
  const { t } = useTranslation()

  return (
    <Stack>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<IconDirectionDown />}
          id={`reservation-${title}-header`}
          aria-controls={`reservation-${title}-content`}
        >
          <Typography variant='title20' fontWeight='500'>
            {t(title)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={theme => ({
            borderRadius: '0 0 7px 7px',
            backgroundColor: theme.palette.colors['L-WHITE-D-GRAY40'],
          })}
        >
          <Stack gap='16px' p='5px 0 4px'>
            {children}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}

const Phone = ({ phone }: { phone: string }) => {
  const value = phone.startsWith('+') ? phone : `+${phone}`

  return (
    <Typography component='a' variant='inherit' color='inherit' href={`tel:${value}`}>
      {value}
    </Typography>
  )
}

export const Detail = forwardRef((_, ref) => {
  const { t } = useTranslation()
  const can_edit = useProfileStore(state => state.getPermission('orders', 'can_edit'))
  const { form, value, values, setRow, setTrue, setFalse, onSubmit, isLoading } = useDetail()
  const canAnswer = can_edit && values?.status === 'PENDING'
  const hasAnswer = !!(values?.seller_comment || values?.answered_at || values?.cancelled_at)

  useImperativeHandle(ref, () => {
    return {
      setTrue(row: ReservationProps) {
        setRow(row)
        setTrue()
      },
    }
  }, [setRow, setTrue])

  return (
    <SwipeableDrawer open={value} anchor='right' onOpen={setTrue} onClose={setFalse}>
      {values && (
        <Box className='container'>
          <Box
            display='flex'
            p='7px 7px 0 32px'
            component='header'
            alignItems='center'
            justifyContent='space-between'
          >
            <Stack gap='12px' direction='row' alignItems='center'>
              <Typography variant='title30'>
                {t('reservation')} #{values.id}
              </Typography>
              <Status status={values.status} />
            </Stack>
            <IconButton onClick={setFalse}>
              <IconRemove />
            </IconButton>
          </Box>
          <Box className='content'>
            <Stack mt='15px' gap='17px'>
              <WrapItem>
                <Stack p='16px' gap='16px'>
                  <Typography variant='title20' fontWeight='500'>
                    {t('reservation_details')}
                  </Typography>
                  <Item label='guests_count'>{values.guests}</Item>
                  <Item label='branch'>{values.branch.name}</Item>
                  {values.branch.address && <Item label='address'>{values.branch.address}</Item>}
                  <Item label='created_date'>
                    {dayjs(values.created_at).format('DD.MM.YYYY, HH:mm')}
                  </Item>
                </Stack>
                <FooterItem>
                  <Typography variant='title20' fontSize='14px'>
                    {t('reservation_date')}
                  </Typography>
                  <Typography variant='title160' fontWeight='700' letterSpacing='0.056px'>
                    {dayjs(values.date).format('DD.MM.YYYY')}, {values.time.slice(0, 5)}
                  </Typography>
                </FooterItem>
              </WrapItem>
              <Section title='customer_info'>
                <Item label='customer_name'>{values.name}</Item>
                <Item label='phone_number'>
                  <Phone phone={values.phone} />
                </Item>
                {values.extra_phone && (
                  <Item label='additional_phone_number'>
                    <Phone phone={values.extra_phone} />
                  </Item>
                )}
                <Item label='customer_comment'>{values.comment || '-'}</Item>
              </Section>
              {hasAnswer && (
                <Section title='answer'>
                  {values.seller_comment && (
                    <Item label='reservation_seller_comment'>{values.seller_comment}</Item>
                  )}
                  {values.answered_at && (
                    <Item label='reservation_answered_at'>
                      {dayjs(values.answered_at).format('DD.MM.YYYY, HH:mm')}
                    </Item>
                  )}
                  {values.cancelled_at && (
                    <Item label='reservation_cancelled_at'>
                      {dayjs(values.cancelled_at).format('DD.MM.YYYY, HH:mm')}
                    </Item>
                  )}
                </Section>
              )}
              {canAnswer && (
                <InputTextarea
                  name='seller_comment'
                  control={form.control}
                  sx={{ height: '120px' }}
                  label='reservation_seller_comment'
                  placeholder='reservation_seller_comment_placeholder'
                  labelMinimum={`${form.watch('seller_comment')?.length ?? 0}/500`}
                />
              )}
            </Stack>
          </Box>
          {canAnswer && (
            <Box className='footer'>
              <Stack gap='14px' width='100%' direction='row' maxWidth='316px'>
                <Reject id={values.id} variant='modal' handleUpdate={setFalse} />
                <LoadingButton
                  fullWidth
                  variant='contained'
                  loading={isLoading}
                  onClick={onSubmit('ACCEPTED')}
                >
                  {t('reservation_accept')}
                </LoadingButton>
              </Stack>
            </Box>
          )}
        </Box>
      )}
    </SwipeableDrawer>
  )
})
