import { Logout } from '../logout'
import { MenuItem } from './style'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Help } from '@/components/help'
import Avatar from '@mui/material/Avatar'
import { NavLink } from 'react-router-dom'
import Popover from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import { PROFILE_SIDEBAR } from './constants'
import { Notification } from '../notification'
import { PRICING_PLANS } from '@/constants/plan'
import { useState, type MouseEvent } from 'react'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useProfileStore } from '@/store/profile'
import { Trans, useTranslation } from 'react-i18next'
import { SelectI18nLanguage } from '../selects/select-i18n-language/select'
import { Platform } from '../platform'

interface AccountProps {
  varaint: 'header' | 'sidebar'
}

export const Account = ({ varaint }: AccountProps) => {
  const { t } = useTranslation()
  const links = useProfileStore(state => state.me?.links)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const { me, photo, firstname, is_admin, isLoading } = useProfileStore(state => ({
    me: state.me,
    photo: state.photo,
    firstname: state.firstname,
    isLoading: state.isLoading,
    is_admin: state.me?.is_admin,
  }))

  const open = Boolean(anchorEl)
  const id = open ? 'account-popover' : undefined
  const isHeader = varaint === 'header'

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const profile = () => {
    return (
      <>
        <Stack gap='20px'>
          <Stack direction='row'>
            <Stack gap='10px' direction='row'>
              <Avatar src={photo} alt={firstname} sx={{ width: '46px', height: '46px' }} />
              <Stack gap='4px' justifyContent='center'>
                <Typography
                  variant='title20'
                  fontWeight='500'
                  sx={{
                    maxWidth: '150px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {firstname}
                </Typography>
                {me?.subscription.is_free ? (
                  <Typography variant='text130'>
                    <Trans
                      i18nKey='free_plan_has_days_left'
                      values={{ value: me?.subscription.difference }}
                      components={{
                        linkTag: (
                          <Typography
                            variant='inherit'
                            component='span'
                            fontWeight='700'
                            color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                          />
                        ),
                      }}
                    />
                  </Typography>
                ) : me?.subscription.difference && me?.subscription.difference < 10 ? (
                  <Typography variant='text130'>
                    <Trans
                      i18nKey='there_are_days_left_until_the_end_of_the_tariff'
                      values={{
                        value: me?.subscription.difference,
                        tariff:
                          me?.subscription.tariff && PRICING_PLANS[me?.subscription.tariff].title,
                      }}
                      components={{
                        linkTag: (
                          <Typography
                            variant='inherit'
                            component='span'
                            fontWeight='700'
                            color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                          />
                        ),
                      }}
                    />
                  </Typography>
                ) : (
                  <Typography variant='text130'>
                    <Trans
                      i18nKey='there_are_days_left_until_the_end_of_the_tariff'
                      values={{
                        value: me?.subscription.difference,
                        tariff:
                          me?.subscription.tariff && PRICING_PLANS[me?.subscription.tariff]?.title,
                      }}
                      components={{
                        linkTag: (
                          <Typography
                            variant='inherit'
                            component='span'
                            fontWeight='700'
                            color={theme => theme.palette.colors['L-BLACK30-D-WHITE20']}
                          />
                        ),
                      }}
                    />
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Divider />
        </Stack>
        <Box
          width='100%'
          sx={{
            display: { xs: 'unset', sm: 'none' },
          }}
        >
          <Stack p='10px 0' width='100%' direction='row' justifyContent='space-between'>
            <SelectI18nLanguage variant='header' />
            <Stack gap='20px' direction='row'>
              <Help />
              <Notification />
            </Stack>
          </Stack>
          <Divider />
        </Box>
        {(links?.bot || links?.website) && (
          <Stack mt='14px' gap='10px' direction='row' alignItems='center' justifyContent='flex-end'>
            {links?.bot && <Platform platform='TELEGRAM' />}
            {links?.website && <Platform platform='WEBSITE' />}
          </Stack>
        )}
        <Stack gap='10px' mt='14px'>
          {PROFILE_SIDEBAR.filter(p => {
            if (p.title === 'platforms') {
              return is_admin
            }
            return true
          }).map(({ to, Icon, title }, index: number) => (
            <MenuItem key={index} onClick={handleClose} header={isHeader}>
              <NavLink end to={to}>
                {({ isActive }) => (
                  <div className={isActive ? 'active' : 'notactive'}>
                    <Icon /> {t(title)}
                  </div>
                )}
              </NavLink>
            </MenuItem>
          ))}
          <MenuItem header={isHeader}>
            <Logout varaint='account' />
          </MenuItem>
        </Stack>
      </>
    )
  }

  return (
    <>
      {isHeader ? (
        <>
          {isLoading ? (
            <IconButton>
              <Skeleton variant='circular' sx={{ width: '36px', height: '36px' }} />
            </IconButton>
          ) : (
            <Stack width='fit-content'>
              <IconButton aria-describedby={id} onClick={handleClick}>
                <Avatar src={photo} alt={firstname} sx={{ width: '36px', height: '36px' }} />
              </IconButton>
            </Stack>
          )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            sx={{ zIndex: 2000001 }}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            slotProps={{
              paper: {
                sx: theme => ({
                  mt: '13px',
                  p: '20px 22px',
                  minWidth: '290px',
                  overflow: 'visible',
                  borderRadius: '12px',
                  background: theme.palette.colors['L-WHITE-D-GRAY40'],
                  border: `1px solid ${theme.palette.allColors.GRAY70}`,
                  boxShadow: `0px 2px 30px 0px ${theme.palette.allColors.GRAY80}`,
                  '&:before': {
                    top: 0,
                    right: 20,
                    width: 15,
                    height: 15,
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    backgroundColor: 'inherit',
                    transform: 'translateY(-50%) rotate(45deg)',
                    borderTop: `1px solid ${theme.palette.allColors.GRAY70}`,
                    borderLeft: `1px solid ${theme.palette.allColors.GRAY70}`,
                    boxShadow: `0px 2px 30px 0px ${theme.palette.allColors.GRAY80}`,
                  },
                }),
              },
            }}
          >
            {profile()}
          </Popover>
        </>
      ) : (
        profile()
      )}
    </>
  )
}
