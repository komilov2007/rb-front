import type { SVGProps, ReactElement, FunctionComponent } from 'react'

export type PlatformsProps =
  'TELEGRAM' | 'WEBSITE' | 'CLICK' | 'INSTAGRAM' | 'YANDEX' | 'WOLT' | 'ZOOMRAD' | 'GORGONA'
export type BusninessTypesProps = 'RESTAURANT' | 'ONLINE_SHOP'
export type PlatformsPlanTypeProps =
  | Exclude<PlatformsProps, 'CLICK' | 'INSTAGRAM' | 'YANDEX' | 'WOLT' | 'ZOOMRAD' | 'GORGONA'>
  | 'TELEGRAM_WEBSITE'

export type PlatformsOptionsProps = Record<
  PlatformsProps,
  {
    label: string
    title: string
    value: PlatformsProps
    link?: 'bot' | 'website'
    Icon: FunctionComponent<
      SVGProps<SVGSVGElement> & {
        title?: string | undefined
      }
    >
  }
>

export type BusninessTypesOptionsProps = Record<
  BusninessTypesProps,
  {
    label: string
    value: BusninessTypesProps
  }
>

export type PlatformPlanProps = Record<
  PlatformsPlanTypeProps,
  {
    label: string
    icon: ReactElement
    value: PlatformsPlanTypeProps
  }
>
