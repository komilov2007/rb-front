import { useMutation, useQuery } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import type { DeliveryMerchantProps, DeliveryMerchantTypeProps } from '@/types/common'
import { deliveryMerchant, getDeliveryMerchant, deleteDeliveryMerchant } from '@/apis/common'

interface MerchantProps {
  getOnSuccess: (data: DeliveryMerchantProps) => void
  service_type: DeliveryMerchantTypeProps
}

export const useMerchant = ({ service_type, getOnSuccess }: MerchantProps) => {
  const getMerchant = useQuery({
    queryFn: async () => await getDeliveryMerchant({ service_type }),
    queryKey: [REACT_QUERY_KEYS.DELIVERY_MERCHANT, service_type],
    onSuccess: res => {
      getOnSuccess(res.data)
    },
  })

  const deleteMerchant = useMutation({
    mutationFn: async () => await deleteDeliveryMerchant({ service_type }),
    onSuccess: () => {
      void getMerchant.refetch()
    },
  })

  const postMerchant = useMutation<Awaited<ReturnType<typeof deliveryMerchant>>, Error, object>({
    mutationFn: async data => await deliveryMerchant({ ...data, service_type, country: 1 }),
    onSuccess: () => {
      void getMerchant.refetch()
    },
  })

  return { getMerchant, postMerchant, deleteMerchant }
}
