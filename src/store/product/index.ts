import { create } from '@/configs/zustand'
import { convertVariant } from '@/utils/product-online-shop'
import type { GroupsProps, GroupParamsProps, VariantFormProps } from '@/types/product-online-shop'

interface ProductStateProps {
  group: string
  groups: GroupsProps[]
  uploadLoading: boolean
  setUploadLoading: (loading: boolean) => void
  setGroups: (groups: GroupsProps[]) => void
  updateGroup: (props: GroupParamsProps, isAll?: boolean) => void
  setGroup: (group: string, variants?: VariantFormProps[], price?: number) => void
  setVariants: (variants: VariantFormProps[], price?: number) => void
}

export const useProductStore = create<ProductStateProps>((set, get) => ({
  group: '',
  groups: [],
  uploadLoading: false,
  setUploadLoading: (uploadLoading: boolean) => {
    set({ uploadLoading })
  },
  setGroup: (group, variants, price) => {
    if (variants) {
      const groups = convertVariant(variants, get().groups, group, price)
      set({ group, groups })
      return
    }
    set({ group })
  },
  setGroups: groups => {
    set({ groups })
  },
  updateGroup: (props, isAll) => {
    const groups = get().groups.map(g => {
      return isAll && g.parentId === props.parentId
        ? { ...g, price: props.price, available: props.available, photo: props.photo }
        : g.generateId === props.generateId && g.parentId === props.parentId
          ? { ...g, price: props.price, available: props.available, photo: props.photo }
          : g
    })
    set({ groups })
  },
  setVariants: (variants, price) => {
    const groups = convertVariant(variants, get().groups, get().group, price)
    set({ groups })
  },
}))
