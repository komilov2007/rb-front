import { useQuery } from '@tanstack/react-query'
import { useProfileStore } from '@/store/profile'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getNotificationCount } from '@/apis/admin/notifications'
import { getMe, getPreDashboard, getProfile } from '@/apis/admin/profile'

export const useGeneral = () => {
  const { setMe, language, languages, setProfile, setPreDashboard, setNotificationCount } =
    useProfileStore(state => ({
      setMe: state.setMe,
      language: state.language,
      setProfile: state.setProfile,
      languages: state.me?.languages,
      setPreDashboard: state.setPreDashboard,
      setNotificationCount: state.setNotificationCount,
    }))

  const me = useQuery({
    queryFn: getMe,
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.ME],
    onSuccess: res => {
      setMe(res.data)
    },
  })

  const notificationCount = useQuery({
    keepPreviousData: true,
    queryFn: getNotificationCount,
    queryKey: [REACT_QUERY_KEYS.NOTIFICATION_COUNT],
    onSuccess: res => {
      setNotificationCount(res.data)
    },
  })

  const profile = useQuery({
    queryFn: getProfile,
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.PROFILE],
    onSuccess: res => {
      setProfile(res.data)
    },
  })

  const preDashboard = useQuery({
    queryFn: getPreDashboard,
    keepPreviousData: true,
    queryKey: [REACT_QUERY_KEYS.PRE_DASHBOARD],
    onSuccess: res => {
      setPreDashboard(res.data)
    },
  })

  const isLoading =
    me.isLoading || profile.isLoading || preDashboard.isLoading || notificationCount.isLoading

  return { isLoading, language, languages }
}
