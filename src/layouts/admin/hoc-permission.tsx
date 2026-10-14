import type { HocProps } from '@/types/hoc'
import { ROUTER } from '@/constants/router'
import { SIDEBAR } from '@/constants/sidebar'
import { HocBranches } from '@/hocs/hoc-branch'
import { useProfileStore } from '@/store/profile'
import { useSidebarList } from '@/hooks/useSidebarList'
import { Navigate, useLocation } from 'react-router-dom'

export const HocPermission = ({ children }: HocProps) => {
  const { pathname } = useLocation()
  const { sidebar } = useSidebarList()
  const { is_admin, permissions } = useProfileStore(state => ({
    is_admin: state.me?.is_admin,
    permissions: state.me?.permissions,
  }))

  if (is_admin) {
    if (pathname === ROUTER.ADMIN) {
      return <Navigate to={ROUTER.ADMIN_HOME} />
    }
    return <HocBranches>{children}</HocBranches>
  }

  const PAGES = sidebar.filter(s => pathname.includes(s.href))

  if (
    PAGES.length === 0 &&
    (!pathname.includes(ROUTER.PROFILE) || pathname.includes(ROUTER.PROFILE_PLATFORMAS))
  ) {
    const defaultMenu = permissions?.find(p => p.can_view)?.menu

    const PAGE = SIDEBAR.filter(s => {
      const children = s?.children?.find(c => c.menu === defaultMenu)

      if (s.menu === defaultMenu) {
        return true
      }
      if (children) {
        return true
      }
      return false
    })

    const page = PAGE[0]

    if (page) {
      if (page?.children) {
        const href = page.children.find(c =>
          permissions?.filter(p => p.can_view)?.find(p => p.menu === c.menu),
        )?.href

        return <Navigate to={`${ROUTER.ADMIN}/${page.href}/${href}`} />
      }
      return <Navigate to={`${ROUTER.ADMIN}/${page.href}`} />
    }
  }
  return <HocBranches>{children}</HocBranches>
}
