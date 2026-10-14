import { ROUTER } from '@/constants/router'
import { useSignUpStore } from '@/store/sign-up'
import { type CategoryProps } from '@/types/category'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormCategoryRestarunat } from '@/components/forms/category-restarunat'
import { useProfileStore } from '@/store/profile'
import { FormCategoryOnlineShopSingle } from '@/components/forms/category-online-shop-single'

const Page = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const is_new_version = useProfileStore(state => state.me?.is_new_version)
  const { step, setStep } = useSignUpStore(state => ({ step: state.step, setStep: state.setStep }))
  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP

  const handleUpdate = (_?: CategoryProps, isSkip?: boolean) => {
    const newStep = step > 4 ? step : isSkip ? step + 2 : step + 1
    setStep(newStep)
    navigate(`${PATH}/${isSkip ? ROUTER.CREATE_DELIVERY : ROUTER.CREATE_PRODUCT}`)
  }

  return is_new_version ? (
    <FormCategoryOnlineShopSingle handleUpdate={handleUpdate} />
  ) : (
    <FormCategoryRestarunat variant='create' handleUpdate={handleUpdate} />
  )
}

export default Page
