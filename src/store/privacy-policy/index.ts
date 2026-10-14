import { create } from '@/configs/zustand'
import { type PrivacyPolicyResponseProps } from '@/types/common'

interface PrivacyPolicyStoreProps extends PrivacyPolicyResponseProps {
  isLoading: boolean
  setPrivacyPolicy: (data: Omit<PrivacyPolicyStoreProps, 'isLoading' | 'setPrivacyPolicy'>) => void
}

export const usePrivacyPolicyStore = create<PrivacyPolicyStoreProps>(set => ({
  isLoading: true,
  policy_general_uz: '',
  policy_general_ru: '',
  pravicy_policy_uz: '',
  pravicy_policy_ru: '',
  the_terms_of_service_uz: '',
  the_terms_of_service_ru: '',
  setPrivacyPolicy: data => {
    set({ ...data, isLoading: false })
  },
}))
