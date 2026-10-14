import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { clearUser } from '@/utils/user'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { ROUTER } from '@/constants/router'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import { udapteViewportMeta } from '@/utils/meta'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { resetAllSlices } from '@/configs/zustand'
import { useQueryClient } from '@tanstack/react-query'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, useColorScheme } from '@mui/material/styles'
import { ReactComponent as IconLogout } from '@/assets/icons/logout.svg'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'

interface LogoutProps {
  varaint: 'header' | 'account'
}

export const Logout = ({ varaint }: LogoutProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { setMode } = useColorScheme()
  const { value, setTrue, setFalse } = useBoolean()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const handleLogout = () => {
    clearUser()
    resetAllSlices()
    setMode('light')
    udapteViewportMeta(1)
    navigate(ROUTER.AUTH)
    setTimeout(() => {
      queryClient.clear()
    }, 100)
  }

  return (
    <>
      {varaint === 'header' ? (
        <Stack
          direction='row'
          sx={theme => ({
            'svg path': {
              stroke: theme.palette.allColors.GRAY30,
            },
          })}
        >
          {matches ? (
            <Button onClick={setTrue} variant='text-gray' startIcon={<IconLogout />}>
              {t('log_out')}
            </Button>
          ) : (
            <IconButton onClick={setTrue}>
              <IconLogout />
            </IconButton>
          )}
        </Stack>
      ) : (
        <Button fullWidth onClick={setTrue}>
          <Box display='flex' alignItems='center'>
            <IconLogout />
          </Box>
          {t('log_out')}
        </Button>
      )}
      <Dialog sx={{ zIndex: 2000002 }} scroll='body' open={value} onClose={setFalse}>
        <Stack mb='32px' p='7px 7px 0 0' alignItems='flex-end'>
          <IconButton onClick={setFalse}>
            <IconRemove />
          </IconButton>
        </Stack>
        <Stack
          alignItems='center'
          mb={{ xs: '50px', md: '57px' }}
          p={{ xs: '0 28px', md: '0 78px' }}
          maxWidth={{ xs: 'unset', md: '551px' }}
        >
          <Typography
            component='h3'
            align='center'
            fontWeight='700'
            variant='title30'
            mb={{ xs: '25px', md: '45px' }}
          >
            {t('are_you_log_out_your_account')}
          </Typography>
          <Box
            gap='14px'
            width='100%'
            display='flex'
            maxWidth='316px'
            alignItems='center'
            justifyContent='center'
          >
            <LoadingButton fullWidth size='small' variant='outlined-red' onClick={handleLogout}>
              {t('yes_log_out')}
            </LoadingButton>
            <Button fullWidth size='small' variant='contained' onClick={setFalse}>
              {t('no_stay')}
            </Button>
          </Box>
        </Stack>
      </Dialog>
    </>
  )
}
