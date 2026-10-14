import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { getUser } from '@/utils/user'
import { reportError } from '@/utils/report-error'
import { type HocProps } from '@/types/hoc'
import { ROUTER } from '@/constants/router'
import { useLocation } from 'react-router-dom'
import { Spinner } from '@/components/spinner'
import { useTranslation } from 'react-i18next'
import { useGeneral } from '@/hooks/useGeneral'
import { fcmToken } from '@/apis/admin/firebase'
import { HocPermission } from './hoc-permission'
import { getGlobalSettings } from '@/apis/common'
import { useProfileStore } from '@/store/profile'
import { type MessagePayload } from 'firebase/messaging'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { MESSAGES, type MessageStatusProps } from './constants'
import { requestPermission, onMessageListener } from '@/firebase/firebase'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface FirebaseMessageProps {
  shop: string
  order: string
  customer: string
  type: 'ORDER' | 'CHAT'
  status: MessageStatusProps
}

export const HocFirebase = ({ children }: HocProps) => {
  const { t } = useTranslation()
  const user = getUser()
  const { isLoading } = useGeneral()
  const location = useLocation()
  const queryClient = useQueryClient()
  const setGlobalSettings = useProfileStore(state => state.setGlobalSettings)
  const { mutate } = useMutation({
    mutationFn: fcmToken,
    onError: error => {
      reportError('fcm:registerToken', error)
    },
  })

  useQuery({
    keepPreviousData: true,
    queryFn: getGlobalSettings,
    queryKey: [REACT_QUERY_KEYS.GLOBAL_SETTINGS],
    onSuccess: res => {
      setGlobalSettings(res.data)
    },
  })

  useEffect(() => {
    void requestPermission(mutate, t('please_turn_on_your_notification_permission'))
  }, [t, mutate])

  const handleMessage = (payload: MessagePayload) => {
    const data = JSON.parse(JSON.stringify(payload.data)) as FirebaseMessageProps

    if (data.type === 'ORDER' && data.shop === user.shop) {
      if (location.pathname.includes(`${ROUTER.ADMIN}/${ROUTER.ORDERS}`)) {
        void queryClient.invalidateQueries({
          predicate: query => {
            const q = query.queryKey[0] as string
            return (
              q.startsWith(REACT_QUERY_KEYS.ORDER_STATUS_LIST) ||
              q.startsWith(REACT_QUERY_KEYS.ORDER_STATUS_COUNT) ||
              q.startsWith(REACT_QUERY_KEYS.NOTIFICATION_COUNT)
            )
          },
        })
      }

      toast.success(t(MESSAGES[data.status].label))
    }
  }

  /**
   * The handler is held in a ref so the subscription stays mounted for the life
   * of the layout while still reading the current route and shop — resubscribing
   * on every render is what produced duplicate order toasts.
   */
  const handlerRef = useRef(handleMessage)
  handlerRef.current = handleMessage

  useEffect(
    () =>
      onMessageListener(payload => {
        handlerRef.current(payload)
      }),
    [],
  )

  return <>{isLoading ? <Spinner center /> : <HocPermission>{children}</HocPermission>}</>
}
