import { useOrderStore } from '@/store/order'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import { useProfileStore } from '@/store/profile'
import { useDebounce } from '@/hooks/useDebounce'
import { getOrderCategories } from '@/apis/admin/order'
import { useRef, useState, type SyntheticEvent } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

interface TabRefProps {
  handleReset: () => void
}

export const useCreate = () => {
  const { t } = useTranslation()
  const tabRef = useRef<TabRefProps>()
  const [tab, setTab] = useState<string>('all')
  const [searchValue, setSearchValue] = useState('')
  const search = useDebounce(searchValue)
  const isNewVersion = useProfileStore(state => state.me?.is_new_version)
  const { subscription, setSubscriptionModal } = useProfileStore(state => ({
    subscription: state.me?.subscription,
    setSubscriptionModal: state.setSubscriptionModal,
  }))
  const { setCartsCard, setCartsDetail } = useOrderStore(state => ({
    setCartsCard: state.setCartsCard,
    setCartsDetail: state.setCartsDetail,
  }))
  const { value, setTrue, setFalse } = useBoolean(false, {
    onFalse: () => {
      tabRef.current?.handleReset()
      setTab('all')
      setSearchValue('')
      setCartsCard([])
      setCartsDetail([])
    },
  })

  const ALL_CATEGORIES = {
    value: 'all',
    label: t('all_products'),
  }

  const categories = useQuery({
    enabled: value,
    queryFn: getOrderCategories,
    queryKey: [REACT_QUERY_KEYS.ORDER_CATEGORY_LIST],
    select: res => {
      const categories = res.data.map(c => ({ value: c.id, label: c.name }))
      const newData = [ALL_CATEGORIES, ...categories]
      return { ...res, data: newData }
    },
  })

  const handleChangeTab = (_: SyntheticEvent, tab: string) => {
    tabRef.current?.handleReset()
    setTab(tab)
    setSearchValue('')
  }

  const handleSearch = (search: string) => {
    tabRef.current?.handleReset()
    setSearchValue(search)
  }

  const handleOpen = () => {
    const canOpen =
      (subscription?.tariff === 'START' && subscription?.limit.orders_count < 10) ||
      subscription?.tariff === 'BASIC' ||
      subscription?.tariff === 'PRO'

    if (canOpen) {
      setTrue()
    } else {
      setSubscriptionModal(true, {
        title: 'Order_limit_reached',
        text: 'Youre_currently_on_the_Start_plan_which_allows_up_to_10_orders_per_month',
        description: 'Switch_to_Basic_or_Pro_to_accept_more_orders_and_grow_your_earnings',
      })
    }
  }

  return {
    tab,
    value,
    tabRef,
    search,
    setTrue,
    setFalse,
    categories,
    handleOpen,
    searchValue,
    handleSearch,
    handleChangeTab,
    isNewVersion,
  }
}
