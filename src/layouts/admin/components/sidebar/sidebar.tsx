import { Shops } from '../shops'
import Box from '@mui/material/Box'
import Zoom from '@mui/material/Zoom'
import Stack from '@mui/material/Stack'
import { Accordion } from '../accordion'
import { Logo } from '@/components/logo'
import { useSidebar } from './useSidebar'
import { NavLink } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import { Subcription } from '../subcription'
import Skeleton from '@mui/material/Skeleton'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import { useSidebarList } from '@/hooks/useSidebarList'
import { type SidebarProps } from '@/constants/sidebar'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { ReactComponent as IconMenu } from '@/assets/icons/menu.svg'
import { Ul, Li, Aside, Header, Drawer, WrapButton, WrapCount } from './style'
import { ReactComponent as IconDirectionDown } from '@/assets/icons/direction-down.svg'
import { getTitle } from '@/constants/domain-themes'

interface SidebarTypeProps {
  variant: 'menu' | 'sidebar'
}

export const Sidebar = ({ variant }: SidebarTypeProps) => {
  const { t } = useTranslation()
  const { sidebar } = useSidebarList()
  const { expanded, isMenuOpen, drawerMobile, setMenuToogle, handleChange, handleCloseAccordion } =
    useSidebar()
  const { is_admin, meIsLoading, isMultibank, hasSubscription, notificationCount } =
    useProfileStore(state => ({
      is_admin: state.me?.is_admin,
      meIsLoading: state.meIsLoading,
      isMultibank: state.isMultibank,
      notificationCount: state.notificationCount,
      hasSubscription:
        (!state.me?.subscription.is_expired && !state.me?.subscription.is_free) ||
        (state.me?.subscription.difference && state.me?.subscription.difference > 2),
    }))

  const content = () => {
    return (
      <Aside isMultibank={isMultibank}>
        <Stack overflow='hidden'>
          <Header>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pl: isMenuOpen ? '16px' : '0',
                justifyContent: isMenuOpen ? 'flex-start' : 'center',
              }}
            >
              <Logo variant='admin' />
            </Box>
            {is_admin && <Shops />}
          </Header>
          <Ul
            sx={{
              pb: hasSubscription ? '100px' : 0,
            }}
          >
            {meIsLoading
              ? Array.from({ length: 10 }, (_, i: number) => (
                  <Box key={i} p='0 12px 0 14px'>
                    <Skeleton height='44px' variant='rounded' component={Li} />
                  </Box>
                ))
              : sidebar.map((props: SidebarProps) => {
                  const { href, Icon, active, children, IconActive } = props
                  const hasChildren = children && children.length > 0
                  const menu = props.menu === 'market' ? getTitle().title : props.menu

                  return (
                    <Li key={href} isMultibank={isMultibank}>
                      {isMenuOpen ? (
                        hasChildren ? (
                          <Accordion
                            {...props}
                            onChange={handleChange}
                            expanded={expanded === href}
                            onClose={drawerMobile.setFalse}
                          />
                        ) : (
                          <NavLink to={href} onClick={handleCloseAccordion}>
                            {({ isActive }) => (
                              <div
                                className={`${isActive ? 'active ' : active ? 'only-text-active' : 'notactive'} sidebar-text`}
                              >
                                <Box display='flex' alignItems='center' flexGrow={1}>
                                  <Stack flexGrow={1} direction='row' alignItems='center'>
                                    <div className={`icon ${menu}`}>
                                      {isActive || active ? <IconActive /> : <Icon />}
                                    </div>
                                    <span>{t(menu)}</span>
                                  </Stack>
                                  {props.count && notificationCount[props.count] > 0 && (
                                    <WrapCount sx={{ mr: '10px' }}>
                                      {notificationCount[props.count]}
                                    </WrapCount>
                                  )}
                                </Box>
                              </div>
                            )}
                          </NavLink>
                        )
                      ) : (
                        <Tooltip
                          arrow
                          title={
                            hasChildren ? (
                              <Stack p='13px 0' gap='14px'>
                                {children.map(ch => (
                                  <Stack key={ch.href}>
                                    <NavLink to={`${href}/${ch.href}`}>
                                      <span className='text'>{t(ch.menu)}</span>
                                    </NavLink>
                                  </Stack>
                                ))}
                              </Stack>
                            ) : (
                              <Stack
                                gap='65px'
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                              >
                                {t(menu)}
                                {props.count && notificationCount[props.count] > 0 && (
                                  <WrapCount sx={{ mr: '10px' }}>
                                    {notificationCount[props.count]}
                                  </WrapCount>
                                )}
                              </Stack>
                            )
                          }
                          placement='right'
                          TransitionComponent={Zoom}
                          componentsProps={{
                            arrow: {
                              sx: theme => ({
                                '::before': {
                                  background: theme.palette.allColors.WHITE,
                                },
                              }),
                            },
                            tooltip: {
                              sx: theme => ({
                                display: 'flex',
                                fontWeight: 400,
                                fontSize: '16px',
                                borderRadius: '6px',
                                alignItems: 'center',
                                padding: '0 20px 0 15px',
                                marginLeft: '20px !important',

                                height: hasChildren ? 'fit-content' : 44,
                                background: theme.palette.allColors.WHITE,
                                filter: `drop-shadow(0px 3px 20px ${theme.palette.allColors.GRAY370})`,
                                '&,.text': {
                                  color: theme.palette.allColors.GRAY30,
                                },
                              }),
                            },
                          }}
                        >
                          {hasChildren ? (
                            <div className='link'>
                              <div className='notactive'>
                                <div className={`icon ${menu}`}>
                                  <Icon />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <NavLink to={href}>
                              {({ isActive }) => (
                                <div
                                  className={
                                    isActive ? 'active ' : active ? 'only-text-active' : 'notactive'
                                  }
                                >
                                  <div className={`icon ${menu}`}>
                                    {isActive || active ? <IconActive /> : <Icon />}
                                  </div>
                                </div>
                              )}
                            </NavLink>
                          )}
                        </Tooltip>
                      )}
                    </Li>
                  )
                })}
          </Ul>
        </Stack>
        <Subcription onClose={drawerMobile.setFalse} />
      </Aside>
    )
  }

  if (variant === 'menu') {
    return (
      <Stack
        sx={{
          display: { xs: 'unset', sm: 'none' },
        }}
      >
        <IconButton onClick={drawerMobile.setTrue}>
          <IconMenu />
        </IconButton>
        <SwipeableDrawer
          anchor='left'
          open={drawerMobile.value}
          onOpen={drawerMobile.setTrue}
          onClose={drawerMobile.setFalse}
          PaperProps={{
            sx: {
              width: '80%',
            },
          }}
        >
          {content()}
        </SwipeableDrawer>
      </Stack>
    )
  }

  return (
    <Box
      position='relative'
      sx={{
        display: { xs: 'none', sm: 'unset' },
      }}
    >
      <WrapButton isMultibank={isMultibank}>
        <IconButton onClick={setMenuToogle}>
          <Stack
            sx={{
              transform: isMenuOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          >
            <IconDirectionDown />
          </Stack>
        </IconButton>
      </WrapButton>
      <Drawer variant='permanent' open={isMenuOpen}>
        {content()}
      </Drawer>
    </Box>
  )
}
