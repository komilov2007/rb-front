import type { ReactNode } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { ReactComponent as IconInformationHelp } from '@/assets/icons/information-help.svg'

interface InformationHelpProps {
  title: ReactNode
}

export const InformationHelp = (props: InformationHelpProps) => {
  return (
    <Tooltip title={props.title} PopperProps={{ sx: { zIndex: 9999999999 } }}>
      <IconButton radius='50%'>
        <IconInformationHelp />
      </IconButton>
    </Tooltip>
  )
}
