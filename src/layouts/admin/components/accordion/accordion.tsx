import Box from '@mui/material/Box'
import { ROUTER } from '@/constants/router'
import { type SyntheticEvent } from 'react'
import { WrapCount } from '../sidebar/style'
import { useTranslation } from 'react-i18next'
import { useProfileStore } from '@/store/profile'
import { NavLink, useLocation } from 'react-router-dom'
import { type SidebarProps } from '@/constants/sidebar'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { Ul, Li, Wrapper, WrapLink, WrapPro, MuiAccordion } from './style'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import { ReactComponent as IconDirectionDownLinear } from '@/assets/icons/direction-down-linear.svg'

interface AccordionProps extends SidebarProps {
  expanded: boolean
  onClose: () => void
  onChange: (panel: string, isExpanded: boolean) => void
}

export const Accordion = ({
  href,
  menu,
  Icon,
  label,
  count,
  onClose,
  onChange,
  expanded,
  children,
  IconActive,
}: AccordionProps) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { isFree, tariff, isExpired, business_type, isMultibank, notificationCount } =
    useProfileStore(state => ({
      tariff: state.me?.subscription.tariff,
      isMultibank: state.isMultibank,
      notificationCount: state.notificationCount,
      isFree: state.me?.subscription.is_free,
      business_type: state.me?.business_type,
      isExpired: state.me?.subscription.is_expired,
    }))

  const handleChange = (_: SyntheticEvent, isExpanded: boolean) => {
    onChange(href, isExpanded)
  }

  const isSiblingActive = children?.some(
    c => c.href && pathname.includes(`${ROUTER.ADMIN}/${href}/${c.href}`),
  )

  return (
    <MuiAccordion expanded={expanded} onChange={handleChange} isMultibank={isMultibank}>
      <AccordionSummary aria-controls={href} id={`${href}-${menu}`}>
        <Wrapper>
          <Box display='flex' alignItems='center'>
            <div className='icon'>{expanded ? <IconActive /> : <Icon />}</div>
            <span className='text'>{t(label ?? menu)}</span>
          </Box>
          <Box
            sx={theme => ({
              gap: '10px',
              display: 'flex',
              alignItems: 'center',
              svg: {
                path: {
                  stroke: expanded
                    ? `${isMultibank ? theme.palette.allColors.GREEN80 : theme.palette.colors['L-GRAY30-D-GRAY20']}`
                    : theme.palette.colors['L-GRAY30-D-GRAY20'],
                },
              },
            })}
          >
            {count && notificationCount[count] > 0 && (
              <WrapCount>{notificationCount[count]}</WrapCount>
            )}
            {expanded ? <IconDirectionDownLinear /> : <IconDirectionDown />}
          </Box>
        </Wrapper>
      </AccordionSummary>
      <AccordionDetails>
        <Ul>
          {children?.map(page => {
            const pro = page.isPro && tariff === 'START' && !isFree && isExpired

            return (
              <Li key={page.href}>
                <NavLink onClick={onClose} to={page.href ? `${href}/${page.href}` : href}>
                  {({ isActive }) => (
                    <WrapLink
                      isMultibank={isMultibank}
                      active={page.href ? isActive : isActive && !isSiblingActive}
                    >
                      <Box justifyContent='space-between'>
                        <h6 className='sidebar-text'>
                          {t(
                            page.menu === 'qr_code'
                              ? business_type === 'ONLINE_SHOP'
                                ? 'qr_catalog'
                                : 'qr_menu'
                              : page.menu === 'channel_mailing'
                                ? 'post_for_channel'
                                : page.menu,
                          )}
                        </h6>
                        {pro && <WrapPro>Pro</WrapPro>}
                      </Box>
                    </WrapLink>
                  )}
                </NavLink>
              </Li>
            )
          })}
        </Ul>
      </AccordionDetails>
    </MuiAccordion>
  )
}
