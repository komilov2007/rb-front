import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Trans, useTranslation } from 'react-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Table, Container, WrapperLogo, StyledHR } from './style'
import { ReactComponent as IconSell } from '@/assets/icons/sell.svg'
import { ReactComponent as IconPanel } from '@/assets/icons/panel.svg'
import { ReactComponent as IconGlobal } from '@/assets/icons/global.svg'
import { getDomainLogo, getCurrentDomainMeta } from '@/constants/domain-themes'
import { ReactComponent as IconPlanShape } from '@/assets/icons/plan-shape.svg'
import { ReactComponent as IconTelegramSolid } from '@/assets/icons/telegram.svg'
import { ReactComponent as IconIntegration } from '@/assets/icons/integration.svg'

const TABLE_DATA = [
  {
    icon: IconTelegramSolid,
    title: 'telegram_bot',
    price: '5 000 000 - 7 000 000',
  },
  {
    icon: IconGlobal,
    title: 'website',
    price: '15 000 000 - 20 000 000',
  },
  {
    icon: IconPanel,
    title: 'admin_panel',
    price: '5 000 000 - 7 000 000',
  },
  {
    icon: IconIntegration,
    title: 'integrations',
    subtitle: 'payment_systems',
    subtitle2: 'stock',
    price: '5 000 000 - 7 000 000',
  },
  {
    icon: IconSell,
    title: 'training_and_support',
    price: '5 000 000 - 7 000 000',
  },
]

export const Loses = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { IconLogo } = getDomainLogo()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Container>
      <div className='shape top'>
        <IconPlanShape />
      </div>
      <Stack
        p={mobile ? '50px 0px' : '50px 20px'}
        gap='50px'
        className='content'
        alignItems={mobile ? '' : 'center'}
        sx={theme => ({ background: theme.palette.allColors.GREEN90 })}
      >
        <Typography
          align='center'
          component='h2'
          variant='title'
          maxWidth='620px'
          lineHeight='28px'
          textTransform='uppercase'
        >
          <Trans
            i18nKey='lets_consider_the_minimal_losses_without'
            values={{ market: getCurrentDomainMeta().appName }}
            components={{
              logo: <WrapperLogo />,
            }}
          />
        </Typography>
        {mobile ? (
          <Stack>
            <Stack>
              <Stack p={'0 20px'}>
                <Typography variant='title70' component='h4'>
                  {t('custom_development')}
                </Typography>
                <Typography variant='text'>({t('term_starting_from_1_month')})</Typography>
                <StyledHR />
                <Stack gap={'32px'}>
                  {TABLE_DATA.map(({ icon: Icon, title, subtitle, subtitle2, price }, index) => (
                    <Stack key={index} gap={'12px'}>
                      <Stack gap='8px' direction='row' alignItems='center'>
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
                        <Typography variant='title20' maxWidth='250px'>
                          {t(title)}
                          {subtitle && (
                            <Typography
                              variant='inherit'
                              component='span'
                              textTransform='lowercase'
                            >
                              ({t(subtitle)}/{t(subtitle2)})
                            </Typography>
                          )}
                        </Typography>
                      </Stack>
                      <Typography>
                        {price} {t('soum')}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              <Stack
                p={'8px 20px'}
                gap={'12px'}
                marginTop={'32px'}
                sx={theme => ({ backgroundColor: theme.palette.allColors.GREEN100 })}
              >
                <Typography variant='title20'>{t('total_costs')}</Typography>
                <Typography
                  variant='inherit'
                  fontWeight={700}
                  sx={theme => ({ color: theme.palette.allColors.RED })}
                >
                  50 000 000 - 62 000 000 {t('soum')}
                </Typography>
              </Stack>
            </Stack>

            <Stack>
              <Stack p={'0 20px'} marginTop={'58px'}>
                <IconLogo />
                <StyledHR />
                <Stack gap={'32px'}>
                  {TABLE_DATA.map(({ icon: Icon, title, subtitle, subtitle2, price }, index) => (
                    <Stack key={index} gap={'12px'}>
                      <Stack gap='8px' direction='row' alignItems='center'>
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
                        <Typography variant='title20' maxWidth='250px'>
                          {t(title)}
                          {subtitle && (
                            <Typography
                              variant='inherit'
                              component='span'
                              textTransform='lowercase'
                            >
                              ({t(subtitle)}/{t(subtitle2)})
                            </Typography>
                          )}
                        </Typography>
                      </Stack>
                      <Typography>{t('included_in_the_subscription')}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
              <Stack
                p={'8px 20px'}
                gap={'12px'}
                marginTop={'32px'}
                sx={theme => ({ backgroundColor: theme.palette.allColors.GREEN100 })}
              >
                <Typography variant='title20'>{t('total_costs')}</Typography>
                <Typography
                  variant='inherit'
                  fontWeight={700}
                  sx={theme => ({ color: theme.palette.allColors.PURPLE })}
                >
                  500 000 {t('soum')}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ) : (
          <Table>
            <thead>
              <tr>
                <th />
                <th>
                  <Typography variant='title70' component='h3'>
                    {t('custom_development')}
                  </Typography>
                  <Typography variant='text'>({t('term_starting_from_1_month')})</Typography>
                </th>
                <th>
                  <IconLogo />
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map(({ icon: Icon, title, subtitle, subtitle2, price }, index) => (
                <tr key={index}>
                  <td>
                    <Stack gap='8px' direction='row' alignItems='center'>
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
                      <Typography variant='title20' maxWidth='250px'>
                        {t(title)}
                        {subtitle && (
                          <Typography variant='inherit' component='span' textTransform='lowercase'>
                            ({t(subtitle)}/{t(subtitle2)})
                          </Typography>
                        )}
                      </Typography>
                    </Stack>
                  </td>
                  <td>
                    {price} {t('soum')}
                  </td>
                  <td>{t('included_in_the_subscription')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Typography variant='title20'>{t('total_costs')}</Typography>
                </td>
                <td>
                  <Typography
                    variant='inherit'
                    fontWeight={700}
                    sx={theme => ({ color: theme.palette.allColors.RED })}
                  >
                    50 000 000 - 62 000 000 {t('soum')}
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant='inherit'
                    fontWeight={700}
                    sx={theme => ({ color: theme.palette.allColors.PURPLE })}
                  >
                    500 000 {t('soum')}
                  </Typography>
                </td>
              </tr>
            </tfoot>
          </Table>
        )}
      </Stack>
      <div className='shape bottom'>
        <IconPlanShape />
      </div>
    </Container>
  )
}
