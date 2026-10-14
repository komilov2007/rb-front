import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { ReactComponent as IconCopy } from '@/assets/icons/copy.svg'
import { ReactComponent as IconCopyCheck } from '@/assets/icons/copy-check.svg'

interface CopyProps extends IconButtonProps {
  text: string
}

export const Copy = ({ text, ...props }: CopyProps) => {
  const { copy, isSuccess } = useCopyToClipboard()

  return (
    <IconButton onClick={copy(text)} {...props}>
      {isSuccess ? <IconCopyCheck /> : <IconCopy />}
    </IconButton>
  )
}
