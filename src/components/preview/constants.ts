import { type CategoryProps } from '@/types/category'
import type { SVGProps, FunctionComponent } from 'react'
import { type ProductListProps } from '@/types/products'
import { ReactComponent as IconMobile } from '@/assets/icons/mobile.svg'
import { ReactComponent as IconDesktop } from '@/assets/icons/desktop.svg'

export type DeviceTypeProps = 'mobile' | 'desktop'

interface TabsProps {
  value: DeviceTypeProps
  label: string
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string
    }
  >
}

export interface PreviewProps {
  url?: string
  username?: string
  category: CategoryProps
  product: ProductListProps
}

export const TABS: TabsProps[] = [
  {
    value: 'mobile',
    label: 'mobile_preview',
    Icon: IconMobile,
  },
  {
    value: 'desktop',
    label: 'desktop',
    Icon: IconDesktop,
  },
]
