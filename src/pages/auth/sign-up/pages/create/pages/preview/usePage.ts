import { toast } from 'react-toastify'
import { ROUTER } from '@/constants/router'
import { useTranslation } from 'react-i18next'
import { useSignUpStore } from '@/store/sign-up'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/apis/admin/product'
import { getTitle } from '@/constants/domain-themes'
import { useCategories } from '@/hooks/useCategories'
import { getShopTelegramInfo } from '@/apis/admin/shop'
import { getWebsiteDetail } from '@/apis/admin/sign-up'
import { useLocation, useNavigate } from 'react-router-dom'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useProfileStore } from '@/store/profile'

export const usePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const categories = useCategories()
  const { pathname } = useLocation()
  const isNewVersion = useProfileStore(state => state.me?.is_new_version)
  const links = useProfileStore(state => state.me?.links)
  const SUB_DOMAIN = isNewVersion ? getTitle().new_sub_domain : getTitle().sub_domain
  const { step, setStep } = useSignUpStore(state => ({
    step: state.step,
    setStep: state.setStep,
  }))

  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP
  const IS_BOT = PATH === ROUTER.CREATE_BOT_SIGN_UP

  const telegramInfo = useQuery({
    enabled: false,
    queryFn: getShopTelegramInfo,
    queryKey: [REACT_QUERY_KEYS.SHOP_TELEGRAM_INFO],
  })

  const websiteInfo = useQuery({
    enabled: false,
    queryFn: getWebsiteDetail,
    queryKey: [REACT_QUERY_KEYS.WEBSITE_DETAIL],
    select: res => {
      const domain = res.data.is_sub ? `https://${res.data.domain}${SUB_DOMAIN}` : res.data.domain
      return { ...res, data: { ...res.data, domain } }
    },
  })

  const products = useQuery({
    queryKey: [REACT_QUERY_KEYS.PRODUCT_LIST],
    queryFn: async () => await getProducts({}),
    onSuccess: res => {
      if (res.data.count === 0) {
        const newStep = step + 1
        setStep(newStep)
        if (!isNewVersion) {
          navigate(ROUTER.ADMIN_HOME)
        }
      } else {
        if (IS_BOT) {
          void telegramInfo.refetch()
        } else {
          void websiteInfo.refetch()
        }
      }
    },
  })

  const handleSubmit = () => {
    const message = IS_BOT ? 'bot_created_successfully' : 'website_added_successfully'
    toast.success(t(message))
    const newStep = step + 1
    setStep(newStep)
    navigate(ROUTER.ADMIN_HOME)
  }

  return {
    PATH,
    IS_BOT,
    products,
    categories,
    websiteInfo,
    telegramInfo,
    handleSubmit,
    links,
    isNewVersion,
  }
}
