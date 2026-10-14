import type { CategoryMainOnlineShopProps } from '@/types/category'

export function findCategoryPath(
  categories: CategoryMainOnlineShopProps[],
  targetId?: string | null,
): Array<{ id: number; name: string }> | null {
  for (const category of categories) {
    if (String(category.id) === String(targetId)) {
      return [{ id: category.id, name: category.name }]
    }

    if (category.child_categories.length > 0) {
      const path = findCategoryPath(category.child_categories, targetId)
      if (path) {
        return [{ id: category.id, name: category.name }, ...path]
      }
    }
  }
  return null
}
