import { Container } from './style'
import { SOURCES } from '@/constants/source'
import { type SourceProps } from '@/types/source'

interface SourceLabelProps {
  source?: SourceProps | null
}

export const Source = ({ source }: SourceLabelProps) => {
  const item = source ? SOURCES[source] : undefined

  if (!item) return <>—</>

  return (
    <Container
      sx={theme => ({
        color: theme.palette.allColors[item.color],
        background: theme.palette.allColors[item.bgcolor],
      })}
    >
      {item.label}
    </Container>
  )
}
