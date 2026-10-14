import { ROUTER } from '@/constants/router'
import { useCallback, useMemo } from 'react'
import { type ParamProps } from '@/types/params'
import { PRICING_PLANS } from '@/constants/plan'
import { useLocation, useParams } from 'react-router-dom'
import { type PricingPlanTypeProps } from '@/types/profile'
import { SIDEBAR, type SidebarProps } from '@/constants/sidebar'
import { getTitle } from '@/constants/domain-themes'

const MAIN_PAGE_FLAT = SIDEBAR.map(s =>
  s.href === ROUTER.MARKETING || s.href === ROUTER.PRODUCTS ? s.children : s,
).flat() as SidebarProps[]

const MAIN_PAGE = MAIN_PAGE_FLAT.map(({ href, menu }) => ({
  href,
  menu: menu === 'market' ? getTitle().title : menu,
}))

export const useBreadcrumbs = () => {
  const { pathname } = useLocation()
  const params = useParams<ParamProps>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const param = params['*']?.split('/') ?? []

  const INNER_PAGES = useMemo(
    () => [
      {
        href: ROUTER.MARKETING_CREATE_MAILING,
        menu: 'create_mailing',
      },
      {
        href: ROUTER.ORDERS_AUTO_RESPONDER,
        menu: 'autoresponder',
      },
      {
        href: ROUTER.PAYMENT_HISTORY,
        menu: 'payment_history',
      },
      {
        href: param.length === 1 ? param[0] : param[1],
        menu: pathname.startsWith(`${ROUTER.ADMIN}/${ROUTER.ROBO_MARKET}`)
          ? 'app'
          : pathname.startsWith(`${ROUTER.ADMIN}/${ROUTER.CUSTOMERS}`)
            ? 'customer_info'
            : param[0] === ROUTER.MARKETING_MAILING
              ? 'detail'
              : param[0] === ROUTER.MARKETING_SMS_MAILING
                ? 'create_mailing'
                : pathname.startsWith(`${ROUTER.ADMIN}/${ROUTER.PRICING_PLAN}`)
                  ? (PRICING_PLANS[param[0] as PricingPlanTypeProps]?.title ?? 'plan')
                  : 'category',
      },
    ],
    [param, pathname],
  )
  const BREADCRUMBS = useMemo(() => [...MAIN_PAGE, ...INNER_PAGES], [INNER_PAGES])

  const generateBreadcrumbs = useCallback(() => {
    const asPathNestedRoutes = pathname.split('/').filter(v => v !== '')

    const crumblist = asPathNestedRoutes.map((subpath, i) => {
      const href = `/${asPathNestedRoutes.slice(0, i + 1).join('/')}`
      const value = BREADCRUMBS.find(v => {
        return v.href === subpath
      })
      return {
        href,
        text: value?.menu,
      }
    })

    const crumblistFiltered = crumblist.filter(
      crumb =>
        crumb.href !== ROUTER.ADMIN &&
        !crumb.href.startsWith(
          `${ROUTER.ADMIN}/${ROUTER.MARKETING}/${ROUTER.MARKETING_SMS_MAILING}/${ROUTER.PAYMENT_HISTORY}/`,
        ) &&
        !crumb.href.includes(`${ROUTER.ADMIN}/${ROUTER.PLATFORMS}`) &&
        crumb.href !== `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_PASSWORD}` &&
        crumb.href !== `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_LANGUAGE}` &&
        crumb.href !== `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_PLATFORMAS}` &&
        crumb.href !== `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_API_INTEGRATION}` &&
        crumb.href !== `${ROUTER.ADMIN}/${ROUTER.PROFILE}/${ROUTER.PROFILE_CARDS}` &&
        crumb.href !== `${ROUTER.ADMIN}/${ROUTER.MARKETING}` &&
        crumb.href !== `${ROUTER.ADMIN}/${ROUTER.PRODUCTS}` &&
        crumb.href !== `${ROUTER.ADMIN}/${ROUTER.CHAT}` &&
        !crumb.href.startsWith(`${ROUTER.ADMIN}/${ROUTER.PRODUCTS}/${ROUTER.CATEGORIES}/`) &&
        !crumb.href.startsWith(`${ROUTER.ADMIN}/${ROUTER.EMPLOYEES}`) &&
        (crumb.href !== `${ROUTER.ADMIN}/${ROUTER.ORDERS}` ||
          crumblist.find(
            c => c.href === `${ROUTER.ADMIN}/${ROUTER.ORDERS}/${ROUTER.ORDERS_AUTO_RESPONDER}`,
          )) &&
        crumb.href !== `${ROUTER.ADMIN}/${ROUTER.TELEGRAM_BOTS}`,
    )
    return crumblistFiltered
  }, [pathname, BREADCRUMBS])

  const breadcrumbs = generateBreadcrumbs()

  return { breadcrumbs }
}
