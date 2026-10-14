import { SIDEBAR } from '@/constants/sidebar'
import { useProfileStore } from '@/store/profile'

export const useSidebarList = () => {
  const { is_admin, business_type, is_new_version, permissionObject } = useProfileStore(state => ({
    is_admin: state.me?.is_admin,
    meIsLoading: state.meIsLoading,
    business_type: state.me?.business_type,
    is_new_version: state.me?.is_new_version,
    notificationCount: state.notificationCount,
    permissionObject: state.me?.permissionObject,
  }))

  const sidebar = SIDEBAR.filter(s => {
    if (s.menu === 'market') {
      return true
    }
    if (s.menu === 'pricing_plan') {
      return is_admin
    }
    if (s?.children) {
      const hasOneAccess = s.children?.filter(
        c => permissionObject?.[c?.menu]?.can_view || is_admin,
      )
      return hasOneAccess.length > 0
    }

    return permissionObject?.[s?.menu]?.can_view || is_admin
  }).map(s => {
    if (s?.children) {
      const children = s.children?.filter(c =>
        c.menu === 'reviews'
          ? business_type === 'ONLINE_SHOP' && is_new_version
          : c.menu === 'reservations'
            ? business_type === 'RESTAURANT' && (permissionObject?.orders?.can_view || is_admin)
            : c.menu === 'atmosphere'
              ? business_type === 'RESTAURANT' &&
                (permissionObject?.atmosphere?.can_view ||
                  permissionObject?.banner?.can_view ||
                  is_admin)
              : permissionObject?.[c?.menu]?.can_view || is_admin,
      )

      if (s.menu === 'orders' && children.length < 2) {
        return { ...s, children: undefined }
      }

      return { ...s, children }
    }
    return s
  })

  return { sidebar }
}
