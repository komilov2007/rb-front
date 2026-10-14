import { create } from '@/configs/zustand'

interface SignUpStoreProps {
  step: number
  setStep: (step: number) => void
}

export const useSignUpStore = create<SignUpStoreProps>(set => ({
  step: JSON.parse(sessionStorage.getItem('step') as string) as number,
  setStep: step => {
    set({ step })
    sessionStorage.setItem('step', JSON.stringify(step))
  },
}))
