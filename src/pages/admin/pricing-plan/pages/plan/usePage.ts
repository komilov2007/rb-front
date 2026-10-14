import { ROUTER } from '@/constants/router'
import { type ErrorProps } from '@/types/error'
import { type ParamProps } from '@/types/params'
import { useParams, useNavigate } from 'react-router-dom'
import { subcriptionPlan } from '@/apis/admin/pricing-plan'
import { type PricingPlanTypeProps } from '@/types/profile'
import { REACT_QUERY_KEYS } from '@/constants/react-query-keys'
import { useRef, useMemo, useState, type ChangeEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'
import { type SubcriptionPromoCodeProps } from '@/types/pricing-plan'
import { TAB_PLANS, type PlanTypeProps, PRICES } from '@/constants/plan'

interface RefBalanceProps {
  setTrue: () => void
}

export const usePage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { planId } = useParams<ParamProps>()
  const refBalance = useRef<RefBalanceProps>()
  const [promoCode, setPromoCode] = useState<SubcriptionPromoCodeProps | null>(null)
  const [plan, setPlan] = useSearchParamsState('plan', '')
  const price = PRICES[planId as PricingPlanTypeProps]
  const planSelected = TAB_PLANS[plan as PlanTypeProps]
  const newDiscount = promoCode?.code ? 0 : planSelected.discount
  const discountPrice = useMemo(
    () => (price * planSelected.months * (100 - newDiscount)) / 100,
    [price, newDiscount, planSelected.months],
  )

  const promoCodePrice = useMemo(
    () => (promoCode?.code ? (discountPrice * promoCode?.percent) / 100 : 0),
    [discountPrice, promoCode?.code, promoCode?.percent],
  )
  const totalPrice = useMemo(
    () => (promoCode?.code ? (discountPrice * (100 - promoCode.percent)) / 100 : discountPrice),
    [discountPrice, promoCode?.code, promoCode?.percent],
  )

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const values = {
        tariff: planId,
        months: planSelected.months,
        promo_code: promoCode?.code,
      }
      return await subcriptionPlan(values)
    },
    onError: (res: ErrorProps) => {
      if (res.response?.data.code === 10002) {
        refBalance.current?.setTrue()
      }
    },
    onSuccess: () => {
      navigate(ROUTER.ADMIN_HOME)
      void queryClient.invalidateQueries([REACT_QUERY_KEYS.ME])
    },
  })

  const onSubmit = () => {
    mutate()
  }

  const handleChangeRadio = (_: ChangeEvent<HTMLInputElement>, plan: string) => {
    setPlan(plan)
  }

  return {
    price,
    plan,
    onSubmit,
    isLoading,
    promoCode,
    totalPrice,
    refBalance,
    setPromoCode,
    promoCodePrice,
    handleChangeRadio,
  }
}
