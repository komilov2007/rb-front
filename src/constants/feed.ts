import type {
  FeedCategoryMode,
  FeedFormatOptionProps,
  FeedCategoryModeOptionProps,
} from '@/types/feed'

export const FEED_QUERY_PARAM = {
  LANGUAGE: 'lang',
  CATEGORY_ID: 'category_id',
}

export const FEED_CATEGORY_MODE: Record<Uppercase<FeedCategoryMode>, FeedCategoryMode> = {
  ALL: 'all',
  SELECTED: 'selected',
}

export const FEED_FORMAT_OPTIONS: FeedFormatOptionProps[] = [
  {
    label: 'Google XML',
    value: 'google.xml',
    description: 'feed_google_merchant_description',
  },
  {
    label: 'Yandex YML',
    value: 'yandex.yml',
    description: 'feed_yandex_description',
  },
  {
    label: 'CSV',
    value: 'products.csv',
    description: 'feed_csv_description',
  },
]

export const FEED_DEFAULT_FORMAT = FEED_FORMAT_OPTIONS[0]

export const FEED_CATEGORY_MODE_OPTIONS: FeedCategoryModeOptionProps[] = [
  {
    label: 'feed_all_categories',
    value: FEED_CATEGORY_MODE.ALL,
  },
  {
    label: 'feed_select_categories',
    value: FEED_CATEGORY_MODE.SELECTED,
  },
]
