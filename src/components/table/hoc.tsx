import { DndProvider } from 'react-dnd'
import { type HocProps } from '@/types/hoc'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const Hoc = ({ children }: HocProps) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>
}
