import { useState, useCallback, type Dispatch, type SetStateAction } from 'react'

interface UseBooleanOutput {
  value: boolean
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
  setValue: Dispatch<SetStateAction<boolean>>
}

interface OptionProps {
  onTrue: () => void
  onFalse: () => void
  onToggle: () => void
}

export const useBoolean = (
  defaultValue: boolean | undefined = false,
  { onTrue, onFalse, onToggle }: Partial<OptionProps> = {},
): UseBooleanOutput => {
  const [value, setValue] = useState(!!defaultValue)

  const setTrue = useCallback(() => {
    setValue(true)
    if (onTrue) onTrue()
  }, [onTrue])
  const setFalse = useCallback(() => {
    setValue(false)
    if (onFalse) onFalse()
  }, [onFalse])
  const toggle = useCallback(() => {
    setValue(x => !x)
    if (onToggle) onToggle()
  }, [onToggle])

  return { value, setValue, setTrue, setFalse, toggle }
}
