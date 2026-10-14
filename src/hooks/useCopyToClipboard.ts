import { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { writeClipboard } from '@/utils/clipboard'

export const useCopyToClipboard = () => {
  const { t } = useTranslation()
  const [isSuccess, setIsSuccess] = useState(false)

  const copy = (text: string) => async () => {
    // `writeClipboard` never throws — rethrowing here used to surface as an
    // unhandled rejection wherever the clipboard API is unavailable.
    const ok = await writeClipboard(text)

    setIsSuccess(ok)
    if (ok) {
      toast.success(t('copied_to_clipboard'), { autoClose: 1000 })
    }

    setTimeout(() => {
      setIsSuccess(false)
    }, 2000)
  }

  return { copy, isSuccess }
}
