import type { ScrollTypeProps, CategoryTypeProps } from '@/types/category'

type CategoryTypesProps = Record<CategoryTypeProps, { value: CategoryTypeProps; label: string }>

export const CATEGORY_TYPES: CategoryTypesProps = {
  ADD: {
    value: 'ADD',
    label: 'add_new_category',
  },
  ASSIGN: {
    value: 'ASSIGN',
    label: 'assign_to_category',
  },
}

type ScrollTypesProps = Record<ScrollTypeProps, { value: ScrollTypeProps; label: string }>

export const SCROLL_TYPES: ScrollTypesProps = {
  HORIZONTAL: {
    value: 'HORIZONTAL',
    label: 'horizontal',
  },
  VERTICAL: {
    value: 'VERTICAL',
    label: 'vertical',
  },
}
