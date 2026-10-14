import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { ReactComponent as IconCopy } from '@/assets/icons/copy.svg'
import { ReactComponent as IconCopyCheck } from '@/assets/icons/copy-check.svg'

interface GroupProps {
  token: string
}

export const Group = (props: GroupProps) => {
  const { copy, isSuccess } = useCopyToClipboard()

  return (
    <Stack
      gap='10px'
      direction='row'
      alignItems='center'
      onClick={copy(props.token)}
      sx={{ cursor: 'pointer' }}
    >
      <Typography
        noWrap
        maxWidth='200px'
        variant='inherit'
        whiteSpace='nowrap'
        sx={{
          textDecoration: 'underline',
        }}
      >
        {props.token}
      </Typography>
      <IconButton sx={{ p: '2px' }}>{isSuccess ? <IconCopyCheck /> : <IconCopy />}</IconButton>
    </Stack>
  )
}
