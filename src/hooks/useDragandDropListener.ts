import { useBoolean } from '@/hooks/useBoolean'
import { useRef, useEffect, type RefObject } from 'react'

export const useDragandDropListener = () => {
  const drop: RefObject<HTMLLabelElement> = useRef(null)

  const {
    value: draggingValue,
    setTrue: setDraggingTrue,
    setFalse: setDraggingFalse,
  } = useBoolean()

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDraggingTrue()
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDraggingFalse()
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    if (drop?.current) {
      drop.current.addEventListener('dragover', handleDragOver)
      drop.current.addEventListener('dragenter', handleDragEnter)
      drop.current.addEventListener('dragleave', handleDragLeave)
    }

    return () => {
      if (drop?.current) {
        drop.current.removeEventListener('dragover', handleDragOver)
        drop.current.removeEventListener('dragenter', handleDragEnter)
        drop.current.removeEventListener('dragleave', handleDragLeave)
      }
    }
  }, [])

  return { drop, draggingValue }
}
