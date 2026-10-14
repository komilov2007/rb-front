import type { LinkTypeProps, BannerTypeProps } from '@/types/banners'

export const BANNER_TYPE: BannerTypeProps = {
  MAIN: {
    value: 'MAIN',
    label: 'main_banner',
  },
  CATEGORY: {
    value: 'CATEGORY',
    label: 'assigned_category_banner',
  },
}

export const LINK_TYPE: LinkTypeProps = {
  CATEGORY: {
    value: 'CATEGORY',
    label: 'redirect_to_category',
  },
  PRODUCT: {
    value: 'PRODUCT',
    label: 'redirect_to_product',
  },
}
