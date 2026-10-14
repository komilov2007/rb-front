import { type ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import Accordion from '@mui/material/Accordion'
import { useBoolean } from '@/hooks/useBoolean'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { ReactComponent as IconRemoveCircle } from '@/assets/icons/remove-circle.svg'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import { ReactComponent as IconCheckCirclePrimary } from '@/assets/icons/check-circle-primary.svg'

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <Typography
    variant='title20'
    fontWeight={'500'}
    textTransform={'uppercase'}
    color={theme => theme.palette.allColors.GRAY740}
  >
    {children}:
  </Typography>
)

const InfoRow = ({ label, value }: { label?: string; value?: string }) => (
  <Stack flexDirection={'row'}>
    <Typography variant='title20' color={theme => theme.palette.allColors.BLACK30}>
      {label}:
    </Typography>
    <Typography
      variant='title20'
      fontWeight={'500'}
      ml='5px'
      color={theme => theme.palette.allColors.BLACK30}
    >
      {value}
    </Typography>
  </Stack>
)

const FeatureRow = ({ icon, text }: { icon?: string; text?: string }) => {
  const IconComponent = icon === 'check' ? IconCheckCirclePrimary : IconRemoveCircle

  return (
    <Stack gap='8px' flexDirection={'row'} alignItems='center'>
      {icon === 'checkWithWidth' ? (
        <Stack width={20}>
          <IconCheckCirclePrimary />
        </Stack>
      ) : icon === 'removeWithWidth' ? (
        <Stack width={20}>
          <IconRemoveCircle />
        </Stack>
      ) : (
        <IconComponent />
      )}
      <Typography variant='title20' color={theme => theme.palette.allColors.BLACK30}>
        {text}
      </Typography>
    </Stack>
  )
}

interface SubcriptionProps {
  variant: 'START' | 'BASIC' | 'PRO'
}

export const MobileFunctions = (props: SubcriptionProps) => {
  const expanded = useBoolean()
  const { t } = useTranslation()

  const sections = {
    START: [
      {
        title: 'tech_support',
        isTitleRow: false,
        content: [
          { type: 'info', label: t('tech_support'), value: t('mon_fri') + ' 09:00 - 21:00' },
          { type: 'feature', icon: 'remove', text: t('business_consultant') },
          { type: 'info', label: t('branches'), value: '1' },
        ],
      },
      {
        title: 'products',
        isTitleRow: true,
        content: [
          { type: 'info', label: t('categories'), value: t('infinitely') },
          { type: 'info', label: t('products'), value: '500' },
          { type: 'feature', icon: 'remove', text: t('artificial_intelligence') },
          { type: 'feature', icon: 'remove', text: t('discount_count') },
          { type: 'feature', icon: 'remove', text: t('stock') },
          { type: 'info', label: t('orders'), value: '300' },
          { type: 'info', label: t('customers'), value: t('infinitely') },
          { type: 'feature', icon: 'check', text: t('chat') },
        ],
      },
      {
        title: 'marketing',
        isTitleRow: true,
        content: [
          { type: 'info', label: t('mailing_count'), value: `5/${t('month')}` },
          { type: 'feature', icon: 'check', text: t('sms_mailing') },
          { type: 'info', label: t('promokod'), value: '5' },
          { type: 'feature', icon: 'remove', text: t('sources') },
          { type: 'info', label: t('advertising_banner'), value: '1' },
        ],
      },
      {
        title: 'employees',
        isTitleRow: true,
        content: [
          { type: 'info', label: t('employees'), value: '1' },
          { type: 'feature', icon: 'remove', text: t('roles') },
          { type: 'feature', icon: 'remove', text: t('courier') },
        ],
      },
      {
        title: 'integrations',
        isTitleRow: true,
        content: [
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('payment_systems') + ' (Payme/Click/Uzum/Atmos)',
          },
          {
            type: 'feature',
            icon: 'removeWithWidth',
            text: t('delivery_services') + ' (Fargo/UzPost/Yandex b2b)',
          },
          {
            type: 'feature',
            icon: 'removeWithWidth',
            text: t('pos_systems') + ' (IIko/ R-Keeper/ Poster)',
          },
          {
            type: 'feature',
            icon: 'removeWithWidth',
            text: t('inventory_management') + ' (Biilz/Smartup/ Sales Doctor)',
          },
          {
            type: 'feature',
            icon: 'removeWithWidth',
            text: t('ip_telephony') + ' (Online PBX/Sipuni)',
          },
        ],
      },
      {
        title: 'analytics',
        isTitleRow: true,
        content: [
          { type: 'feature', icon: 'checkWithWidth', text: t('revenue_statistics') },
          { type: 'feature', icon: 'checkWithWidth', text: t('order_statistics') },
          { type: 'feature', icon: 'removeWithWidth', text: t('traffic_source') },
          { type: 'feature', icon: 'checkWithWidth', text: t('top_10_products') },
          { type: 'feature', icon: 'removeWithWidth', text: t('order_map') },
          { type: 'feature', icon: 'removeWithWidth', text: t('orders_by_time') },
          { type: 'feature', icon: 'removeWithWidth', text: t('top_10_customers') },
        ],
      },
    ],
    BASIC: [
      {
        title: 'tech_support',
        isTitleRow: false,
        content: [
          { type: 'info', label: t('tech_support'), value: t('mon_fri') + ' 09:00 - 21:00' },
          { type: 'feature', icon: 'remove', text: t('business_consultant') },
          { type: 'info', label: t('branches'), value: '5' },
        ],
      },
      {
        title: 'products',
        isTitleRow: true,
        content: [
          { type: 'info', label: t('categories'), value: t('infinitely') },
          { type: 'info', label: t('products'), value: '3000' },
          { type: 'feature', icon: 'check', text: t('artificial_intelligence') },
          { type: 'feature', icon: 'check', text: t('discount_count') },
          { type: 'feature', icon: 'check', text: t('stock') },
          { type: 'info', label: t('orders'), value: t('infinitely') },
          { type: 'info', label: t('customers'), value: t('infinitely') },
          { type: 'feature', icon: 'check', text: t('chat') },
        ],
      },
      {
        title: 'marketing',
        isTitleRow: true,
        content: [
          { type: 'info', label: t('mailing_count'), value: `25/${t('month')}` },
          { type: 'feature', icon: 'check', text: t('sms_mailing') },
          { type: 'info', label: t('promokod'), value: t('infinitely') },
          { type: 'feature', icon: 'check', text: t('sources') },
          { type: 'info', label: t('advertising_banner'), value: '5' },
        ],
      },
      {
        title: 'employees',
        isTitleRow: true,
        content: [
          { type: 'info', label: t('employees'), value: '5' },
          { type: 'info', label: t('roles'), value: '5' },
          { type: 'info', label: t('courier'), value: '5' },
        ],
      },
      {
        title: 'integrations',
        isTitleRow: true,
        content: [
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('payment_systems') + ' (Payme/Click/Uzum/Atmos)',
          },
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('delivery_services') + ' (Fargo/UzPost/Yandex b2b)',
          },
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('pos_systems') + ' (IIko/ R-Keeper/ Poster)',
          },
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('inventory_management') + ' (Biilz/Smartup/ Sales Doctor)',
          },
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('ip_telephony') + ' (Online PBX/Sipuni)',
          },
        ],
      },
      {
        title: 'analytics',
        isTitleRow: true,
        content: [
          { type: 'feature', icon: 'checkWithWidth', text: t('revenue_statistics') },
          { type: 'feature', icon: 'checkWithWidth', text: t('order_statistics') },
          { type: 'feature', icon: 'checkWithWidth', text: t('traffic_source') },
          { type: 'feature', icon: 'checkWithWidth', text: t('top_10_products') },
          { type: 'feature', icon: 'checkWithWidth', text: t('order_map') },
          { type: 'feature', icon: 'checkWithWidth', text: t('orders_by_time') },
          { type: 'feature', icon: 'checkWithWidth', text: t('top_10_customers') },
        ],
      },
    ],
    PRO: [
      {
        title: 'tech_support',
        isTitleRow: false,
        content: [
          { type: 'info', label: t('tech_support'), value: t('mon_fri') + ' 09:00 - 21:00' },
          { type: 'feature', icon: 'check', text: t('business_consultant') },
          { type: 'info', label: t('branches'), value: t('infinitely') },
        ],
      },
      {
        title: 'products',
        isTitleRow: true,
        content: [
          { type: 'info', label: t('categories'), value: t('infinitely') },
          { type: 'info', label: t('products'), value: t('infinitely') },
          { type: 'feature', icon: 'check', text: t('artificial_intelligence') },
          { type: 'feature', icon: 'check', text: t('discount_count') },
          { type: 'feature', icon: 'check', text: t('stock') },
          { type: 'info', label: t('orders'), value: t('infinitely') },
          { type: 'info', label: t('customers'), value: t('infinitely') },
          { type: 'feature', icon: 'check', text: t('chat') },
        ],
      },
      {
        title: 'marketing',
        isTitleRow: true,
        content: [
          { type: 'feature', icon: 'check', text: t('mailing_count') },
          { type: 'feature', icon: 'check', text: t('sms_mailing') },
          { type: 'info', label: t('promokod'), value: t('infinitely') },
          { type: 'feature', icon: 'check', text: t('sources') },
          { type: 'info', label: t('advertising_banner'), value: t('infinitely') },
        ],
      },
      {
        title: 'employees',
        isTitleRow: true,
        content: [
          { type: 'info', label: t('employees'), value: t('infinitely') },
          { type: 'info', label: t('roles'), value: t('infinitely') },
          { type: 'info', label: t('courier'), value: t('infinitely') },
        ],
      },
      {
        title: 'integrations',
        isTitleRow: true,
        content: [
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('payment_systems') + ' (Payme/Click/Uzum/Atmos)',
          },
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('delivery_services') + ' (Fargo/UzPost/Yandex b2b)',
          },
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('pos_systems') + ' (IIko/ R-Keeper/ Poster)',
          },
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('inventory_management') + ' (Biilz/Smartup/ Sales Doctor)',
          },
          {
            type: 'feature',
            icon: 'checkWithWidth',
            text: t('ip_telephony') + ' (Online PBX/Sipuni)',
          },
        ],
      },
      {
        title: 'analytics',
        isTitleRow: true,
        content: [
          { type: 'feature', icon: 'checkWithWidth', text: t('revenue_statistics') },
          { type: 'feature', icon: 'checkWithWidth', text: t('order_statistics') },
          { type: 'feature', icon: 'checkWithWidth', text: t('traffic_source') },
          { type: 'feature', icon: 'checkWithWidth', text: t('top_10_products') },
          { type: 'feature', icon: 'checkWithWidth', text: t('order_map') },
          { type: 'feature', icon: 'checkWithWidth', text: t('orders_by_time') },
          { type: 'feature', icon: 'checkWithWidth', text: t('top_10_customers') },
        ],
      },
    ],
  }

  const currentSections = sections[props.variant] || sections.START

  return (
    <Stack width='100%'>
      <Accordion
        expanded={expanded.value}
        onChange={expanded.toggle}
        sx={{
          width: '100%',
          display: 'flex',
          boxShadow: 'none',
          flexDirection: 'column',
        }}
      >
        <AccordionSummary
          sx={{
            padding: 0,
            width: '100%',
            minHeight: 'fit-content !important',
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
          }}
        >
          <Stack width='100%' alignItems='start'>
            <Button
              endIcon={<IconDirectionDown />}
              sx={theme => ({
                color: theme.palette.allColors.PURPLE,
                background: theme.palette.allColors.TRANSPARENT,
                svg: {
                  transition: 'transform 0.3s ease',
                  transform: expanded.value ? 'rotate(180deg)' : 'rotate(0deg)',
                },
                '&:hover': {
                  background: theme.palette.allColors.TRANSPARENT,
                  padding: '0px',
                },
                padding: '0px',
              })}
            >
              {t('full_list_of_features')}
            </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ width: '100%', padding: '0px' }}>
          <Stack alignItems='start' gap='32px'>
            {currentSections.map((section, index) => (
              <Stack gap='12px' key={index}>
                {section.isTitleRow && <SectionTitle>{t(section.title)}</SectionTitle>}
                {section.content.map((item, itemIndex) => {
                  if (item.type === 'info') {
                    return <InfoRow key={itemIndex} label={item.label} value={item.value} />
                  } else if (item.type === 'feature') {
                    return <FeatureRow key={itemIndex} icon={item.icon} text={item.text} />
                  }
                  return null
                })}
              </Stack>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}
