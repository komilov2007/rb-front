import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { setCourier } from '@/apis/admin/courier'
import { useOrderStore } from '@/store/order'
import { useProfileStore } from '@/store/profile'
import { changeOrderStatus } from '@/apis/admin/order'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { OrderActionProps, OrderListProps, OrderStatusesProps } from '@/types/order'

export const useOrderAction = (props: OrderActionProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { notificationCount, setNotificationCount } = useProfileStore(state => ({
    notificationCount: state.notificationCount,
    setNotificationCount: state.setNotificationCount,
  }))
  const courier = useMutation({
    mutationFn: async (id: number) => {
      return await setCourier(id, props.id)
    },
  })

  const handleUpdate = () => {
    if (props.onUpdate) props.onUpdate()
    void queryClient.invalidateQueries([REACT_QUERY_KEYS.ORDER_STATUS_COUNT])
    queryClient.setQueryData(props.queryKey as string[], ({ data, ...rest }) => {
      const results = data.results.filter((o: OrderListProps) => o.id !== props.id)
      const newData = { ...data, count: data.count - 1, results }
      setNotificationCount({ ...notificationCount, order: newData?.count })

      return { ...rest, data: newData }
    })
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: async (status: OrderStatusesProps) => {
      const { is_debt } = useOrderStore.getState()
      return await changeOrderStatus(
        {
          status,
          courier: props.courierId,
          is_paid: status === 'COMPLETED' ? true : undefined,
          admin_comment: props.comment || undefined,
          for_debt: is_debt !== null ? is_debt : undefined,
        },
        props.id,
      )
    },
    onSuccess: res => {
      if (props.status === 'NEW') {
        if (props.courierId) courier.mutate(props.courierId)
      }
      toast.success(t('the_action_has_successfully_been_completed'))
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ORDER_STATUS_COUNT])
      if (props.tab === 'ALL') {
        if (props.onUpdate) props.onUpdate()
        queryClient.setQueryData(props.queryKey as string[], ({ data, ...rest }) => {
          const results = data.results.map((o: OrderListProps) =>
            o.id === props.id ? { ...o, status: res.data.status } : o,
          )
          const newData = { ...data, results }
          return { ...rest, data: newData }
        })
      } else {
        handleUpdate()
      }
    },
  })

  const handleChaneStatus = (status: OrderStatusesProps) => () => {
    mutate(status)
  }

  return { isLoading, handleUpdate, handleChaneStatus }
}
