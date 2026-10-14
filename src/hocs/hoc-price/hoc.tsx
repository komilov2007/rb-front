import { lazy } from 'react'
import { type HocProps } from '@/types/hoc'
import { useProfileStore } from '@/store/profile'
import { useParams } from 'react-router-dom'
import { type ParamProps } from '@/types/params'

interface DataProps {
  title: string
  description: string
  text?: string
}

const Subcription = lazy(
  async () =>
    await import('@/components/modals/subcription').then(m => ({ default: m.Subcription })),
)

const data: Record<string, DataProps> = {
  discount: {
    title: 'Use_the_discount_feature_to_attract_more_customers_and_grow_your_sales',
    description: 'Upgrade_to_the_Basic_or_Pro_plan_to_unlock_this_tool_and_enjoy_all_the_benefits',
  },
  stock: {
    title:
      'Keep_track_of_your_product_stock_levels_The_warehouse_module_lets_you_see_how_much_of_each_item_remains',
    description: 'Available_only_on_Basic_and_Pro_plans',
  },
  'qr-code': {
    title: 'QR_Catalog_is_available_only_on_Basic_and_Pro_plans',
    description: 'Create_a_convenient_menu_or_product_catalog_for_your_clients',
  },
  roles: {
    title: 'Create_roles_and_assign_access_levels_to_your_team_members',
    text: 'This_feature_is_not_available_on_the_Start_plan',
    description: 'Upgrade_to_Basic_or_Pro_to_manage_your_team_more_efficiently',
  },
  courier: {
    title: 'Add_couriers_and_assign_orders_manually',
    text: 'This_feature_is_limited_on_the_Start_plan',
    description: 'Upgrade_to_Basic_or_Pro_to_streamline_your_delivery_and_order_management',
  },
  'marketing-sources': {
    title: 'You_are_on_the_Start_plan',
    description: 'if_you_want_to_where_your_clients',
  },
}

export const HocTariffPrice = ({ children }: HocProps) => {
  const subscription = useProfileStore(state => state.me?.subscription)
  const isFree = useProfileStore(state => state.me?.subscription.is_free)
  const params = useParams<ParamProps>()
  const paramKey = params['*'] as keyof typeof data

  if (subscription?.tariff === 'START' && !isFree) {
    return (
      <Subcription
        variant='drawer'
        title={data[paramKey].title}
        text={data[paramKey].text}
        description={data[paramKey].description}
      />
    )
  }

  return <>{children}</>
}
