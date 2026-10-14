import dayjs from 'dayjs'
import { getUser } from '@/utils/user'
import Stack from '@mui/material/Stack'
import { Fragment, useRef } from 'react'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { useReactToPrint } from 'react-to-print'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { PAYMENT_TYPES } from '@/constants/payment'
import { numberFormat } from '@/utils/number-format'
import type { OrderDetailProps } from '@/types/order'
import { DELIVERY_TYPES } from '@/constants/delivery'

export const PrintCheck = (props: OrderDetailProps) => {
  const { t } = useTranslation()
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })
  const name = useProfileStore(state => state.me?.name)
  const business_type = useProfileStore(state => state.me?.business_type)

  const handlePrint = () => {
    reactToPrintFn()
  }

  const user = getUser()
  const descShops = ['727586e9-be0f-46f6-a9d1-1f1478d90c2d']
  const hasDescShops = descShops.includes(user.shop)

  const parseHtml = (htmlString: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlString
    return tempDiv.textContent || tempDiv.innerText || ''
  }

  return (
    <Stack>
      <Button size='extraSmall' variant='contained-black' onClick={handlePrint}>
        {t('print')}
      </Button>
      <div style={{ display: 'none' }}>
        <Stack ref={contentRef}>
          <Stack gap='16px' p='15px'>
            <Typography align='center' variant='title20' fontWeight='500'>
              {name}
            </Typography>
            <Stack gap='5px'>
              {props?.is_manual && (
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                  <Typography component='h4'>{t('operator')}:</Typography>
                  <Typography component='p'>{props?.order_details.operator}</Typography>
                </Stack>
              )}
              <Typography component='p'>{dayjs().format('DD.MM.YYYY HH:mm')}</Typography>
            </Stack>
            <Stack gap='5px' pt='16px' sx={{ borderTop: '1px dashed' }}>
              <Stack gap='5px'>
                {props?.items?.products.map(p => {
                  const isNew = p?.is_external
                  const unitAmount = Number(p.amount) / p.count

                  return isNew ? (
                    <Stack key={p.id}>
                      <Stack
                        gap='20px'
                        direction='row'
                        justifyContent='space-between'
                        alignItems='self-start'
                      >
                        <Stack gap='5px' direction='row' alignItems='center'>
                          <Typography component='h4'>
                            <Typography component='span'>
                              {p.product_snapshot?.name ?? '-'}
                              {p.parameter ? null : (
                                <Typography ml='7px' component='span'>
                                  x{p.count}{' '}
                                  {hasDescShops
                                    ? parseHtml(p.product_snapshot?.desc)
                                    : p.product_snapshot?.unit}
                                </Typography>
                              )}
                              :
                            </Typography>
                            {p.product_snapshot.variants.length > 0 && (
                              <Stack>
                                {p.product_snapshot.variants.map(variant => (
                                  <Stack key={variant.id}>
                                    <Typography component='h4' variant='text110'>
                                      <Typography
                                        mr='7px'
                                        component='span'
                                        variant='inherit'
                                        color={theme => theme.palette.allColors.BLACK}
                                      >
                                        {variant.name}:
                                      </Typography>
                                      {variant.value}
                                    </Typography>
                                  </Stack>
                                ))}
                              </Stack>
                            )}
                            {p.parameter && (
                              <>
                                /
                                <Typography component='span'>
                                  {p.parameter?.name ?? '-'}
                                  <Typography component='span' ml='7px'>
                                    x{p.count}{' '}
                                    {hasDescShops
                                      ? parseHtml(p.product_snapshot?.desc)
                                      : p.product_snapshot?.unit}
                                  </Typography>
                                  :
                                </Typography>
                              </>
                            )}
                            {p.additional_parameter.length > 0 && (
                              <>
                                {p.additional_parameter.map((a, i: number) => (
                                  <Fragment key={i}>
                                    /
                                    <Typography component='span'>
                                      {a.name}
                                      <Typography component='span' ml='7px'>
                                        x{p.count}{' '}
                                        {hasDescShops
                                          ? parseHtml(p.product_snapshot?.desc)
                                          : p.product_snapshot?.unit}
                                      </Typography>
                                      :
                                    </Typography>
                                  </Fragment>
                                ))}
                              </>
                            )}
                          </Typography>
                        </Stack>
                        <Stack gap='2px' alignItems='flex-end'>
                          <Typography component='p'>
                            {numberFormat(p.amount)} {props.items.currency.code}
                          </Typography>
                          {business_type === 'ONLINE_SHOP' && p.count > 1 && (
                            <Typography
                              component='p'
                              align='right'
                              variant='text110'
                              color={theme => theme.palette.allColors.BLACK}
                            >
                              {p.count} x {numberFormat(unitAmount)} = {numberFormat(p.amount)}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack key={p.id}>
                      <Stack gap='20px' direction='row' justifyContent='space-between'>
                        <Stack gap='5px' direction='row' alignItems='flex-start'>
                          <Typography component='h4'>
                            <Typography component='span'>
                              {p.product?.name ?? '-'}
                              {p.parameter ? null : (
                                <Typography ml='7px' component='span'>
                                  x{p.count}{' '}
                                  {hasDescShops ? parseHtml(p.product?.desc) : p.product?.unit}
                                </Typography>
                              )}
                              :
                            </Typography>
                            {p.parameter && (
                              <>
                                /
                                <Typography component='span'>
                                  {p.parameter?.name ?? '-'}
                                  <Typography component='span' ml='7px'>
                                    x{p.count}{' '}
                                    {hasDescShops ? parseHtml(p.product?.desc) : p.product?.unit}
                                  </Typography>
                                  :
                                </Typography>
                              </>
                            )}
                            {p.additional_parameter.length > 0 && (
                              <>
                                {p.additional_parameter.map((a, i: number) => (
                                  <Fragment key={i}>
                                    /
                                    <Typography component='span'>
                                      {a.name}
                                      <Typography component='span' ml='7px'>
                                        x{p.count}{' '}
                                        {hasDescShops
                                          ? parseHtml(p.product?.desc)
                                          : p.product?.unit}
                                      </Typography>
                                      :
                                    </Typography>
                                  </Fragment>
                                ))}
                              </>
                            )}
                          </Typography>
                        </Stack>
                        <Stack gap='2px' alignItems='center'>
                          <Typography component='p'>
                            {numberFormat(p.amount)} {props.items.currency.code}
                          </Typography>
                          {business_type === 'ONLINE_SHOP' && p.count > 1 && (
                            <Typography
                              component='p'
                              align='right'
                              variant='text110'
                              color={theme => theme.palette.allColors.BLACK}
                            >
                              {p.count} x {numberFormat(unitAmount)} = {numberFormat(p.amount)}
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  )
                })}
              </Stack>
            </Stack>
            <Stack gap='5px' pt='16px' sx={{ borderTop: '1px dashed' }}>
              <Stack gap='20px' direction='row' justifyContent='space-between'>
                <Typography component='h4'>{t('order_id')}:</Typography>
                <Typography component='p'>{props.order_details.id}</Typography>
              </Stack>
              <Stack gap='20px' direction='row' justifyContent='space-between'>
                <Typography component='h4'>{t('customer_name')}:</Typography>
                <Typography component='p'>{props.order_details.customer}</Typography>
              </Stack>
              <Stack gap='20px' direction='row' justifyContent='space-between'>
                <Typography component='h4'>{t('phone_number')}:</Typography>
                <Typography>{props.order_details.phone}</Typography>
              </Stack>
              <Stack gap='20px' direction='row' justifyContent='space-between'>
                <Typography component='h4'>{t('comment')}:</Typography>
                <Typography component='p'>{props.order_details.comment}</Typography>
              </Stack>
              <Stack gap='20px' direction='row' justifyContent='space-between'>
                <Typography component='h4'>{t('payment_type')}:</Typography>
                <Typography component='p'>
                  {t(PAYMENT_TYPES[props.order_details.payment_type].label)}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap='5px' pt='16px' sx={{ borderTop: '1px dashed' }}>
              <Stack gap='20px' direction='row' justifyContent='space-between'>
                <Typography component='h4'>{t('order_type')}:</Typography>
                <Typography component='p'>
                  {t(DELIVERY_TYPES[props.order_details.service_type].title)}
                </Typography>
              </Stack>
              <Stack gap='20px' direction='row' justifyContent='space-between'>
                <Typography component='h4'>{t('branch')}:</Typography>
                <Typography component='p'>{props.items.branch}</Typography>
              </Stack>
              {props.order_details.service_type === 'DELIVERY' && (
                <>
                  <Stack gap='20px' direction='row' justifyContent='space-between'>
                    <Typography component='h4'>{t('serving_address')}:</Typography>
                    <Typography component='p'>{props.order_details.address ?? '-'}</Typography>
                  </Stack>
                </>
              )}
              {props.items.promo_code && (
                <Stack gap='20px' direction='row' justifyContent='space-between'>
                  <Typography component='h4'>{t('discount')}:</Typography>
                  <Typography component='p'>
                    -{numberFormat(props.items.discount_amount)}
                    {props.items.currency.code}
                  </Typography>
                </Stack>
              )}
              <Stack gap='20px' direction='row' justifyContent='space-between'>
                <Typography component='h4'>{t('delivery')}:</Typography>
                <Typography component='p'>
                  {numberFormat(props.items.delivery_price)} {props.items.currency.code}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography>{t('total')}:</Typography>
                <Typography>
                  {numberFormat(props.items.amount)} {props.items.currency.code}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </Stack>
  )
}
