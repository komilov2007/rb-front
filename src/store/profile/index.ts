import { create } from '@/configs/zustand'
import { ALL_OPTION } from '@/constants/option'
import { getUser, setUser } from '@/utils/user'
import type { OptionProps } from '@/types/components'
import type { LanguageTypes } from '@/types/language'
import { LANGUAGE_OPTIONS } from '@/constants/languages'
import type { NotificationCountProps } from '@/types/notifications'
import type {
  MeProps,
  TextProps,
  ProfileProps,
  PreDashBoardProps,
  PermissionTypeProps,
  PermissionObjectProps,
} from '@/types/profile'
import { type GlobalSettingsProps } from '@/types/common'

interface ProfileStoreProps extends ProfileProps {
  isLoading: boolean
  me: MeProps | null
  show_popup: boolean
  promo_code: string
  textObj: TextProps
  meIsLoading: boolean
  isMultibank?: boolean
  language: LanguageTypes
  branches: OptionProps[]
  tabLanguage: LanguageTypes
  allBranches: OptionProps[]
  currentShop: string | null
  subscriptionModal: boolean
  setMe: (me: MeProps) => void
  preDashboard: PreDashBoardProps
  globalSettings?: GlobalSettingsProps
  setProfile: (e: ProfileProps) => void
  notificationCount: NotificationCountProps
  setTabLanguage: (tab: LanguageTypes) => void
  setBranches: (branches: OptionProps[]) => void
  setPreDashboard: (e: PreDashBoardProps) => void
  setNotificationCount: (e: NotificationCountProps) => void
  setSubscriptionModal: (subscriptionModal: boolean, textObj?: TextProps) => void
  setGlobalSettings: (globalSettings: GlobalSettingsProps) => void
  getPermission: (p: PermissionTypeProps, field: 'can_edit' | 'can_view' | 'can_delete') => boolean
}

export const useProfileStore = create<ProfileStoreProps>((set, get) => ({
  phone: '+998',
  email: '',
  photo: '',
  show_popup: false,
  promo_code: '',
  branches: [],
  allBranches: [],
  isMultibank: !!localStorage.getItem('multibank'),
  setBranches: branches => {
    set({ branches, allBranches: [ALL_OPTION, ...branches] })
  },
  setGlobalSettings: globalSettings => {
    set({ globalSettings })
  },
  firstname: '',
  isLoading: true,
  currentShop: null,
  language: LANGUAGE_OPTIONS.uz.value,
  tabLanguage: LANGUAGE_OPTIONS.uz.value,
  me: null,
  preDashboard: {},
  meIsLoading: true,
  notificationCount: { chat: 0, notification: 0, order: 0 },
  setProfile: e => {
    set({ ...e, phone: e.phone ?? '+998', isLoading: false })
  },
  setPreDashboard: preDashboard => {
    set({
      preDashboard,
    })
  },
  setNotificationCount: notificationCount => {
    set({ notificationCount })
  },
  setTabLanguage: tabLanguage => {
    set({ tabLanguage })
  },
  setMe: me => {
    const user = getUser()
    const languages = me.languages
    const language = !languages.includes(LANGUAGE_OPTIONS.uz.value)
      ? !languages.includes(LANGUAGE_OPTIONS.ru.value)
        ? !languages.includes(LANGUAGE_OPTIONS.en.value)
          ? LANGUAGE_OPTIONS.en.value
          : LANGUAGE_OPTIONS.ru.value
        : LANGUAGE_OPTIONS.ru.value
      : LANGUAGE_OPTIONS.uz.value
    const permissionObject = me.permissions?.reduce(
      (p, n) => ({ ...p, [n.menu]: n }),
      {},
    ) as PermissionObjectProps
    const newMe = {
      ...me,
      permissionObject,
      subscription: { ...me.subscription, is_basic: me.subscription.tariff === 'START' },
    }
    setUser({ ...user, is_new_version: me.is_new_version })
    set({ me: newMe, language, tabLanguage: language, meIsLoading: false })
  },
  getPermission: (permission, field) => {
    return !!(get().me?.permissionObject?.[permission]?.[field] || get().me?.is_admin)
  },
  subscriptionModal: false,
  textObj: { title: '', text: '', value: '', description: '' },
  setSubscriptionModal: (subscriptionModal: boolean, textObj?: TextProps) => {
    subscriptionModal
      ? set({ subscriptionModal, textObj })
      : set({ subscriptionModal, textObj: { title: '', value: '', text: '', description: '' } })
  },
}))
