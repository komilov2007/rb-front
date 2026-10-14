import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { OrderAction } from '../action'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { Steps } from './components/steps'
import { Bonus } from '@/components/bonus'
import { ROUTER } from '@/constants/router'
import { Yandex } from './components/yandex'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@/components/spinner'
import { FormProvider } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { useBoolean } from '@/hooks/useBoolean'
import { Comments } from './components/comments'
import { Products } from './components/products'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import { type ServiceProps } from '@/types/branch'
import { PAYMENT_TYPES } from '@/constants/payment'
import type { OrderListProps } from '@/types/order'
import { numberFormat } from '@/utils/number-format'
import { DELIVERY_TYPES } from '@/constants/delivery'
import { PrintCheck } from './components/print-check'
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { OrderStatus } from '@/components/orders/status'
import { useDetail, type DetailProps } from './useDetail'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Subcription } from '@/components/modals/subcription'
import AccordionDetails from '@mui/material/AccordionDetails'
import { SelectCourier } from '@/components/selects/select-courier'
import { ReactComponent as IconChat } from '@/assets/icons/chat.svg'
import { ReactComponent as IconClose } from '@/assets/icons/close.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { ReactComponent as IconUzum } from '@/assets/icons/uzum.svg'
import { ReactComponent as IconYandexMap } from '@/assets/icons/yandex-map.svg'
import { ReactComponent as IconGoogleMap } from '@/assets/icons/google-map.svg'
import { ReactComponent as IconRemoveCircle } from '@/assets/icons/remove-circle.svg'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import {
  WrapMap,
  Wrapper,
  WrapItem,
  Accordion,
  FooterItem,
  WrapPercent,
  WrapIconMap,
  AccordionSummary,
} from './style'

const DELIVERIES = [
  'DELIVERY',
  'UZPOST_DELIVERY',
  'NOOR_DELIVERY',
  'YANDEX_DELIVERY',
  'TEZBOR_STANDARD',
  'TEZBOR_EXPRESS',
  'FARGO_DELIVERY',
  'BTS_DELIVERY',
  'EMU_DELIVERY',
  'BTS_PICKUP',
] as ServiceProps[]
const PICKUPS = ['PICKUP', 'BTS_PICKUP'] as ServiceProps[]

export const OrderDetail = forwardRef((props: DetailProps, ref) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const noorDelivery = useBoolean()
  const phoneRef = useRef<HTMLDivElement>(null)
  const [isPhoneHighlighted, setIsPhoneHighlighted] = useState(false)
  const { row, form, value, values, setRow, setTrue, setFalse, isLoading } = useDetail()
  const can_edit = useProfileStore(state => state.getPermission('orders', 'can_edit'))
  const isContact =
    !row?.is_paid &&
    row?.status === 'NEW' &&
    (row?.payment_type === 'PAYME_API' ||
      row?.payment_type === 'ROBO_CLICK' ||
      row?.payment_type === 'ROBO_UZUM' ||
      row?.payment_type === 'ROBO_PAYME' ||
      row?.payment_type === 'CLICK_API' ||
      row?.payment_type === 'CLICK_SUPERAPP' ||
      row?.payment_type === 'ZOOMRAD_MINIAPP')

  useEffect(() => {
    if (value && isContact && !isLoading) {
      setTimeout(() => {
        phoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setIsPhoneHighlighted(true)
        setTimeout(() => {
          setIsPhoneHighlighted(false)
        }, 2000)
      }, 100)
    }
  }, [value, isContact, isLoading])

  useImperativeHandle(ref, () => {
    return {
      setTrue(row: OrderListProps) {
        setRow(row)
        setTrue()
      },
    }
  }, [setRow, setTrue])

  return (
    <>
      <SwipeableDrawer
        open={value}
        anchor='right'
        className='fit'
        onOpen={setTrue}
        onClose={setFalse}
      >
        {!row?.is_visible ? (
          <Subcription
            variant='drawer'
            title='Order_limit_reached'
            description='Youre_currently_on_the_Start_plan_which_allows_up_to_10_orders_per_month'
          />
        ) : (
          <FormProvider {...form}>
            <Box className='container'>
              <Box
                display='flex'
                p='7px 7px 0 32px'
                component='header'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography />
                <IconButton onClick={setFalse}>
                  <IconRemove />
                </IconButton>
              </Box>
              {isLoading ? (
                <Spinner center />
              ) : (
                <>
                  <Box className='content'>
                    <Stack mt='5px' gap='46px'>
                      <Steps {...values} />
                      <Stack gap='17px'>
                        <WrapItem>
                          <Stack p='16px'>
                            <Stack gap='20px' direction='row'>
                              <Typography mb='12px' variant='title20' fontWeight='500'>
                                {t('detail_items')}
                              </Typography>
                              {values.order_details.shipping_datetime && (
                                <Stack gap='5px' direction='row'>
                                  <Typography component='h4' variant='text110'>
                                    {values.order_details.service_type === 'PICKUP'
                                      ? t('pick_up_time')
                                      : t('delivery_time')}
                                    :
                                  </Typography>
                                  <Stack
                                    p='3px'
                                    mt='-3px'
                                    height='fit-content'
                                    alignItems='center'
                                    justifyContent='center'
                                    sx={theme => ({
                                      border: `1px solid ${theme.palette.allColors.PURPLE}`,
                                    })}
                                  >
                                    <Typography
                                      component='p'
                                      variant='text110'
                                      color={theme => theme.palette.allColors.PURPLE}
                                    >
                                      {dayjs(values.order_details.shipping_datetime).format(
                                        'DD-MM-YYYY HH:mm',
                                      )}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              )}
                            </Stack>
                            {values?.order_details.operator && (
                              <Wrapper sx={{ mb: '15px' }}>
                                <Typography component='h4' variant='text110'>
                                  {t('operator')}
                                </Typography>
                                <Typography
                                  component='p'
                                  align='right'
                                  variant='text110'
                                  fontWeight='500'
                                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                >
                                  {values?.order_details.operator}
                                </Typography>
                              </Wrapper>
                            )}
                            <Products {...values} />
                            <Stack mt='19px' gap='16px'>
                              <Wrapper>
                                <Typography component='h4' variant='text110'>
                                  {t('subtotal')}
                                </Typography>
                                <Typography
                                  component='p'
                                  align='right'
                                  variant='text110'
                                  fontWeight='500'
                                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                >
                                  {numberFormat(values.items.subtotal)} {values.items.currency.code}
                                </Typography>
                              </Wrapper>
                              <Stack gap='20px' direction='row' justifyContent='space-between'>
                                <Typography component='h4' variant='text110'>
                                  {t('delivery')}
                                </Typography>
                                <Typography
                                  component='p'
                                  align='right'
                                  fontWeight='500'
                                  variant='text110'
                                  color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                >
                                  {numberFormat(values.items.delivery_price)}{' '}
                                  {values.items.currency.code}
                                </Typography>
                              </Stack>
                              {values?.used_ball !== 0 && (
                                <Stack gap='20px' direction='row' justifyContent='space-between'>
                                  <Typography component='h4' variant='text110'>
                                    {t('bonus_point')}
                                  </Typography>
                                  <Bonus value={`-${values?.used_ball}`} />
                                </Stack>
                              )}
                              {values.items.promo_code && (
                                <Stack gap='20px' direction='row' justifyContent='space-between'>
                                  <Stack gap='9px' direction='row' alignItems='center'>
                                    <Typography component='h4' variant='text110'>
                                      {t('discount')}
                                    </Typography>
                                    {values.items.promo_code.type === 'PERCENT' && (
                                      <WrapPercent>-{values.items.promo_code.percent}%</WrapPercent>
                                    )}
                                  </Stack>
                                  <Typography
                                    component='p'
                                    align='right'
                                    fontWeight='500'
                                    variant='text110'
                                    color={theme => theme.palette.allColors.RED}
                                  >
                                    -{numberFormat(values.items.discount_amount)}
                                    {values.items.currency.code}
                                  </Typography>
                                </Stack>
                              )}
                              {values.order_details.uzum_nasiya && (
                                <Stack
                                  gap='10px'
                                  mt='2px'
                                  pl='12px'
                                  sx={theme => ({
                                    borderLeft: `3px solid ${theme.palette.allColors.PURPLE}`,
                                  })}
                                >
                                  <Stack direction='row' alignItems='center' gap='8px'>
                                    <Box
                                      width='22px'
                                      height='22px'
                                      display='flex'
                                      alignItems='center'
                                      borderRadius='50%'
                                      justifyContent='center'
                                      sx={theme => ({
                                        backgroundColor: theme.palette.allColors.WHITE,
                                        svg: { width: '24px', height: '24px' },
                                      })}
                                    >
                                      <IconUzum />
                                    </Box>
                                    <Typography
                                      component='h4'
                                      variant='text110'
                                      fontWeight='600'
                                      color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                    >
                                      Uzum Nasiya
                                    </Typography>
                                  </Stack>
                                  <Wrapper>
                                    <Typography component='h4' variant='text110'>
                                      {t('monthly_payment')}
                                    </Typography>
                                    <Typography
                                      component='p'
                                      align='right'
                                      maxWidth='300px'
                                      variant='text110'
                                      fontWeight='600'
                                      color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                    >
                                      {numberFormat(values.order_details.uzum_nasiya.price_month)}{' '}
                                      {values.items.currency.code}
                                    </Typography>
                                  </Wrapper>
                                  <Wrapper>
                                    <Typography component='h4' variant='text110'>
                                      {t('total')}
                                    </Typography>
                                    <Typography
                                      component='p'
                                      align='right'
                                      maxWidth='300px'
                                      variant='text110'
                                      fontWeight='600'
                                      color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                    >
                                      {numberFormat(values.order_details.uzum_nasiya.total)}{' '}
                                      {values.items.currency.code}
                                    </Typography>
                                  </Wrapper>
                                </Stack>
                              )}
                            </Stack>
                          </Stack>
                          <FooterItem>
                            <Typography variant='title20' fontSize='14px'>
                              {t('total')}
                            </Typography>
                            <Stack alignItems='flex-end'>
                              <Typography
                                variant='title160'
                                fontWeight='700'
                                letterSpacing='0.056px'
                                sx={{
                                  textDecoration: values.order_details.uzum_nasiya
                                    ? 'line-through'
                                    : 'none',
                                }}
                              >
                                {numberFormat(values.items.amount)} {values.items.currency.code}
                              </Typography>
                              {values.order_details.uzum_nasiya && (
                                <Typography
                                  variant='title20'
                                  fontWeight='700'
                                  letterSpacing='0.056px'
                                >
                                  {numberFormat(values.order_details.uzum_nasiya.total)}{' '}
                                  {values.items.currency.code}
                                </Typography>
                              )}
                            </Stack>
                          </FooterItem>
                        </WrapItem>
                        <Stack>
                          <Accordion defaultExpanded>
                            <AccordionSummary
                              id='order-detail-header'
                              expandIcon={<IconDirectionDown />}
                              aria-controls='order-detail-content'
                            >
                              <Typography variant='title20' fontWeight='500'>
                                {t('order_details')}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={theme => ({
                                borderRadius: '0 0 7px 7px',
                                backgroundColor: theme.palette.colors['L-WHITE-D-GRAY40'],
                              })}
                            >
                              <Stack gap='16px' p='5px 0 4px'>
                                <Wrapper>
                                  <Typography component='h4' variant='text110'>
                                    {t('order_id')}
                                  </Typography>
                                  <Typography
                                    component='p'
                                    align='right'
                                    maxWidth='300px'
                                    variant='text110'
                                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                  >
                                    {values.order_details.id}
                                  </Typography>
                                </Wrapper>
                                <Wrapper>
                                  <Typography component='h4' variant='text110'>
                                    {t('customer_name')}
                                  </Typography>
                                  <Stack gap='10px' direction='row' alignItems='center'>
                                    <IconButton
                                      sx={theme => ({
                                        padding: '4px',
                                        background: theme.palette.allColors.PURPLE,
                                        ':hover': {
                                          background: theme.palette.allColors.PURPLE,
                                        },
                                        svg: {
                                          width: '20px',
                                          height: '20px',
                                          path: {
                                            stroke: theme.palette.allColors.WHITE,
                                          },
                                        },
                                      })}
                                      component={Link}
                                      to={`${ROUTER.ADMIN}/${ROUTER.CHAT}/${values.order_details.customer_id}`}
                                    >
                                      <IconChat />
                                    </IconButton>
                                    <Typography
                                      component='p'
                                      align='right'
                                      maxWidth='300px'
                                      variant='text110'
                                      color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                    >
                                      {values.order_details.customer}
                                    </Typography>
                                  </Stack>
                                </Wrapper>
                                <Wrapper
                                  ref={phoneRef}
                                  sx={{
                                    borderRadius: '6px',
                                    padding: isPhoneHighlighted ? '8px' : '0',
                                    border: isPhoneHighlighted
                                      ? `2px solid ${theme.palette.allColors.PURPLE}`
                                      : '2px solid transparent',
                                    backgroundColor: isPhoneHighlighted
                                      ? `${theme.palette.allColors.PURPLE}15`
                                      : 'transparent',
                                    boxShadow: isPhoneHighlighted
                                      ? `0 0 12px ${theme.palette.allColors.PURPLE}40`
                                      : 'none',
                                    animation: isPhoneHighlighted
                                      ? 'pulse 0.8s ease-in-out 2'
                                      : 'none',
                                    transition: 'all 0.5s ease-in-out',
                                    '@keyframes pulse': {
                                      '0%': {
                                        boxShadow: `0 0 0 0 ${theme.palette.allColors.PURPLE}40`,
                                      },
                                      '50%': {
                                        boxShadow: `0 0 16px 4px ${theme.palette.allColors.PURPLE}50`,
                                      },
                                      '100%': {
                                        boxShadow: `0 0 12px 0 ${theme.palette.allColors.PURPLE}40`,
                                      },
                                    },
                                  }}
                                >
                                  <Typography component='h4' variant='text110'>
                                    {t('phone_number')}
                                  </Typography>
                                  <Typography
                                    component='a'
                                    align='right'
                                    maxWidth='300px'
                                    variant='text110'
                                    href={`tel:${values.order_details.phone}`}
                                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                  >
                                    {values.order_details.phone}
                                  </Typography>
                                </Wrapper>
                                <Wrapper>
                                  <Typography component='h4' variant='text110'>
                                    {t('comment')}
                                  </Typography>
                                  <Typography
                                    component='p'
                                    align='right'
                                    maxWidth='300px'
                                    variant='text110'
                                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                  >
                                    {values.order_details.comment ?? '-'}
                                  </Typography>
                                </Wrapper>
                                <Wrapper>
                                  <Typography component='h4' variant='text110'>
                                    {t('current_status')}
                                  </Typography>
                                  <Typography
                                    component='p'
                                    align='right'
                                    maxWidth='300px'
                                    variant='text110'
                                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                  >
                                    {row && <OrderStatus {...row} />}
                                  </Typography>
                                </Wrapper>
                                <Wrapper>
                                  <Typography component='h4' variant='text110'>
                                    {t('payment_type')}
                                  </Typography>
                                  <Typography
                                    component='p'
                                    align='right'
                                    maxWidth='300px'
                                    variant='text110'
                                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                  >
                                    {t(PAYMENT_TYPES[values.order_details.payment_type].label)}
                                  </Typography>
                                </Wrapper>
                                <Wrapper>
                                  <Typography component='h4' variant='text110'>
                                    {t('payment_status')}
                                  </Typography>
                                  <Typography
                                    component='p'
                                    align='right'
                                    maxWidth='300px'
                                    variant='text110'
                                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                  >
                                    {values.order_details.is_paid ? (
                                      t('paid')
                                    ) : (
                                      <Stack gap='4px' direction='row' alignItems='center'>
                                        <Stack>
                                          <IconRemoveCircle />
                                        </Stack>
                                        <Typography
                                          component='span'
                                          variant='inherit'
                                          color={theme => theme.palette.allColors.RED}
                                        >
                                          {t('not_paid')}
                                        </Typography>
                                      </Stack>
                                    )}
                                  </Typography>
                                </Wrapper>
                                {values.order_details.uzum_nasiya && (
                                  <Stack
                                    gap='14px'
                                    sx={theme => ({
                                      backgroundColor: theme.palette.colors['L-WHITE-D-GRAY40'],
                                    })}
                                  >
                                    <Stack
                                      direction='row'
                                      alignItems='center'
                                      justifyContent='space-between'
                                      gap='12px'
                                    >
                                      <Stack direction='row' alignItems='center' gap='8px'>
                                        <Box
                                          width='28px'
                                          height='28px'
                                          display='flex'
                                          alignItems='center'
                                          borderRadius='50%'
                                          justifyContent='center'
                                          sx={theme => ({
                                            backgroundColor: theme.palette.allColors.WHITE,
                                            svg: { width: '28px', height: '28px' },
                                          })}
                                        >
                                          <IconUzum />
                                        </Box>
                                        <Typography
                                          component='h4'
                                          variant='text110'
                                          fontWeight='600'
                                          color={theme =>
                                            theme.palette.colors['L-BLACK30-D-WHITE20']
                                          }
                                        >
                                          Uzum Nasiya
                                        </Typography>
                                      </Stack>
                                    </Stack>
                                    <Wrapper>
                                      <Typography component='h4' variant='text110'>
                                        {t('period')}
                                      </Typography>
                                      <Typography
                                        component='p'
                                        align='right'
                                        maxWidth='300px'
                                        variant='text110'
                                        color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                      >
                                        {values.order_details.uzum_nasiya.period}
                                      </Typography>
                                    </Wrapper>
                                    <Wrapper>
                                      <Typography component='h4' variant='text110'>
                                        {t('contract_id')}
                                      </Typography>
                                      <Typography
                                        component='p'
                                        align='right'
                                        maxWidth='300px'
                                        variant='text110'
                                        color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                      >
                                        {values.order_details.uzum_nasiya.contract_id}
                                      </Typography>
                                    </Wrapper>
                                    <Wrapper>
                                      <Typography component='h4' variant='text110'>
                                        {t('full_name')}
                                      </Typography>
                                      <Typography
                                        component='p'
                                        align='right'
                                        maxWidth='300px'
                                        variant='text110'
                                        color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                      >
                                        {values.order_details.uzum_nasiya.fio}
                                      </Typography>
                                    </Wrapper>
                                    <Wrapper>
                                      <Typography component='h4' variant='text110'>
                                        {t('phone_number')}
                                      </Typography>
                                      <Typography
                                        component='a'
                                        align='right'
                                        maxWidth='300px'
                                        variant='text110'
                                        href={`tel:${values.order_details.uzum_nasiya.phone}`}
                                        color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                      >
                                        +{values.order_details.uzum_nasiya.phone}
                                      </Typography>
                                    </Wrapper>
                                    <Wrapper>
                                      <Typography component='h4' variant='text110'>
                                        {t('created')}
                                      </Typography>
                                      <Typography
                                        component='p'
                                        align='right'
                                        maxWidth='300px'
                                        variant='text110'
                                        color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                      >
                                        {dayjs(
                                          values.order_details.uzum_nasiya.created_at,
                                          'DD.MM.YYYY',
                                        ).format('D MMMM YYYY')}
                                      </Typography>
                                    </Wrapper>
                                    <Wrapper>
                                      <Typography component='h4' variant='text110'>
                                        {t('client_act_pdf')}
                                      </Typography>
                                      <Button
                                        href={values.order_details.uzum_nasiya.client_act_pdf}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        size='extraSmall'
                                        sx={{ fontSize: 10 }}
                                      >
                                        {t('download_pdf')}
                                      </Button>
                                    </Wrapper>
                                  </Stack>
                                )}
                              </Stack>
                            </AccordionDetails>
                          </Accordion>
                        </Stack>
                        <Stack>
                          <Accordion defaultExpanded>
                            <AccordionSummary
                              id='order-detail-header'
                              expandIcon={<IconDirectionDown />}
                              aria-controls='order-detail-content'
                            >
                              <Typography variant='title20' fontWeight='500'>
                                {t('delivery_information')}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={theme => ({
                                borderRadius: '0 0 7px 7px',
                                backgroundColor: theme.palette.colors['L-WHITE-D-GRAY40'],
                              })}
                            >
                              <Stack gap='16px' p='5px 0 4px'>
                                <Wrapper>
                                  <Typography component='h4' variant='text110'>
                                    {t('order_type')}
                                  </Typography>
                                  <Typography
                                    component='p'
                                    align='right'
                                    maxWidth='300px'
                                    variant='text110'
                                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                  >
                                    {t(DELIVERY_TYPES[values.order_details.service_type].title)}
                                  </Typography>
                                </Wrapper>
                                <Stack gap='20px' direction='row' justifyContent='space-between'>
                                  <Typography component='h4' variant='text110'>
                                    {t('delivery')}
                                  </Typography>
                                  <Typography
                                    component='p'
                                    align='right'
                                    fontWeight='500'
                                    variant='text110'
                                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                  >
                                    {numberFormat(values.items.delivery_price)}{' '}
                                    {values.items.currency.code}
                                  </Typography>
                                </Stack>
                                {values.order_details?.shipping_datetime && (
                                  <Wrapper>
                                    <Typography component='h4' variant='text110'>
                                      {PICKUPS.includes(values.order_details.service_type)
                                        ? t('pick_up_time')
                                        : t('delivery_time')}
                                    </Typography>
                                    <Stack
                                      p='3px'
                                      mt='-3px'
                                      height='fit-content'
                                      alignItems='center'
                                      justifyContent='center'
                                      sx={theme => ({
                                        border: `1px solid ${theme.palette.allColors.PURPLE}`,
                                      })}
                                    >
                                      <Typography
                                        component='p'
                                        align='right'
                                        maxWidth='300px'
                                        variant='text110'
                                        color={theme => theme.palette.allColors.PURPLE}
                                      >
                                        {dayjs(values.order_details?.shipping_datetime).format(
                                          'DD-MM-YYYY HH:mm',
                                        )}
                                      </Typography>
                                    </Stack>
                                  </Wrapper>
                                )}
                                <Wrapper>
                                  <Typography component='h4' variant='text110'>
                                    {t('branch')}
                                  </Typography>
                                  <Typography
                                    component='p'
                                    align='right'
                                    fontWeight='500'
                                    variant='text110'
                                    color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                  >
                                    {values.items.branch}
                                  </Typography>
                                </Wrapper>
                                {DELIVERIES.includes(values.order_details.service_type) && (
                                  <>
                                    <Wrapper>
                                      <Typography component='h4' variant='text110'>
                                        {t(
                                          values.order_details.service_type === 'BTS_PICKUP'
                                            ? 'serving_address'
                                            : 'delivery_address',
                                        )}
                                      </Typography>
                                      <Typography
                                        component='p'
                                        align='right'
                                        maxWidth='300px'
                                        variant='text110'
                                        color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                                      >
                                        {values.order_details?.address ?? '-'}
                                      </Typography>
                                    </Wrapper>
                                  </>
                                )}
                                {DELIVERIES.includes(values.order_details.service_type) && (
                                  <>
                                    <Wrapper>
                                      <Typography component='h4' variant='text110'>
                                        {t('map')}
                                      </Typography>
                                      <Stack
                                        gap='10px'
                                        direction='row'
                                        alignItems='center'
                                        justifyContent='flex-end'
                                      >
                                        <WrapMap>
                                          <WrapIconMap>
                                            <IconYandexMap />
                                          </WrapIconMap>
                                          <Typography
                                            align='right'
                                            target='_blank'
                                            component={Link}
                                            variant='text110'
                                            to={values.order_details.yandex_url}
                                            color={theme =>
                                              theme.palette.colors['L-BLACK30-D-WHITE20']
                                            }
                                          >
                                            Yandex taxi
                                          </Typography>
                                        </WrapMap>
                                        <WrapMap>
                                          <WrapIconMap>
                                            <IconGoogleMap />
                                          </WrapIconMap>
                                          <Typography
                                            align='right'
                                            target='_blank'
                                            component={Link}
                                            variant='text110'
                                            to={values.order_details.google_url}
                                            color={theme =>
                                              theme.palette.colors['L-BLACK30-D-WHITE20']
                                            }
                                          >
                                            Google map
                                          </Typography>
                                        </WrapMap>
                                      </Stack>
                                    </Wrapper>
                                    {values.order_details.service_type === 'NOOR_DELIVERY' && (
                                      <Wrapper>
                                        <Typography component='h4' variant='text110' />
                                        <Stack
                                          gap='10px'
                                          direction='row'
                                          alignItems='center'
                                          justifyContent='flex-end'
                                        >
                                          <Button
                                            size='extraSmall'
                                            sx={{ fontSize: 10 }}
                                            onClick={noorDelivery.setTrue}
                                          >
                                            {t('view_delivery_address')}
                                          </Button>
                                        </Stack>
                                      </Wrapper>
                                    )}
                                    {values.order_details.service_type === 'DELIVERY' && (
                                      <Wrapper>
                                        <SelectCourier {...values} />
                                      </Wrapper>
                                    )}
                                  </>
                                )}
                              </Stack>
                            </AccordionDetails>
                          </Accordion>
                        </Stack>
                        {values.order_details.platform === 'YANDEX' && (
                          <Wrapper>
                            <Yandex {...values} />
                          </Wrapper>
                        )}
                        <Comments {...values} />
                      </Stack>
                    </Stack>
                  </Box>
                  {can_edit && (
                    <Box className='footer'>
                      {row && (
                        <Stack width='100%'>
                          <Stack justifyContent='space-between' direction='row'>
                            <PrintCheck {...values} />
                            <OrderAction
                              data={values}
                              variant='modal'
                              tab={props.status}
                              onUpdate={setFalse}
                              queryKey={props.queryKey}
                              comment={form.watch('comment')}
                              courierId={form.watch('courier')}
                              {...row}
                            />
                          </Stack>
                        </Stack>
                      )}
                    </Box>
                  )}
                </>
              )}
            </Box>
          </FormProvider>
        )}
      </SwipeableDrawer>

      <Dialog
        PaperProps={{
          sx: {
            width: '90%',
            maxWidth: '90vw',
            height: '90%',
          },
        }}
        scroll='body'
        onClose={noorDelivery.setFalse}
        open={noorDelivery.value}
      >
        <IconButton
          onClick={noorDelivery.setFalse}
          sx={{ position: 'absolute', right: 12, top: 12 }}
        >
          <IconClose fill={theme.palette.allColors.GRAY760} width={20} height={20} />
        </IconButton>
        {values?.order_details?.location && (
          <iframe
            title='map'
            src={values.order_details.location}
            style={{
              border: 'none',
              width: '100%',
              height: '100%',
            }}
            loading='lazy'
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
          />
        )}
      </Dialog>
    </>
  )
})
