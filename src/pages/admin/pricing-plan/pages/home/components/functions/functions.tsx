import { Table } from './style'
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

export const Functions = () => {
  const expanded = useBoolean()
  const { t } = useTranslation()

  return (
    <Stack width='100%' alignItems='center'>
      <Accordion
        TransitionProps={{ timeout: 1000 }}
        expanded={expanded.value}
        onChange={expanded.toggle}
        sx={{
          width: '100%',
          display: 'flex',
          boxShadow: 'none',
          alignItems: 'center',
          flexDirection: 'column',
          '& .MuiCollapse-root': {
            transitionTimingFunction: 'ease',
          },
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
          <Stack width='100%' alignItems='center'>
            <Button
              variant='outlined-green'
              endIcon={<IconDirectionDown />}
              sx={theme => ({
                borderRadius: '30px !important',
                'svg path': {
                  stroke: theme.palette.allColors.PURPLE,
                },
                svg: {
                  transition: 'transform 0.3s ease',
                  transform: expanded.value ? 'rotate(180deg)' : 'rotate(0deg)',
                },
              })}
            >
              {t('full_list_of_features')}
            </Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingTop: '30px', width: '100%' }}>
          <Typography variant='title' align='center' component='h3' textTransform='uppercase'>
            {t('compare_all_features_of_the_plan')}
          </Typography>
          <Stack mt='50px' gap='30px'>
            <Table>
              <thead>
                <tr>
                  <th />
                  <th>Start</th>
                  <th>Basic</th>
                  <th>Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('tech_support')}</td>
                  <td>
                    <Stack gap='4px'>
                      <Typography variant='inherit'>{t('mon_fri')}</Typography>
                      <Typography variant='inherit'>09:00 - 21:00</Typography>
                    </Stack>
                  </td>
                  <td>
                    <Stack gap='4px'>
                      <Typography variant='inherit'>{t('mon_fri')}</Typography>
                      <Typography variant='inherit'>09:00 - 21:00</Typography>
                    </Stack>
                  </td>
                  <td>
                    <Stack gap='4px'>
                      <Typography variant='inherit'>{t('mon_fri')}</Typography>
                      <Typography variant='inherit'>09:00 - 21:00</Typography>
                    </Stack>
                  </td>
                </tr>
                <tr>
                  <td>{t('business_consultant')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('branches')}</td>
                  <td>1</td>
                  <td>5</td>
                  <td>{t('infinitely')}</td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th>{t('products')}</th>
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('categories')}</td>
                  <td>{t('infinitely')}</td>
                  <td>{t('infinitely')}</td>
                  <td>{t('infinitely')}</td>
                </tr>
                <tr>
                  <td>{t('products')}</td>
                  <td>500</td>
                  <td>3 000</td>
                  <td>{t('infinitely')}</td>
                </tr>
                <tr>
                  <td>{t('artificial_intelligence')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('discount_count')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('stock')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('orders')}</td>
                  <td>300</td>
                  <td>{t('infinitely')}</td>
                  <td>{t('infinitely')}</td>
                </tr>
                <tr>
                  <td>{t('customers')}</td>
                  <td>{t('infinitely')}</td>
                  <td>{t('infinitely')}</td>
                  <td>{t('infinitely')}</td>
                </tr>
                <tr>
                  <td>{t('chat')}</td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th>{t('marketing')}</th>
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('mailing_count')}</td>
                  <td>5/{t('month')}</td>
                  <td>25/{t('month')}</td>
                  <td>{t('infinitely')}</td>
                </tr>
                <tr>
                  <td>{t('sms_mailing')}</td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('promokod')}</td>
                  <td>5</td>
                  <td>{t('infinitely')}</td>
                  <td>{t('infinitely')}</td>
                </tr>
                <tr>
                  <td>{t('sources')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('advertising_banner')}</td>
                  <td>1</td>
                  <td>5</td>
                  <td>{t('infinitely')}</td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th>{t('employees')}</th>
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('employees')}</td>
                  <td>1</td>
                  <td>5</td>
                  <td>{t('infinitely')}</td>
                </tr>
                <tr>
                  <td>{t('roles')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>5</td>
                  <td>{t('infinitely')}</td>
                </tr>
                <tr>
                  <td>{t('courier')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>5</td>
                  <td>{t('infinitely')}</td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th>{t('integrations')}</th>
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('payment_systems')} (Payme/Click/Uzum/Atmos)</td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('delivery_services')} (Fargo/UzPost/Yandex b2b)</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('pos_systems')} (IIko/ R-Keeper/ Poster)</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('inventory_management')} (Biilz/Smartup/ Sales Doctor)</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('ip_telephony')} (Online PBX/Sipuni)</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <thead>
                <tr>
                  <th>{t('analytics')}</th>
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('revenue_statistics')}</td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('order_statistics')}</td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('traffic_source')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('top_10_products')}</td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('order_map')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('orders_by_time')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
                <tr>
                  <td>{t('top_10_customers')}</td>
                  <td>
                    <IconRemoveCircle />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                  <td>
                    <IconCheckCirclePrimary />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}
