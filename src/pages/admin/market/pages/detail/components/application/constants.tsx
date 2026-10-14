import { Wrapper } from './style'
import Stack from '@mui/material/Stack'
import { type ReactNode } from 'react'
import type { SlugProps, RoboMarketAppDetaiProps } from '@/types/robo-market'

import { Pbx } from '@/components/forms/pbx'
import { Era } from '@/components/forms/era'
import { Iiko } from '@/components/forms/iiko'
import { Bito } from '@/components/forms/bito'
import { Billz } from '@/components/forms/billz'
import { FormBts } from '@/components/forms/bts'
import { Dizgo } from '@/components/forms/dizgo'
import { FormEmu } from '@/components/forms/emu'
import { Poster } from '@/components/forms/poster'
import { FormFargo } from '@/components/forms/fargo'
import { FormUzpost } from '@/components/forms/uzpost'
import { FormYandex } from '@/components/forms/yandex'
import { FormClopos } from '@/components/forms/clopos'
import { FormYesPos } from '@/components/forms/yes-pos'
import { FormAliPos } from '@/components/forms/ali-pos'
import { FormRkipper } from '@/components/forms/rkipper'
import { Instagram } from '@/components/forms/instagram'
import { FormSmartUp } from '@/components/forms/smart-up'
import { AmoCRM } from '@/components/forms/amo-crm/amo-crm'
import { UzumMarket } from '@/components/forms/uzum-market'
import { FormRoboPochta } from '@/components/forms/robo-pochta'
import { FormNoorDelivery } from '@/components/forms/noor-delivery'
import { YandexDelivery } from '@/components/forms/yandex-delivery'
import { FormClickSuperApp } from '@/components/forms/click-super-app'
import { YandexMarket } from '@/components/forms/yandex-market/yandex-market'
import { FormWolt } from '@/components/forms/wolt'
import { FormRegos } from '@/components/forms/regos'
import { FormZoomrad } from '@/components/forms/zoomrad'
import { FormRobohub } from '@/components/forms/robohub'

export type ApplicationActionType = 'install' | 'import' | 'send_application'

export const APPLICATION_INSTALL_SLUGS: SlugProps[] = [
  'POSTER',
  'PBX',
  'SMARTUP',
  'RKIPPER',
  'UZPOST',
  'FARGO',
  'BTS',
  'YANDEX_EATS',
  'YANDEX_MARKET',
  'YANDEX_DELIVERY',
  'BITO',
  'UZUM_MARKET',
  'NOOR_DELIVERY',
  'DIZGO',
  'ERA',
  'ROBO_POCHTA',
  'EMU',
]

export const APPLICATION_IMPORT_SLUGS: SlugProps[] = ['BILLZ', 'IIKO']

export const APPLICATION_INLINE_FORM_SLUGS: SlugProps[] = [
  'INSTAGRAM',
  'BTS',
  'UZPOST',
  'YANDEX_DELIVERY',
  'NOOR_DELIVERY',
  'ROBO_POCHTA',
  'FARGO',
  'YESPOS',
  'EMU',
  'CLOPOS',
  'ALIPOS',
  'WOLT',
  'regos',
  'robohub',
  'zoomrad_webview',
]

interface IntegrationRenderProps {
  props: RoboMarketAppDetaiProps
  onClose: () => void
}

interface IntegrationConfig {
  content?: ReactNode
  hasDrawer: boolean
  actionType: ApplicationActionType
}

export const getApplicationActionType = (slug?: SlugProps): ApplicationActionType => {
  if (slug && APPLICATION_INSTALL_SLUGS.includes(slug)) return 'install'
  if (slug && APPLICATION_IMPORT_SLUGS.includes(slug)) return 'import'
  return 'send_application'
}

const withWrapper = (component: ReactNode) => (
  <Stack p='5px 32px 50px'>
    <Wrapper>{component}</Wrapper>
  </Stack>
)

const getIntegrationContent = ({ props, onClose }: IntegrationRenderProps) => {
  const formMap: Record<SlugProps, ReactNode | undefined> = {
    YANDEX_EATS: <FormYandex />,
    BTS: <FormBts {...props} />,
    CLICK_SUPERAPP: <FormClickSuperApp onClose={onClose} />,
    POSTER: <Poster onClose={onClose} />,
    PBX: <Pbx onClose={onClose} />,
    SMARTUP: withWrapper(<FormSmartUp {...props} onClose={onClose} />),
    RKIPPER: <FormRkipper onClose={onClose} />,
    UZPOST: <FormUzpost variant='robo-market' />,
    FARGO: <FormFargo variant='robo-market' />,
    BILLZ: withWrapper(<Billz handleUpdate={onClose} />),
    IIKO: withWrapper(<Iiko handleUpdate={onClose} />),
    AMOCRM: <AmoCRM onClose={onClose} />,
    YANDEX_MARKET: <YandexMarket onClose={onClose} />,
    YANDEX_DELIVERY: <YandexDelivery />,
    BITO: <Bito onClose={onClose} />,
    UZUM_MARKET: <UzumMarket onClose={onClose} />,
    NOOR_DELIVERY: <FormNoorDelivery />,
    DIZGO: <Dizgo onClose={onClose} />,
    ERA: <Era onClose={onClose} />,
    ROBO_POCHTA: <FormRoboPochta {...props} />,
    INSTAGRAM: <Instagram />,
    YESPOS: <FormYesPos {...props} />,
    EMU: <FormEmu {...props} />,
    CLOPOS: <FormClopos {...props} />,
    ALIPOS: <FormAliPos {...props} />,
    WOLT: <FormWolt {...props} />,
    regos: <FormRegos {...props} />,
    robohub: <FormRobohub {...props} />,
    zoomrad_webview: <FormZoomrad {...props} />,
  }

  return formMap[props.slug]
}

export const getIntegrationConfig = ({
  props,
  onClose,
}: IntegrationRenderProps): IntegrationConfig => {
  const content = getIntegrationContent({ props, onClose })

  return {
    content,
    actionType: getApplicationActionType(props.slug),
    hasDrawer: !APPLICATION_INLINE_FORM_SLUGS.includes(props.slug),
  }
}
