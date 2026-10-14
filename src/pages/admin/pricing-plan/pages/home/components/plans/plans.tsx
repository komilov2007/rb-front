import Tab from '@mui/material/Tab'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import { Swiper, SwiperSlide } from 'swiper/react'
import { numberFormat } from '@/utils/number-format'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconPlanBack from '@/assets/icons/plan-back.png'
import { Fragment, useState, type SyntheticEvent } from 'react'
import { MobileFunctions } from '../functions/mobile-functions'
import { getCurrentDomainMeta } from '@/constants/domain-themes'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'
import { Card, Cards, TabList, WrapDiscount, Wrapper } from './style'
import { ReactComponent as IconCrown } from '@/assets/icons/crown.svg'
import { ReactComponent as IconMoney } from '@/assets/icons/money.svg'
import { ReactComponent as IconPointer } from '@/assets/icons/pointer.svg'
import { Navigation, Pagination, FreeMode, Mousewheel } from 'swiper/modules'
import {
  PRICES,
  FEATURES,
  TAB_PLANS,
  PRICING_PLANS,
  type PlanTypeProps,
  type PricingPlanSubProps,
} from '@/constants/plan'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const Plans = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [promoCode] = useSearchParamsState('promoCode', '')
  const tablet = useMediaQuery(theme.breakpoints.down('md'))
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const subscription = useProfileStore(state => state.me?.subscription)
  const [plan, setPlan] = useState<PlanTypeProps>(
    subscription?.months === 12 ? 'yearly' : subscription?.months === 6 ? 'halfYearly' : 'monthly',
  )

  const handleChangePlan = (_: SyntheticEvent, plan: PlanTypeProps) => {
    setPlan(plan)
  }

  const card = (p: PricingPlanSubProps) => {
    const price =
      TAB_PLANS[plan].discount > 0
        ? (TAB_PLANS[plan].months * PRICES[p.type] * (100 - TAB_PLANS[plan].discount)) /
          (100 * TAB_PLANS[plan].months)
        : PRICES[p.type]

    const planTitle =
      subscription?.tariff === p.type
        ? subscription.tariff === 'START'
          ? t('current_plan')
          : t('current_plan') + ' ' + t('day_count', { value: subscription.difference })
        : t('upgrade_plan')

    const LINK = `${p.type}?plan=${plan}&promoCode=${promoCode}`

    const handleNavigate = () => {
      navigate(LINK)
    }

    return (
      <Card>
        <Stack height='100%' flexGrow={1} className='content'>
          <Stack mb='25px' direction='row' justifyContent='space-between'>
            <Stack gap='15px'>
              <Typography variant='title10' fontWeight={400}>
                {p.title}
              </Typography>
              <Stack gap='5px' direction='row' alignItems='flex-end' whiteSpace='nowrap'>
                <Typography
                  variant='title150'
                  component='h5'
                  sx={theme => ({
                    color: theme.palette.allColors.BLACK30,
                  })}
                >
                  {numberFormat(price).replace(',', ' ')}
                  <Typography ml='4px' component='span' variant='title40'>
                    UZS/{t('1_month')}
                  </Typography>
                </Typography>
                {TAB_PLANS[plan].discount > 0 && PRICES[p.type] > 0 && (
                  <Stack direction='row' alignItems='center'>
                    <Typography
                      variant='title120'
                      sx={theme => ({
                        textDecoration: 'line-through',
                        color: theme.palette.allColors.RED,
                      })}
                    >
                      {numberFormat(PRICES[p.type]).replace(',', ' ')}
                    </Typography>
                    <Typography
                      ml='4px'
                      component='span'
                      variant='text50'
                      sx={theme => ({
                        textDecoration: 'none',
                        color: theme.palette.allColors.RED,
                      })}
                    >
                      UZS
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
            {p.type === 'PRO' && <IconCrown />}
          </Stack>
          <Divider />
          <Stack flexGrow={1} direction={{ xs: 'column-reverse', sm: 'column' }}>
            <Stack gap='20px' mt='25px' flexGrow={1} component='ul'>
              {Object.values(FEATURES)
                .filter(feature => p.features.includes(feature.feature))
                .map(({ Icon, title, feature }, i) => (
                  <Stack gap='10px' key={i} component='li' direction='row'>
                    <Stack
                      sx={{
                        svg: {
                          width: '24px',
                          height: '24px',
                        },
                      }}
                    >
                      <Icon />
                    </Stack>
                    <Typography variant='title20'>
                      {t(title)}{' '}
                      {feature === 'website' && p.type === 'START' && `(${t('only_subdomain')})`}
                    </Typography>
                  </Stack>
                ))}
            </Stack>
            <Button
              onClick={handleNavigate}
              size='mediumSmall'
              variant='contained-white-solid'
              sx={{
                mt: '20px',
                color: p.color ? theme.palette.allColors[p.color] : undefined,
                backgroundColor: p.bgcolor ? theme.palette.allColors[p.bgcolor] : undefined,
                ':hover': {
                  backgroundColor: p.bgcolor ? theme.palette.allColors[p.bgcolor] : undefined,
                },
              }}
            >
              {planTitle}
            </Button>
          </Stack>
          {mobile && <MobileFunctions variant={p.type} />}
        </Stack>
        <Stack
          top='0'
          zIndex={0}
          position='absolute'
          className='plan-back'
          sx={{
            background:
              p.type === 'BASIC'
                ? 'linear-gradient(#fef8d5 10%, #ffffff 90%)'
                : p.type === 'PRO'
                  ? 'linear-gradient(#d5e3e3 10%, #ffffff 90%)'
                  : 'linear-gradient( #ffffff 95%)',
          }}
        >
          <img src={IconPlanBack} alt='bg-pattern' />
        </Stack>
      </Card>
    )
  }

  return (
    <Stack p='0 20px' alignItems='center'>
      <Typography align='center' component='h2' maxWidth='457px' variant='title10'>
        {t('enough_you_dont_have_to_spend_10_times_as_much_to_take_your_business_online')}
        <Stack ml='5px' component='span' display='unset'>
          <IconMoney />
        </Stack>
      </Typography>
      <Typography
        m='20px 0 40px'
        align='center'
        variant='title'
        component='h3'
        maxWidth='600px'
        textTransform='uppercase'
      >
        {t('choose_a_rate_faster_and_increase_efficiency_with_market', {
          market: getCurrentDomainMeta().appName,
        })}
        <Stack ml='5px' component='span' display='unset'>
          <IconPointer />
        </Stack>
      </Typography>
      <TabContext value={plan}>
        <Stack alignItems='center'>
          <TabList
            aria-label='plans'
            onChange={handleChangePlan}
            sx={{
              marginBottom: '28px',
            }}
          >
            {Object.values(TAB_PLANS).map(({ color, bgcolor, label, value, discount }) => (
              <Tab
                key={value}
                value={value}
                label={
                  <Stack gap='5px' direction='row' alignItems='center'>
                    <Typography>{t(label)}</Typography>
                    {discount > 0 && bgcolor && color && (
                      <WrapDiscount
                        sx={theme => ({
                          color: theme.palette.allColors[color],
                          backgroundColor: theme.palette.allColors[bgcolor],
                        })}
                      >
                        -{discount} %
                      </WrapDiscount>
                    )}
                  </Stack>
                }
              />
            ))}
          </TabList>
        </Stack>
        {mobile ? (
          <Stack gap={'16px'}>
            {Object.values(PRICING_PLANS).map((p, index: number) => {
              return <Stack key={index}>{card(p)}</Stack>
            })}
          </Stack>
        ) : tablet ? (
          <Wrapper>
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              freeMode={true}
              mousewheel={true}
              modules={[Navigation, Pagination, FreeMode, Mousewheel]}
              breakpoints={{
                [theme.breakpoints.values.xs]: {
                  spaceBetween: 20,
                  slidesPerView: 1.6,
                },
                [theme.breakpoints.values.sm]: {
                  spaceBetween: 30,
                  slidesPerView: 3,
                },
              }}
            >
              {Object.values(PRICING_PLANS).map((p, index: number) => {
                return (
                  <SwiperSlide style={{ height: '100%' }} key={index}>
                    {card(p)}
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </Wrapper>
        ) : (
          <Cards>
            {Object.values(PRICING_PLANS).map((p, index: number) => {
              return <Fragment key={index}>{card(p)}</Fragment>
            })}
          </Cards>
        )}
      </TabContext>
    </Stack>
  )
}
