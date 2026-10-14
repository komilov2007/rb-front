import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useProfileStore } from '@/store/profile'
import { type DropResult } from 'react-beautiful-dnd'
import { useCallback, useEffect, useState } from 'react'
import type { BannersPropsOnlineShop } from '@/types/banners'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBannersOnlineShop, updateBannerPositionOnlineShop } from '@/apis/admin/banner'

export const useBanner = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [catBanner, setCatBanner] = useState<{ data: BannersPropsOnlineShop[] }>({ data: [] })
  const [mainBanner, setMainBanner] = useState<{ data: BannersPropsOnlineShop[] }>({ data: [] })
  const { can_edit, can_delete, subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
    can_edit: state.getPermission('banner', 'can_edit'),
    can_delete: state.getPermission('banner', 'can_delete'),
  }))

  const handleSubscription = () => {
    const texts =
      subscription?.tariff === 'START'
        ? {
            title: t('Youre_on_the_Start_plan_thats_why_theres_a_limit'),
            description: t('Your_current_plan_Start_allows_only_1_banner'),
          }
        : {
            title: t('Youre_on_the_Basic_plan_thats_why_theres_a_limit'),
            description: t('Your_current_plan_Basic_allows_only_5_banner'),
          }

    setSubscriptionModal(true, texts)
  }

  const { data: mainBannerQuery, isLoading: mainLoading } = useQuery({
    queryFn: async () => await getBannersOnlineShop({ type: 'MAIN' }),
    queryKey: [REACT_QUERY_KEYS.BANNER_LIST_ONLINE_SHOP],
  })

  const { data: catBannerQuery, isLoading: catLoading } = useQuery({
    queryFn: async () => await getBannersOnlineShop({ type: 'CATEGORY' }),
    queryKey: [REACT_QUERY_KEYS.CATEGORY_BANNER_LIST],
  })

  useEffect(() => {
    if (mainBannerQuery) {
      setMainBanner(mainBannerQuery)
    }
  }, [mainBannerQuery])

  useEffect(() => {
    if (catBannerQuery) {
      setCatBanner(catBannerQuery)
    }
  }, [catBannerQuery])

  const { mutate } = useMutation({
    mutationFn: async ({
      sourceId,
      data,
    }: {
      sourceId: number
      data: { above_banner_id: number | null }
    }) => await updateBannerPositionOnlineShop(data, sourceId),
    onSuccess: async () => {
      toast.success(t('the_action_has_successfully_been_completed'))
      await queryClient.invalidateQueries([REACT_QUERY_KEYS.BANNER_LIST_ONLINE_SHOP])
      await queryClient.invalidateQueries([REACT_QUERY_KEYS.CATEGORY_BANNER_LIST])
    },
  })

  const handleOnDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, type } = result
      if (!destination) return
      if (type === 'BANNERS') {
        const newList = Array.from(mainBanner.data)
        const [movedItem] = newList.splice(source.index, 1)
        newList.splice(destination.index, 0, movedItem)
        setMainBanner({ data: newList })

        const sourceItem = movedItem
        const destinationItem = newList[destination.index - 1] || null

        if (sourceItem) {
          mutate({
            sourceId: sourceItem.id,
            data: { above_banner_id: destinationItem?.id ?? null },
          })
        }
      }

      if (type === 'CATEGORY_BANNERS') {
        const newList = Array.from(catBanner.data)
        const [movedItem] = newList.splice(source.index, 1)
        newList.splice(destination.index, 0, movedItem)
        setCatBanner({ data: newList })

        const sourceItem = movedItem
        const destinationItem = newList[destination.index - 1] || null

        if (sourceItem) {
          mutate({
            sourceId: sourceItem.id,
            data: { above_banner_id: destinationItem?.id ?? null },
          })
        }
      }
    },
    [mainBanner.data, mutate, catBanner.data],
  )

  const isDataEmpty = (mainBanner?.data.length || 0) === 0 && (catBanner?.data.length || 0) === 0

  return {
    can_edit,
    catBanner,
    mainBanner,
    catLoading,
    can_delete,
    mainLoading,
    isDataEmpty,
    subscription,
    handleOnDragEnd,
    handleSubscription,
  }
}
