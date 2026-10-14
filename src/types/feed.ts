export type FeedFormatValue = 'google.xml' | 'yandex.yml' | 'products.csv'

export type FeedCategoryMode = 'all' | 'selected'

export interface FeedFormatOptionProps {
  label: string
  value: FeedFormatValue
  description: string
}

export interface FeedCategoryModeOptionProps {
  label: string
  value: FeedCategoryMode
}
