import { ROUTER } from '@/constants/router'
import { useSignUpStore } from '@/store/sign-up'
import { useProfileStore } from '@/store/profile'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormProductRestarunat } from '@/components/forms/product-restarunat'
import { FormProductOnlineShop } from '@/components/forms/product-online-shop'

const Page = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const is_new_version = useProfileStore(state => state.me?.is_new_version)
  const { step, setStep } = useSignUpStore(state => ({ step: state.step, setStep: state.setStep }))
  const PATH = pathname.includes(ROUTER.CREATE_WEBSITE)
    ? ROUTER.CREATE_WEBSITE_SIGN_UP
    : ROUTER.CREATE_BOT_SIGN_UP

  const handleUpdate = () => {
    const newStep = step > 5 ? step : step + 1
    setStep(newStep)
    navigate(`${PATH}/${ROUTER.CREATE_DELIVERY}`)
  }

  return is_new_version ? (
    <FormProductOnlineShop variant='create' handleUpdate={handleUpdate} />
  ) : (
    <FormProductRestarunat variant='create' handleUpdate={handleUpdate} />
  )
}

export default Page
