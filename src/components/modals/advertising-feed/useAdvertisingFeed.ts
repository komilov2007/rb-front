import { useBoolean } from '@/hooks/useBoolean'
import { useQuery } from '@tanstack/react-query'
import type { LanguageTypes } from '@/types/language'
import { LANGUAGE_OPTIONS } from '@/constants/languages'
import type { SelectChangeEvent } from '@mui/material/Select'
import { type SyntheticEvent, useMemo, useState } from 'react'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { getCategoriesCatalogList } from '@/apis/admin/category'
import type { FeedCategoryMode, FeedFormatValue } from '@/types/feed'
import {
  FEED_QUERY_PARAM,
  FEED_CATEGORY_MODE,
  FEED_FORMAT_OPTIONS,
  FEED_DEFAULT_FORMAT,
} from '@/constants/feed'

const baseURL = import.meta.env.VITE_API_BASE_URL_NEW

export interface AdvertisingFeedProps {
  shop: string
}

export const useAdvertisingFeed = (props: AdvertisingFeedProps) => {
  const modal = useBoolean()
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  const [language, setLanguage] = useState<LanguageTypes>(LANGUAGE_OPTIONS.uz.value)
  const [formatTab, setFormatTab] = useState<FeedFormatValue>(FEED_DEFAULT_FORMAT.value)
  const [categoryMode, setCategoryMode] = useState<FeedCategoryMode>(FEED_CATEGORY_MODE.ALL)
  const isSelectedCategoryMode = categoryMode === FEED_CATEGORY_MODE.SELECTED

  const { data: categories = { data: [] }, isLoading: isLoadingCategories } = useQuery({
    enabled: modal.value,
    queryFn: async () => await getCategoriesCatalogList(props.shop),
    queryKey: [REACT_QUERY_KEYS.ADVERTISING_FEED_CATEGORY_LIST, props.shop],
  })

  const isEmptyCategories = !isLoadingCategories && categories.data.length === 0

  const currentFormatTab = useMemo(() => {
    return FEED_FORMAT_OPTIONS.find(option => option.value === formatTab) ?? FEED_DEFAULT_FORMAT
  }, [formatTab])

  const selectedCategories = useMemo(() => {
    return categories.data.filter(category => categoryIds.includes(category.id))
  }, [categories.data, categoryIds])

  const feedLink = useMemo(() => {
    const url = new URL(`${baseURL}/v3/products/feed/${props.shop}/${formatTab}`)
    url.searchParams.set(FEED_QUERY_PARAM.LANGUAGE, language)

    if (categoryMode === FEED_CATEGORY_MODE.SELECTED) {
      categoryIds.forEach(categoryId => {
        url.searchParams.append(FEED_QUERY_PARAM.CATEGORY_ID, String(categoryId))
      })
    }
    return url.toString()
  }, [categoryIds, categoryMode, formatTab, language, props.shop])

  const handleChangeFormatTab = (_: SyntheticEvent, tab: string) => {
    setFormatTab(tab as FeedFormatValue)
  }

  const handleChangeLanguage = (event: SelectChangeEvent<LanguageTypes>) => {
    setLanguage(event.target.value as LanguageTypes)
  }

  const handleChangeCategoryMode = (_: SyntheticEvent, mode: string) => {
    setCategoryMode(mode as FeedCategoryMode)
    if (mode === FEED_CATEGORY_MODE.ALL) {
      setCategoryIds([])
    }
  }

  const handleChangeCategoryIds = (event: SelectChangeEvent<number[]>) => {
    setCategoryIds(event.target.value as number[])
  }

  const handleDeleteCategory = (id: number) => () => {
    setCategoryIds(prev => prev.filter(categoryId => categoryId !== id))
  }

  return {
    modal,
    feedLink,
    language,
    formatTab,
    categories,
    categoryIds,
    categoryMode,
    currentFormatTab,
    isEmptyCategories,
    selectedCategories,
    isLoadingCategories,
    handleChangeLanguage,
    handleDeleteCategory,
    handleChangeFormatTab,
    isSelectedCategoryMode,
    handleChangeCategoryIds,
    handleChangeCategoryMode,
  }
}
