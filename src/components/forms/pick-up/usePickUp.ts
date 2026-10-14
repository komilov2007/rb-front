import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { type PickUpProps } from '@/types/branch'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery, useMutation } from '@tanstack/react-query'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { deleteShopDelivery, getShopPickup, updateShopPickUp } from '@/apis/admin/shop'
import { branchesPickUpSchema, type SchemaTypePickUpBranches } from '@/utils/schema'

export const usePickUp = () => {
  const { t } = useTranslation()
  const { value, setTrue, setFalse } = useBoolean()
  const form = useForm<SchemaTypePickUpBranches>({
    mode: 'onChange',
    resolver: yupResolver(branchesPickUpSchema),
    defaultValues: branchesPickUpSchema.cast({}),
  })

  const { data, refetch, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.SHOP_PICKUP_DETAILS],
    queryFn: getShopPickup,
    onSuccess: data => {
      const branches = data.data.branches.map(b => ({
        name: b.name,
        branchId: b.id,
        address: b.address,
        checked: b.service.includes('PICKUP') && data.data.is_active,
      }))
      form.reset({
        branches,
        shipping_time: data.data?.shipping_time,
      })
    },
  })

  const branches = data?.data.branches.filter(b => b.service.includes('PICKUP')) ?? []

  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: async (values: PickUpProps) => {
      return await updateShopPickUp(values)
    },
    onSuccess: () => {
      form.reset(branchesPickUpSchema.cast({}))
      void refetch()
      toast.success(t('the_action_has_successfully_been_completed'))
      setFalse()
    },
  })

  const { mutate, isLoading: isLoadingDelete } = useMutation({
    mutationFn: async () => {
      return await deleteShopDelivery(String(data?.data.id))
    },
    onSuccess: () => {
      void refetch()
      setFalse()
      toast.success(t('deleted'))
    },
  })

  const onSubmit = (values: SchemaTypePickUpBranches) => {
    const branches = values.branches.map(b => ({
      id: b.branchId,
      service: b.checked ? ['DELIVERY', 'PICKUP'] : ['DELIVERY'],
    }))
    const info = {
      ...data?.data,
      branches,
      is_active: true,
      shipping_time: values.shipping_time,
    }
    mutateUpdate(info as PickUpProps)
  }

  const handleDelete = () => {
    mutate()
  }

  return {
    data,
    form,
    value,
    setTrue,
    branches,
    setFalse,
    onSubmit,
    isLoading,
    handleDelete,
    isLoadingDelete,
    isLoadingUpdate,
  }
}
