import { useMenuStore } from '@/store/menu'
import { ROUTER } from '@/constants/router'
import { SIDEBAR } from '@/constants/sidebar'
import { useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useBoolean } from '@/hooks/useBoolean'

export const useSidebar = () => {
  const drawerMobile = useBoolean()
  const { pathname } = useLocation()
  const { isMenuOpen, setMenuToogle } = useMenuStore(state => ({
    isMenuOpen: state.isMenuOpen,
    setMenuToogle: state.setMenuToogle,
  }))
  const findCurrentPage = SIDEBAR.find(s =>
    s.children?.find(c =>
      c.href ? pathname.includes(c.href) : pathname.includes(`${ROUTER.ADMIN}/${s.href}`),
    ),
  )?.href
  const [expanded, setExpanded] = useState<string | false>(findCurrentPage ?? false)

  const handleChange = useCallback((panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }, [])

  const handleCloseAccordion = useCallback(() => {
    setExpanded(false)
    drawerMobile.setFalse()
  }, [drawerMobile])

  return { expanded, isMenuOpen, drawerMobile, setMenuToogle, handleChange, handleCloseAccordion }
}
