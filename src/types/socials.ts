import { type FunctionComponent, type SVGProps } from 'react'

export type SocialTypeProps =
  'YOUTUBE' | 'INSTAGRAM' | 'TIKTOK' | 'TELEGRAM' | 'FACEBOOK' | 'WHATSAPP'

export type SocialProps = Array<{
  url: string
  placeholder: string
  type: SocialTypeProps
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
}>
