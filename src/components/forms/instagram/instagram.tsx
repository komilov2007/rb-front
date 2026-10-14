import { Wrapper } from './style'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import { stringAvatar } from '@/utils/avatar'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useProfileStore } from '@/store/profile'
import LoadingButton from '@mui/lab/LoadingButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getCurrentDomainMeta } from '@/constants/domain-themes'
import { ReactComponent as IconRemove } from '@/assets/icons/remove.svg'
import { deleteInstagram, getInstagram, sendInstagram } from '@/apis/admin/instagram'
import { openExternal } from '@/utils/native-bridge'

export const Instagram = () => {
  const modal = useBoolean()
  const { t } = useTranslation()
  const { setSubscriptionModal, is_free, is_expired } = useProfileStore(state => ({
    setSubscriptionModal: state.setSubscriptionModal,
    is_free: state.me?.subscription.is_free,
    is_expired: state.me?.subscription.is_expired,
  }))

  const { data, refetch, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.INSTAGRAM_DETAIL],
    queryFn: getInstagram,
  })

  const instagram = useMutation({
    mutationFn: async () =>
      await sendInstagram({
        platform: getCurrentDomainMeta().platform,
      }),
    onSuccess: res => {
      setTimeout(() => {
        openExternal(res.data.redirect_uri)
      })
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const logout = useMutation({
    mutationFn: async () => await deleteInstagram(),
    onSuccess: () => {
      void refetch()
      modal.setFalse()
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  const { integrations } = useProfileStore(state => ({
    integrations: state.me?.subscription.limit,
  }))

  const handleClick = () => {
    if ((is_free && !is_expired) || integrations?.social_networks) {
      if (data?.data.username) {
        modal.setTrue()
      } else {
        instagram.mutate()
      }
    } else {
      setSubscriptionModal(true, {
        title: 'This_integration_is_available_only_on_Basic_and_Pro_plans',
        value: 'Instagram',
        description:
          'please_upgrade_to_Basic_or_Pro_and_unlock_full_access_to_platform_features_that_boost_your_business_efficiency',
      })
    }
  }

  const handleDelete = () => {
    logout.mutate()
  }

  return (
    <>
      <LoadingButton
        onClick={handleClick}
        variant='outlined-purple'
        loading={instagram.isLoading || isLoading}
      >
        {t(data?.data.username ? 'installed' : 'install')}
      </LoadingButton>

      <SwipeableDrawer
        anchor='right'
        open={modal.value}
        onOpen={modal.setTrue}
        onClose={modal.setFalse}
      >
        <Box
          display='flex'
          p='7px 7px 0 32px'
          component='header'
          alignItems='center'
          justifyContent='flex-end'
        >
          <IconButton onClick={modal.setFalse}>
            <IconRemove />
          </IconButton>
        </Box>
        <Box className='content'>
          <Wrapper>
            <Stack gap='20px' direction='row' alignItems='center'>
              <Avatar
                src={data?.data.profile_picture_url ?? ''}
                {...stringAvatar(data?.data.username ?? '', {
                  width: 50,
                  height: 50,
                  fontSize: '12px',
                })}
              />
              <Stack gap='10px'>
                <Typography
                  component='a'
                  target='_blank'
                  variant='title10'
                  href={`https://www.instagram.com/${data?.data.username}`}
                >
                  {data?.data.username}
                </Typography>
                <Stack gap='15px' direction='row'>
                  <Typography variant='text70'>{data?.data.followers_count} followers</Typography>
                  <Typography variant='text70'>{data?.data.follows_count} following</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack gap='20px' direction='row' alignItems='center' justifyContent='flex-end'>
              <LoadingButton
                size='small'
                onClick={handleDelete}
                variant='contained-red'
                loading={logout.isLoading}
              >
                {t('log_out')}
              </LoadingButton>
            </Stack>
          </Wrapper>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
