import { ROUTER } from './router'
import type { SVGProps, FunctionComponent } from 'react'
import { ReactComponent as IconPreview } from '@/assets/icons/preview.svg'
import { ReactComponent as IconDelivery } from '@/assets/icons/delivery.svg'
import { ReactComponent as IconSettings } from '@/assets/icons/settings.svg'
import { ReactComponent as IconCreateBot } from '@/assets/icons/create-bot.svg'
import { ReactComponent as IconCreateSite } from '@/assets/icons/create-site.svg'
import { ReactComponent as IconProductAdd } from '@/assets/icons/product-add.svg'
import { ReactComponent as IconCategoryAdd } from '@/assets/icons/category-add.svg'

interface SignUpCreateStepProps {
  title: string
  desciption: string
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string
    }
  >
  step: number
  href: string
  id: 'bot' | 'website' | 'category' | 'product' | 'services' | 'shop_settings' | 'preview'
}

export const SING_UP_CREATE_STEPS: SignUpCreateStepProps[] = [
  {
    title: 'create_bot',
    Icon: IconCreateBot,
    step: 2,
    href: '',
    id: 'bot',
    desciption: 'description_get_a_token_from_botfather_and_insert_it_to_start_using_your_bot',
  },
  {
    title: 'create_site',
    Icon: IconCreateSite,
    step: 2,
    href: '',
    id: 'website',
    desciption: 'create_a_website_on_your_own_domain_or_get_a_subdomain_on_our_platform',
  },
  {
    title: 'settings',
    Icon: IconSettings,
    step: 3,
    href: `/${ROUTER.CREATE_SETTINGS}`,
    id: 'shop_settings',
    desciption:
      'fill_in_company_details_set_business_hours_select_currency_upload_your_logo_add_phone_number_and_social_media_links',
  },
  {
    title: 'add_category',
    Icon: IconCategoryAdd,
    step: 4,
    href: `/${ROUTER.CREATE_CATEGORY}`,
    id: 'category',
    desciption: 'upload_a_photo_and_name_each_category',
  },
  {
    title: 'add_product',
    Icon: IconProductAdd,
    step: 5,
    href: `/${ROUTER.CREATE_PRODUCT}`,
    id: 'product',
    desciption:
      'enter_the_name_upload_photos_add_a_description_specify_the_price_and_list_the_features',
  },
  {
    title: 'delivery',
    Icon: IconDelivery,
    step: 6,
    href: `/${ROUTER.CREATE_DELIVERY}`,
    id: 'services',
    desciption: 'specify_if_pickup_is_available_and_choose_the_types_of_delivery_you_offer',
  },
  {
    title: 'preview',
    Icon: IconPreview,
    step: 7,
    href: `/${ROUTER.CREATE_PREVIEW}`,
    id: 'preview',
    desciption: '',
  },
]
