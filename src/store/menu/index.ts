import { create } from '@/configs/zustand'

interface MenuStateProps {
  isMenuOpen: boolean
  setMenuToogle: () => void
}

export const useMenuStore = create<MenuStateProps>((set, get) => ({
  isMenuOpen: sessionStorage.getItem('isMenuOpen') !== 'false',
  setMenuToogle: () => {
    const isMenuOpen = !get().isMenuOpen
    sessionStorage.setItem('isMenuOpen', String(isMenuOpen))
    set({ isMenuOpen })
  },
}))
