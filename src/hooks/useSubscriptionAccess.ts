import { useProfileStore } from '@/store/profile'
import type { LimitTypeprops } from '@/types/profile'

// the robomarket api returns some slugs in a different form than the profile limits object
const SUBSCRIPTION_SLUG_ALIASES: Record<string, keyof LimitTypeprops> = {
  marketplace: 'marketplaces',
}

interface AccessProps {
  name?: string
  subscription_slug?: keyof LimitTypeprops | null
}

export const useSubscriptionAccess = () => {
  const { setSubscriptionModal, is_free, is_expired, limit, meIsLoading } = useProfileStore(
    state => ({
      setSubscriptionModal: state.setSubscriptionModal,
      is_free: state.me?.subscription.is_free,
      is_expired: state.me?.subscription.is_expired,
      limit: state.me?.subscription.limit,
      meIsLoading: state.meIsLoading,
    }),
  )

  const hasAccess = (subscription_slug?: keyof LimitTypeprops | null) => {
    if (is_free && !is_expired) return true
    if (subscription_slug === null) return true
    if (!subscription_slug) return false
    const key = SUBSCRIPTION_SLUG_ALIASES[subscription_slug] ?? subscription_slug
    return !!limit?.[key]
  }

  const requireAccess = (props: AccessProps) => {
    if (hasAccess(props.subscription_slug)) return true
    setSubscriptionModal(true, {
      title: 'This_integration_is_available_only_on_Basic_and_Pro_plans',
      value: props.name,
      description:
        'please_upgrade_to_Basic_or_Pro_and_unlock_full_access_to_platform_features_that_boost_your_business_efficiency',
    })
    return false
  }

  // the profile has to be resolved before an access check means anything
  return { hasAccess, requireAccess, isReady: !meIsLoading }
}
