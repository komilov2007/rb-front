import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useProfileStore } from '@/store/profile'
import { getAtmosphere } from '@/apis/admin/atmosphere'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'

export const usePage = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const { can_edit, can_delete } = useProfileStore(state => ({
    can_edit:
      state.getPermission('atmosphere', 'can_edit') || state.getPermission('banner', 'can_edit'),
    can_delete:
      state.getPermission('atmosphere', 'can_delete') ||
      state.getPermission('banner', 'can_delete'),
  }))

  const { data, isLoading } = useQuery({
    queryFn: getAtmosphere,
    queryKey: [REACT_QUERY_KEYS.ATMOSPHERE],
  })

  const atmosphere = data?.data
  const category = atmosphere?.categories.find(c => c.id === selected) ?? null
  const images = category ? category.images : (atmosphere?.images ?? [])

  return {
    images,
    can_edit,
    isLoading,
    atmosphere,
    can_delete,
    setSelected,
    selected: category?.id ?? null,
  }
}
