import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { updateWebsite } from '@/apis/admin/sign-up'

export const useWebsite = () => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      return await updateWebsite(data)
    },
    onSuccess: () => {
      toast.success(t('the_action_has_successfully_been_completed'))
    },
  })

  return { mutate, isLoading }
}
