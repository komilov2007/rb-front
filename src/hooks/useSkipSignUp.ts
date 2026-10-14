import { updateBotStep } from '@/apis/common'
import { useMutation } from '@tanstack/react-query'

export const useSkipSignUp = () => {
  const skip = useMutation({
    mutationFn: async (step: number) => await updateBotStep({ step }),
  })

  return skip
}
