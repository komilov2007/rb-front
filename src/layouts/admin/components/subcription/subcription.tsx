import Zoom from '@mui/material/Zoom'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ROUTER } from '@/constants/router'
import { useMenuStore } from '@/store/menu'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import IconButton from '@mui/material/IconButton'
import { ReactComponent as IconSidemenuMembership } from '@/assets/icons/sidemenu-membership.svg'

interface SubcriptionProps {
  onClose: () => void
}

export const Subcription = ({ onClose }: SubcriptionProps) => {
  const { t } = useTranslation()
  const isMenuOpen = useMenuStore(state => state.isMenuOpen)
  const { me, isMultibank } = useProfileStore(state => ({
    me: state?.me,
    isMultibank: state.isMultibank,
  }))

  if (!isMenuOpen) {
    return (
      <Stack
        p='20px'
        alignItems='center'
        justifyContent='center'
        sx={{
          svg: {
            width: '40px',
            height: '40px',
          },
        }}
      >
        <Tooltip
          arrow
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
                height: 'fit-content',
                padding: '0 20px 0 15px',
                marginLeft: '20px !important',
                background: theme.palette.allColors.WHITE,
                filter: `drop-shadow(0px 3px 20px ${theme.palette.allColors.GRAY370})`,
                '&,.text': {
                  color: theme.palette.allColors.GRAY30,
                },
              }),
            },
          }}
          title={
            <Stack alignItems='center'>
              <Typography fontSize='18px' lineHeight='normal'>
                {t('tariffs')}
              </Typography>
              {(!me?.subscription.is_expired || me?.subscription.is_free) && (
                <Typography mt='-3px' fontSize='11px' lineHeight='normal'>
                  {t('day_count', { value: me?.subscription.difference })}
                </Typography>
              )}
            </Stack>
          }
        >
          <IconButton
            radius='6px'
            onClick={onClose}
            component={Link}
            to={ROUTER.PRICING_PLAN}
            sx={theme => ({
              p: '4px',
              svg: {
                path: {
                  fill: isMultibank ? theme.palette.allColors.GREEN80 : undefined,
                },
              },
            })}
          >
            <IconSidemenuMembership />
          </IconButton>
        </Tooltip>
      </Stack>
    )
  }

  return (
    <>
      <Stack p='20px'>
        <Button
          size='medium'
          component={Link}
          onClick={onClose}
          to={ROUTER.PRICING_PLAN}
          sx={theme => ({
            color: isMultibank ? theme.palette.allColors.GREEN70 : undefined,
            background: isMultibank ? theme.palette.allColors.GREEN80 : undefined,
            ':hover': {
              background: isMultibank ? theme.palette.allColors.GREEN80 : undefined,
            },
          })}
        >
          <Stack gap='5px' alignItems='center' direction='row' justifyContent='center'>
            <Typography fontSize='18px' lineHeight='normal' sx={{ fontWeight: '700 !important' }}>
              {me?.subscription.tariff}
            </Typography>
            {(!me?.subscription.is_expired || me?.subscription.is_free) && (
              <Typography mt='3px' fontSize='11px' lineHeight='normal'>
                ({t('day_count', { value: me?.subscription.difference })})
              </Typography>
            )}
          </Stack>
        </Button>
      </Stack>
    </>
  )
}
